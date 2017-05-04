import { testGraphql } from './graphqlTest';
import { graphqlHandler } from './graphqlHandler';
import * as express from 'express';

export const app = express();

app.use('/graphql', graphqlHandler());

app.get('/testgraphql', async (req, res) => {
  const result = await testGraphql((req as any).context.log);
  res.json({ result });
});
