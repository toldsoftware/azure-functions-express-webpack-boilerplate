import * as express from 'express';

export const app = express();

app.get('/api/:foo/:bar', (req, res) => {
  res.json({
    foo  : req.params.foo,
    bar  : req.params.bar
  });
});
