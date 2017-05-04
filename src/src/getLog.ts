import * as express from 'express';

export function getLog(req: express.Request) {
    return (req as any).context.log as (message: string, ...args: any[]) => void;
}
