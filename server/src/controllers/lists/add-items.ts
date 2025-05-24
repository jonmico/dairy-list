import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function addItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { id } = req.params;
    let {
      list,
    }: {
      list: {
        brand: string;
        name: string;
        sku: number;
        expirationDate: string;
      }[];
    } = req.body;

    let updatedList = await db.dairyList.update({
      where: { id },
      data: {
        items: {
          createMany: {
            data: list.map((item) => {
              return {
                name: item.name,
                brand: item.brand,
                expirationDate: new Date(item.expirationDate),
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
