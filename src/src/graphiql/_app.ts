import * as express from 'express';
import * as path from 'path';
import { getLog } from '../getLog';

export const app = express();

app.use((req, res, next) => {
  const log = getLog(req);
  log('graphiql request received', 'path', req.path, 'query', req.query);
  next();
});


// Doesn't work because dot extension problem in azure functions
// app.use('/graphiql', express.static('files'));

// Alternative (use /file at end of path)
app.use((req, res, next) => {
  const log = getLog(req);
  const filename = req.query.file
    || req.path
      .replace(/^\/graphiql/, '')
      .replace(/\/(file)?$/, '')
    || 'index.html'
    ;

  log('graphiql file handler', 'path', req.path, 'query', req.query, 'filename', filename);

  res.sendFile(path.join(__dirname, '../src/src/graphiql/files', filename));
});
