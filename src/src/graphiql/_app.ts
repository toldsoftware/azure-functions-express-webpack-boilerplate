import * as express from 'express';

export const app = express();

app.use('/graphiql', express.static('files'));
