import * as express from 'express';

export const app = express();

app.get('/express', (req, res) => {
  res.json({
    pattern: '/express',
    a: req.params.a,
    b: req.params.b
  });
});

app.get('/express/:a', (req, res) => {
  res.json({
    pattern: '/express/:a',
    a: req.params.a,
    b: req.params.b
  });
});


app.get('/express/:a/:b', (req, res) => {
  res.json({
    pattern: '/express/:a/:b',
    a: req.params.a,
    b: req.params.b
  });
});
