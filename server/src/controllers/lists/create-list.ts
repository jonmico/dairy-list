import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

// TODO: Error handling?

export async function createList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let {
      listName,
      list,
    }: {
      listName: string;
      list: {
        brand: string;
        name: string;
        sku: number;
        expirationDate: string;
      }[];
    } = req.body;

    let newList = await db.dairyList.create({
      data: {
        name: listName,
        items: {
          createMany: {
            data: list.map((item) => {
              return {
                name: item.name,
                sku: Number(item.sku),
                expirationDate: new Date(item.expirationDate),
                brand: item.brand,
              };
            }),
          },
        },
      },
    });

    res.status(201).json({ newList });
  } catch (err) {
    next(err);
  }
}
