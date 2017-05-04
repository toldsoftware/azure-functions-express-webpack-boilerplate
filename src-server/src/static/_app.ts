import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { registerLog, log } from '../log';

export const app = express();
app.use((req, res, next) => { registerLog(req); next(); });

// Doesn't work because dot extension problem in azure functions
// app.use('/graphiql', express.static('files'));

// Alternative (use query string ?file=FILE)
// This will work with Azure Functions Proxies to map
// /static/FILE
// to
// /fun-static/?file=
app.use((req, res, next) => {
  const filename = req.query.file
    || 'index.html';

  const dir = __dirname.match('src-server')
    ? path.join(__dirname, '../../../static')
    : path.join(__dirname, '../static');

  const p = path.join(dir, filename);
  log('graphiql file handler', 'path', req.path, 'query', req.query, 'filename', filename, 'path', p);

  // Doesn't work with azure function express
  // res.sendFile(p);

  // if (!fs.exists(p)) {
  //   log('ERROR: File Does Not Exist');
  //   res.statusCode = 404;
  //   res.end('File Not Found: ' + p);
  //   return;
  // }

  fs.readFile(p, (err, data) => {
    log('readFile path=', p);

    if (err != null) {
      log('ERROR: ', err, p);
      res.statusCode = 404;
      res.end('File Not Found: ' + p);
      return;
    }

    let body = data;

    let type = 'text/plain';

    if (p.match('\.html$')) { type = 'text/html'; }
    if (p.match('\.css$')) { type = 'text/css'; }
    if (p.match('\.js$')) { type = 'application/x-javascript'; }
    if (p.match('\.json$')) { type = 'application/json'; }
    if (p.match('\.jpg$')) { type = 'image/jpeg'; }
    if (p.match('\.png$')) { type = 'image/png'; }
    if (p.match('\.gif$')) { type = 'image/gif'; }
    if (p.match('\.ico$')) { type = 'image/x-icon'; }

    res.setHeader('Cache-Control', 'max-age=300000, public');
    res.setHeader('Content-Type', type);
    res.end(body, 'utf8');
  });
});