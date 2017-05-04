import * as express from 'express';
import * as path from 'path';

export const app = express();

app.use((req, res, next) => {
  const log = (req as any).context.log as (message: string, ...args: any[]) => void;
  log('graphiql request received path=', req.path);
  next();
});


// Doesn't work because dot extension problem in azure functions
// app.use('/graphiql', express.static('files'));

// Alternative (use /file at end of path)
app.use('/graphql', (req, res, next) => {
  const filename = req.path.replace(/\/(file)?$/, '');
  res.sendFile(path.join(__dirname, 'files', filename));
});
