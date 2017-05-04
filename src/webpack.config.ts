import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: './src/index-af.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/../function-main/',
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
