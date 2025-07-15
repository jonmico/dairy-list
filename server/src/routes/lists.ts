import { Router } from 'express';
import {
  addItems,
  createList,
  getList,
  getLists,
  editItems,
} from '../controllers/lists';

export const listsRouter = Router();

listsRouter.get('/', getLists);
listsRouter.get('/:id', getList);
listsRouter.post('/create', createList);
listsRouter.post('/:id/items', addItems);
listsRouter.post('/:id/items/edit', editItems);
