import * as express from 'express';

export const app = express();

app.get('/', function (req, res) {
  res.send('Hello World from Express!');
});


