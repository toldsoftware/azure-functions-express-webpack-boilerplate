import { createHandler } from 'azure-function-express';
import { app } from './app';

// Binds Express App to Azure Functions Node Context
module.exports = createHandler(app);
