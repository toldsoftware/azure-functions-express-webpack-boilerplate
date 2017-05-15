import * as RX from 'reactxp';
// import { App } from './app-hello-world/app';
import { App } from './app-resub-todo/app';

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
