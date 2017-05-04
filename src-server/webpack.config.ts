import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        '../_deploy/fun-express/bundle.js': `${__dirname}/src/express/_index.ts`,
        '../_deploy/fun-graphql/bundle.js': `${__dirname}/src/graphql/_index.ts`,
        '../_deploy/fun-static/bundle.js': `${__dirname}/src/static/_index.ts`,
    },
    output: {
        path: `${__dirname}/`,
        filename: '[name]',
        // No Sourcemap
        sourceMapFilename: ''
    },
    plugins: [],
    // devtool: 'source-map',
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        ]
    },
};

export default config;
