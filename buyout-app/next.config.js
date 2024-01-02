const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    basePath: '',

    webpack: (config, options) => {
        const { isServer } = options;
        //config.experiments = { topLevelAwait: true, layers: false };
        config.plugins.push(
            new NextFederationPlugin({
                
                name: 'app',
                remotes: {
                    components: `components@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
                },
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './test': "./Test.tsx"
                },
                extraOptions: {
                    exposePages: true
                }
            })
        );
        return config;
    }
}

module.exports = nextConfig
