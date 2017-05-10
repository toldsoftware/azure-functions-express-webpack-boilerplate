// Inspired by https://gist.github.com/vangorra/cd75c27805aafd3c070fdcc8c3bc496b
export function graphqlSchemaToTypescript(sDoc: string, options: {
    types?: boolean,
    scalars?: boolean
    resolvers?: boolean,
    fragments?: boolean,
    ignoreNullable?: boolean,
}) {

    options = {
        resolvers: undefined !== options.resolvers ? options.resolvers : true,
        scalars: undefined !== options.scalars ? options.scalars : true,
        types: undefined !== options.types ? options.types : true,
        fragments: undefined !== options.fragments ? options.fragments : true,
        ignoreNullable: undefined !== options.ignoreNullable ? options.ignoreNullable : true,
    };

    sDoc = ('\r\n' + sDoc + '\r\n');
    const inputNames = sDoc.match(/input\s+([a-zA-Z0-9_-]+)/g).map(x => x.replace('input', '').trim());

    let tDoc = sDoc
        // Descriptions => Comments
        .replace(/^(\s*)#/gm, '$1//')

        // Add Original as comment
        // .replace(/^(\s*)(.*[a-zA-Z].*)$/gm, '$1// $2\r\n$1$2')

        // type A implemenets B => A extends B
        .replace(/(\s+)implements(\s+)/gm, '$1extends$2')

        // type => interface
        // input => interface
        // interface => interface
        .replace(/^(\s*)type /gm, '$1export interface ')
        .replace(/^(\s*)input /gm, '$1export interface ')
        .replace(/^(\s*)interface /gm, '$1export interface ')

        // enum => enum
        .replace(/^(\s*)enum /gm, '$1export enum ')

        // union => type
        .replace(/^(\s*)union /gm, '$1export type ')

        // schema => interface Schema
        .replace(/^(\s*)schema /gm, '$1export interface Schema ')

        // Null && Non-Null
        .replace(/:\s*([a-zA-Z0-9_-]+)!/gm, '!:! $1')
        .replace(/:\s*([a-zA-Z0-9_-]+)/gm, '?: $1')
        .replace(/!:! /gm, ': ')

        // [Type] => Type[] (Nullable and Non-Nullable)
        .replace(/([:\=\|]\s*)\[([a-zA-Z0-9_-]+)!?\]!($|\s+|\))/gm, '$1$2[]$3')
        .replace(/([:\=\|]\s*)\[([a-zA-Z0-9_-]+)!?\]($|\s+|\))/gm, '?$1$2[]$3')
        ;

    // Semicolons
    tDoc = tDoc.split('\n').map(x => x.replace('\r', '').replace(/^(\s*[a-zA-Z].*[^{}])\s*$/, '$1;')).join('\n');

    // enum blocks (replace semincolons with commas)
    tDoc = tDoc
        .replace(/ enum\s*[^{}]+{[^{}]+}/g, (m) => {
            return m
                .replace(/;$/gm, ',')
                ;
        });

    // Resolver Types
    // Schema, Query, Mutations, etc. (remove ? on fields)
    let controlBlocks = tDoc.match(/\n[^\n]*(Schema|Query|Mutations|Subscriptions)\s*[^{}]+{[^{}]+}/gi) || [];
    let interfaceBlocks = tDoc.match(/\n[^\n]+(interface)\s*[^{}]+{[^{}]+}/g) || [];

    // // Remove Control Blocks
    // tDoc = tDoc
    //     .replace(/\n[^\n]*(Schema|Query|Mutations|Subscriptions)\s*[^{}]+{[^{}]+}/gi, '\n');

    const addTypeNameSuffix = (block: string, suffix: string) => {
        const typeNames = block.match(/interface\s+([a-zA-Z0-9_-]+)/g).map(x => x.replace('interface', '').trim());

        // console.log('typeNames', typeNames);

        typeNames.forEach(x => {
            block = block
                .replace(new RegExp(`(\\W${x})(\\W)`, 'g'), '$1' + suffix + '$2')
                .replace(new RegExp(x + suffix + suffix, 'g'), x + suffix)
                ;
        });

        return block;
    };

    const changeReturnPattern = (text: string, returnPattern: string) => {

        // if (block.match(/interface Schema/)) {
        //     return block
        //         .replace(/:\s*(Query|Mutations|Subscriptions);$/gm, `: $1${suffix};`)
        //         ;
        // }

        text = text
            .replace(/:\s*([a-zA-Z0-9_-]+\[?\]?)\s*;$/gm, returnPattern)
            ;

        return text;
    };

    const makePartial = (text: string) => {
        text = text
            .replace(/^(\s*[a-zA-Z0-9_-]+)(:|\?|\()/gm, '$1?$2')
            .replace(/\?\?/gm, '?')
            ;

        return text;
    };

    const makeResolverBlock = (text: string) => {
        // TYPE => TYPE | Promise<TYPE> | ()=>TYPE | ()=>Promise<TYPE>
        return changeReturnPattern(addTypeNameSuffix(text, 'Resolver'), ': $1 | Promise<$1> | (() => $1) | (() => Promise<$1>);');
    };

    const makeFragmentBlock = (text: string) => {
        const fragmentTypeNames = text.match(/interface\s+([a-zA-Z0-9_-]+)/g).map(x => x.replace('interface', '').trim());

        text = addTypeNameSuffix(text, 'FragmentType');

        text += '\r\n\r\n' + fragmentTypeNames.map(x => `declare var ${x}Fragment: ${x}FragmentType;`).join('\r\n');

        return text;
    };

    const rDoc = makeResolverBlock(interfaceBlocks.join('\r\n'));
    const fDoc = makeFragmentBlock(interfaceBlocks.map(x =>
        x.match(/interface\s+(Query|Mutation|Subscription)/) ? makePartial(changeReturnPattern(x, ': Promise<$1>;'))
            : inputNames.some(x2 => !!x.match(`interface ${x2}`)) ? x
                : makePartial(x)
    ).join('\r\n'));

    var result = {
        output: '',
        types: options.types && clean(tDoc, options.scalars, true),
        resolvers: options.resolvers && clean(rDoc, options.scalars, true),
        fragments: options.fragments && clean(fDoc, options.scalars, false)
    };

    result.output =
        (result.types || '')
        + (result.resolvers || '')
        + (result.fragments || '')
        ;

    // Output
    // let output = '';

    // if (options.types) { output += tDoc; }
    // if (options.resolvers) { output += rDoc; }

    return result;
}

function clean(output: string, scalars: boolean, nullables: boolean) {

    // Scalars
    const shouldUseScalarAliases = scalars;

    if (!shouldUseScalarAliases) {
        output = output
            // Scalars => scalars
            .replace(/(\W)String(\W)/gm, '$1string$2')
            .replace(/(\W)Boolean(\W)/gm, '$1boolean$2')
            .replace(/(\W)ID(\W)/gm, '$1string$2')
            .replace(/(\W)Int(\W)/gm, '$1number$2')
            .replace(/(\W)Float(\W)/gm, '$1number$2')
            ;
    } else {
        // Add Scalar Type Aliases
        output = `
        TEST
export type ID = string;
export type Int = number;
export type Float = number;
` + output;

        output = output
            // Scalars => scalars (Fix String and Boolean at least)
            .replace(/(\W)String(\W)/gm, '$1string$2')
            .replace(/(\W)Boolean(\W)/gm, '$1boolean$2')
            ;
    }

    // Move nullable before paranthesis
    output = output
        .replace(/\)\s*\?:/g, ')?:')
        .split('\n')
        .map(x => x.match(/\)\?:/) ? x.replace(')?:', '):').replace('(', '?(') : x)
        .join('\n')
        .replace(/\?\?/g, '?');

    // if (!nullables) {
    //     // Remove Nullable
    //     output = output
    //         .replace(/\?:/g, ':')
    //         ;
    // }

    // Make declarations
    output = output.replace(/export /g, 'declare ');
    return output;
}
