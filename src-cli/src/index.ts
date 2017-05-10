#!/usr/bin/env node
import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as watch from 'node-watch';

import { graphqlSchemaToTypescript } from './graphql-schema-to-typescript';
import { relayCompilerToTypescript } from './relay-compiler-to-typescript';

function log(message: string, ...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log(message, ...args);
}

function logError(message: string, ...args: any[]) {
    // tslint:disable-next-line:no-console
    console.error(message, ...args);
}

function processFile(pathSource: string, pathTarget: string, transform: (source: string) => string) {
    fs.readFile(pathSource, { encoding: 'utf-8' }, (err, content) => {
        if (err) {
            logError('Cannot read file: ', { pathSource });
            return;
        }

        const result = transform(content);

        // log('content', content);
        // log('result', result);

        // Ensure dir exists
        var dirname = path.dirname(pathTarget);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }

        fs.writeFile(pathTarget, result, { encoding: 'utf-8' }, (err2) => {
            if (err2) {
                logError('Cannot write file: ', { pathTarget });
                return;
            }
        });
    });
}

let hasRun = false;
let pathToSource_last: string;
export function main(pathToSource: string) {
    hasRun = true;
    pathToSource_last = pathToSource;

    const a = program as any;
    const all = !a.types && !a.resolvers && !a.flow;
    const flow = all || !!a.flow;
    const types = all || !!a.types;
    const resolvers = all || !!a.resolvers;
    const fragments = all || !!a.fragments;

    const scalars = all || types && !!a.scalars;
    let pathToSchema = a.schema;

    // log('START', { pathToSchema, pathToSource, types, resolvers, scalars, flow, targetPathSchemaTypes });

    if (pathToSchema && (types || resolvers)) {
        log('processing schema file:', pathToSchema);

        const processSchema = (suffix: string, options: {
            types?: boolean, resolvers?: boolean, fragments?: boolean, scalars?: boolean
        }) => {
            let targetPathSchemaTypes = pathToSchema + `.${suffix}.d.ts`;
            pathToSchema = path.resolve(pathToSchema);
            targetPathSchemaTypes = path.resolve(targetPathSchemaTypes);
            processFile(pathToSchema, targetPathSchemaTypes, content => graphqlSchemaToTypescript(content, options).output);
        };

        if (types) { processSchema('types', { types: true, resolvers: false, fragments: false, scalars }); }
        if (resolvers) { processSchema('resolvers', { types: false, resolvers: true, fragments: false, scalars }); }
        if (fragments) { processSchema('fragments', { types: false, resolvers: false, fragments: true, scalars }); }
    }

    if (flow) {
        glob('**/*.graphql.js', (err, matches) => {
            // log('flow files', { matches });

            for (let f of matches) {
                log('processing flow file:', f);
                const t = f.replace('__generated__', '__generated__types__') + '.d.ts';
                processFile(f, t, content => relayCompilerToTypescript(content, {}));
            }
        });
    }
}

program
    .version('0.0.1')
    .usage('tql [options] <pathToSource>')
    .option('-s, --schema <pathToSchema>', 'Path to source folder')
    .option('-t, --types', 'Generate Types from Schema')
    .option('--scalars', 'Use scalar alias')
    .option('-r, --resolvers', 'Generate Resolvers from Schema')
    .option('--fragments', 'Generate Fragments from Schema')
    .option('-f, --flow', 'Generate Types from Relay Compiler Flow Generation')
    .option('-w, --watch', 'Watch for file changes')
    .action(main)
    .parse(process.argv);

if (program.watch) {

    const fileHashes: { [name: string]: string } = {};
    let timeoutId: NodeJS.Timer = null;
    const refresh = (evt: 'update' | 'remove', name: string) => {

        const stat = fs.statSync(name);
        const isFile = stat.isFile();
        const fHash = stat.size + '';

        if (!isFile
            || name.match(/\.d\.ts$/)
            || fileHashes[name] === fHash) {
            return;
        }

        console.log('changed file:', name);

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            main(pathToSource_last);
        }, 250);
    };

    watch(['src'], { recursive: true }, refresh);
    //watch([pathToSchema_last, program.pathToSource], { recursive: true }, refresh);

} else if (!hasRun) {
    program.outputHelp();
}
