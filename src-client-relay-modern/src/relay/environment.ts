import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';
import { network } from "./network";

const source = new RecordSource();
const store = new Store(source);
const handlerProvider: any = null;

export const environment = new Environment({
    handlerProvider,
    network,
    store,
});