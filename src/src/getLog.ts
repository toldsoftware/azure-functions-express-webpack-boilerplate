import * as express from 'express';

export function getLog(req: express.Request) {
    if (console.log) { return console.log.bind(console); }

    return (req as any).context.log as (message: string, ...args: any[]) => void;
}
