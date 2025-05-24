import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const { listId } = req.params;

    console.log('This is the getList controller.');

    let list = await db.dairyList.findUnique({
      where: {
        id: listId,
      },
      include: {
        items: {
          orderBy: {
            expirationDate: 'asc',
          },
        },
      },
    });

    res.json({ list });
    return;
  } catch (err) {
    next(err);
  }
}
