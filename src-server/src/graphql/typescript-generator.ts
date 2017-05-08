// Based on https://gist.github.com/vangorra/cd75c27805aafd3c070fdcc8c3bc496b
function toTypescript(sDoc: string): string {

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

        // Semicolons
        .replace(/^(\s*[a-zA-Z].*[^{}])\s*$/gm, '$1;')
        ;

    // enum blocks (replace semincolons with commas)
    tDoc = tDoc
        .replace(/ enum\s*[^{}]+{[^{}]+}/g, (m) => {
            return m
                .replace(/;$/gm, ',')
                ;
        });

    // Resolver Types
    // Schema, Query, Mutations, etc. (remove ? on fields)
    // let controlBlocks = tDoc.match(/\n[^\n]+(Schema|Query|Mutations|Subscriptions)\s*[^{}]+{[^{}]+}/g) || [];
    let interfaceBlocks = tDoc.match(/\n[^\n]+(interface)\s*[^{}]+{[^{}]+}/g) || [];

    // Remove Control Blocks
    tDoc = tDoc
        .replace(/\n[^\n]+(Schema|Query|Mutations|Subscriptions)\s*[^{}]+{[^{}]+}/g, '\n');

    const makeResolverBlock = (block: string) => {

        block = block
            // Add "Resolver"
            .replace(/(\s*)interface\s+([a-zA-Z0-9_-]+)/gm, '$1interface $2Resolver')
            .replace(/(\s*)extends\s+([a-zA-Z0-9_-]+)/gm, '$1extends $2Resolver')

            // Remove nullable
            .replace(/\?:/g, ':')
            ;

        if (block.match(/interface Schema/)) {
            return block
                .replace(/:\s*(Query|Mutations|Subscriptions);$/gm, ': $1Resolver;')
                ;
        }

        block = block
            // TYPE => TYPE | Promise<TYPE> | ()=>TYPE | ()=>Promise<TYPE>
            .replace(/:\s*([a-zA-Z0-9_-]+\[?\]?)\s*;$/gm, ': $1 | Promise<$1> | (() => $1) | (() => Promise<$1>);')
            ;

        return block;
    };

    let rDoc = interfaceBlocks.map(x => makeResolverBlock(x)).join('\r\n')
        // + controlBlocks.map(x => makeResolverBlock(x)).join('\r\n')
        ;

    // Change all types in rDoc to Resolver Names
    const resolverNames = rDoc.match(/\s+([a-zA-Z0-9_-]+)Resolver/g).map(x => x.replace('Resolver', '').trim());
    resolverNames.forEach(x => {
        rDoc = rDoc
            .replace(new RegExp(x, 'g'), x + 'Resolver')
            .replace(new RegExp(x + 'ResolverResolver', 'g'), x + 'Resolver')
            ;
    });

    tDoc += '\r\n\r\n// Resolvers ------' + rDoc;

    // Scalars
    const shouldUseScalarAliases = true;

    if (!shouldUseScalarAliases) {
        tDoc = tDoc
            // Scalars => scalars
            .replace(/: ID/gm, ': string')
            .replace(/: String/gm, ': string')
            .replace(/: Int/gm, ': number')
            .replace(/: Float/gm, ': number')
            .replace(/: Boolean/gm, ': boolean')
            ;
    } else {
        // Add Scalar Type Aliases
        tDoc = `
type ID = string;
type String = string;
type Int = number;
type Float = number;
type Boolean = boolean;
` + tDoc;
    }

    return tDoc;
}

import { schemaDoc } from './schema';
const ts = toTypescript(schemaDoc);
console.log(ts);

// {
//   __schema {
//     queryType{
//       fields {
//         name
//         type {
//           name
//         }
//         args {
//           name
//           type {
//             name
//           }
//         }
//       }
//     }

//     types {
//       kind
//       name
//       description
//       inputFields {
//         name
//         type {
//           name
//         }
//       }
//       fields {
//         name
//         type {
//           name
//         }
//       }
//       enumValues {
//         name
//       }
//     }
//   }
// }
