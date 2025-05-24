import { Router } from 'express';
import { addItems, createList, getList, getLists } from '../controllers/lists';

export const listsRouter = Router();

listsRouter.post('/create', createList);
listsRouter.post('/:id/items', addItems);
listsRouter.get('/:id', getList);
listsRouter.get('/', getLists);
