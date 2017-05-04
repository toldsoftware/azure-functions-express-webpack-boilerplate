import * as express from 'express';
import { registerLog } from '../log';
import * as graphqlHTTP from 'express-graphql';
import { schema } from './schema';
import { root } from './root';

export const app = express();
app.use((req, res, next) => { registerLog(req); next(); });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  pretty: true,
}));
