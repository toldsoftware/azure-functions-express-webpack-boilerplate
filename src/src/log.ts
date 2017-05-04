import * as express from 'express';

type LogMethod = (message: string, ...args: any[]) => void;
let _log = console && console.log && console.log.bind(console);

export function registerLog(req: express.Request) {
    var r = req as any;
    if (r && r.context && r.context.log) {
        _log = r.context.log;
    }
}

export function getLog() {
    return _log;
}

export const log: LogMethod = function () {
    _log.apply(null, arguments);
};
