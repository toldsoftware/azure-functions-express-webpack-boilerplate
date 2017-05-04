import * as express from 'express';

export const app = express();


app.get('/:a', (req, res) => {
  res.json({
    pattern: '/:a',
    a  : req.params.a,
    b  : req.params.b
  });
});


app.get('/api/:a', (req, res) => {
  res.json({
    pattern: '/api/:a',
    a  : req.params.a,
    b  : req.params.b
  });
});


app.get('/api/:a/:b', (req, res) => {
  res.json({
    pattern: '/api/:a/:b',
    a  : req.params.a,
    b  : req.params.b
  });
});
