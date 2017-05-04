import { createHandler } from 'azure-function-express';
import { app } from './_app';
import { registerLog } from '../log';

registerLog(console.log.bind(console));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
