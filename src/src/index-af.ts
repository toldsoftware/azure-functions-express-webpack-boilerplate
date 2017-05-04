import { createHandler } from 'azure-function-express';
import { app } from './app';

// Binds Express App to Azure Functions Node Context
declare const global: any;
global.__app_export = createHandler(app);
module.exports = global.__app_export;


