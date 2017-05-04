import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema, graphql } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

export function testGraphql(log: (message: string, ...args: any[]) => void) {
  return new Promise((resolve, reject) => {
    graphql(schema, '{ hello }', root).then((response) => {
      log(JSON.stringify(response));
      resolve(response);
    });
  });
}