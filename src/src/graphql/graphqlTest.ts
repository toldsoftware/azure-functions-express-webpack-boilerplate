import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { graphql } from 'graphql';

import { schema } from './schema';
import { root } from './root';

export function testGraphql(log: (message: string, ...args: any[]) => void) {
  return new Promise((resolve, reject) => {
    graphql(schema, '{hero(id:"123"){id name appearsIn totalCredits}}', root).then((response) => {
      log(JSON.stringify(response));
      resolve(response);
    });
  });
}