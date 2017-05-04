import { testGraphql } from './graphql/graphqlTest';
import { graphqlHandler } from './graphql/graphqlHandler';
import * as express from 'express';

export const app = express();

app.use('/api/graphql', graphqlHandler);

app.get('/api/testgraphql', async (req, res) => {
  const result = await testGraphql((req as any).context.log);
  res.json({ result });
});

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
