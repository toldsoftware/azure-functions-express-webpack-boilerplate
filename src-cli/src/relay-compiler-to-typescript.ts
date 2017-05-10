export function relayCompilerToTypescript(sDoc: string, options: {}): string {
    let flowDoc = sDoc.match(/\/\*::([^\*]*)\*\//)[1] || '';

    let typeBlocks = flowDoc.match(/\n(export type)\s*[^{}]+{[^{}]+}/g) || [];

    let output = typeBlocks.join('\n\n');

    output = output.replace(/export /g, 'declare ');
    return output;
}
