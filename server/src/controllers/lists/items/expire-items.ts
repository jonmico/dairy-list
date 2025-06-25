import { NextFunction, Request, Response } from 'express';
import { db } from '../../../db/db';

export async function expireItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { list } = req.body;

    await db.listItem.updateMany({
      where: {
        dairyListId: id,
        id: { in: list },
      },
      data: {
        expired: true,
      },
    });

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
