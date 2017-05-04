import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { schema } from './schema';
import { root } from './root';

export function graphqlHandler() {

  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    pretty: true,
  });
}
