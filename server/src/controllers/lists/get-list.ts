import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const list = await db.dairyList.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          orderBy: {
            expirationDate: 'asc',
          },
        },
      },
    });

    if (!list) {
      res.status(404).json({ error: 'List not found.' });
      return;
    }

    res.json({ list });
    return;
  } catch (err) {
    next(err);
  }
}
