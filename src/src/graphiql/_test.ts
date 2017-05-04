import * as express from 'express';
import * as path from 'path';
import { createHandler } from 'azure-function-express';
import { app as graphiqlapp } from './_app';
import { app as graphqlapp } from '../graphql/_app';

export const app = express();

console.log(__dirname);
__dirname = path.join(__dirname, '../../../fun-graphiql');
console.log(__dirname);

app.use((req, res, next) => {
    console.log(__dirname);
    next();
});

app.use(graphqlapp);
app.use(graphiqlapp);

app.listen(3001, function () {
    console.log('App listening on port 3001!');
});
