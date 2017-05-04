import * as express from 'express';

export const app = express();

app.use((req, res, next) => {
  const log = (req as any).context.log as (message: string, ...args: any[]) => void;
  log('graphiql request received', req.query);
});

app.use('/graphiql', express.static('files'));
