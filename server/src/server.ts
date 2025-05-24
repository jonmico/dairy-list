import express from 'express';
import cors from 'cors';
import { listsRouter } from './routes/lists';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/lists', listsRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
