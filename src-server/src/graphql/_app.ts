import * as express from 'express';
import { registerLog } from '../log';
import * as graphqlHTTP from 'express-graphql';
import { schema, schemaDoc } from './schema';
import { rootResolver } from './resolvers';

export const app = express();
app.use((req, res, next) => { registerLog(req); next(); });

app.use('/graphql/schemadoc', (req, res, next) => {
  res.setHeader('content-type', 'text/plain');
  res.end(schemaDoc);
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
  pretty: true,
}));
