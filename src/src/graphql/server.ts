import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

export function graphqlHandler() {
  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    pretty: true,
  });
}
