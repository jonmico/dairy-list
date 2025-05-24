import { NextFunction, Request, Response } from 'express';
import { db } from '../../db/db';

// TODO: Error handling?

export async function createList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { listName } = req.body;

    let newList = await db.dairyList.create({ data: { name: listName } });

    res.status(201).json({ newList });
  } catch (err) {
    next(err);
  }
}
