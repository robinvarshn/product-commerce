/** @type {import('next').NextConfig} */
/**
 * Over-rides the Next JS Configs With Manual Settings
 * @author Robin Varshney (robinvarshn@adobe.com)
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const nextConfig = {
    useFileSystemPublicRoutes: true,
    images: {
        domains: ['publish-p12756-e735552.adobeaemcloud.com', 'cdn.pixabay.com'],
    },
    publicRuntimeConfig: {
        mapsApiKey: process.env.NEXT_MAPS_API_KEY,
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']],
                        },
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: false,
                        sassOptions: {
                            importer: globImporter(),
                        },
                    },
                },
                {
                    loader: 'webpack-import-glob-loader',
                    options: {
                        url: false,
                    },
                },
            ],
        });
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'static/css/[contenthash].css',
                chunkFilename: 'static/css/[contenthash].css',
                ignoreOrder: true,
            }),
        );
        return config;
    },
};

module.exports = nextConfig;
