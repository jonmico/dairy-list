import { NextFunction, Request, Response } from 'express';
import { db } from '../../../db/db';
import { ListItem } from '../../../generated/prisma';

export async function expireItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { list } = req.body as { list: ListItem[] };

    console.log(list);

    await Promise.all(
      list.map((item) => {
        return db.listItem.update({
          where: { id: item.id },
          data: {
            brand: item.brand,
            name: item.name,
            sku: item.sku,
            expirationDate: item.expirationDate,
            expired: item.expired,
          },
        });
      })
    );

    const updatedList = await db.dairyList.findUnique({
      where: { id },
      include: { items: true },
    });

    res.json({ list: updatedList });
    return;
  } catch (err) {
    next(err);
  }
}
