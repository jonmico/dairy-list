import { Router } from 'express';
import { createList, getList, getLists } from '../controllers/lists';

export const listsRouter = Router();

listsRouter.post('/create', createList);
listsRouter.get('/:id', getList);
listsRouter.get('/', getLists);
