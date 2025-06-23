import { NextFunction, Request, Response } from 'express';
import { db } from '../../../db/db';

export async function addItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const {
      list,
    }: {
      list: {
        brand: string;
        name: string;
        sku: number;
        expirationDate: string;
      }[];
    } = req.body;

    // FIXME: Add T12:00:00.000Z to force UTC at noon. This fixes date display issues since UTC noon works everywhere.
    const updatedList = await db.dairyList.update({
      where: { id },
      data: {
        items: {
          createMany: {
            data: list.map((item) => {
              return {
                name: item.name,
                brand: item.brand,
                expirationDate: new Date(
                  `${item.expirationDate}T12:00:00.000Z`
                ),
                sku: Number(item.sku),
              };
            }),
          },
        },
      },
    });

    res.json({ updatedList });
    return;
  } catch (err) {
    next(err);
  }
}
