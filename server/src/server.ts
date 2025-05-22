import express from 'express';

const app = express();

console.log('hello!');

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
