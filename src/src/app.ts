import { graphqlHandler } from './graphql/server';
import * as express from 'express';

export const app = express();

app.use('/api/graphql', graphqlHandler);

app.get('/api', (req, res) => {
  res.json({
    pattern: '/api',
    a: req.params.a,
    b: req.params.b
  });
});


app.get('/api/:a', (req, res) => {
  res.json({
    pattern: '/api/:a',
    a: req.params.a,
    b: req.params.b
  });
});


app.get('/api/:a/:b', (req, res) => {
  res.json({
    pattern: '/api/:a/:b',
    a: req.params.a,
    b: req.params.b
  });
});
