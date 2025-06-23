import { NextFunction, Request, Response } from 'express';

export async function expireItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    console.log('expireItems endpoint.');
    console.log('List id from expireItems endpoint:', id);

    res.json({ message: 'expireItems endpoint.' });
    return;
  } catch (err) {
    next(err);
  }
}
