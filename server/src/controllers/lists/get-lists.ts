import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

export async function getLists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let lists = await db.dairyList.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ lists });
    return;
  } catch (err) {
    next(err);
  }
}
