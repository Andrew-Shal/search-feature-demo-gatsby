require('dotenv').config()

module.exports = {
    siteMetadata: {
        title: `Search Feature Demo`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    flags: {
        DEV_SSR: true,
    },
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-use-query-params',
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
            __key: 'images',
        },
        {
            resolve: 'gatsby-source-graphcms',
            options: {
                endpoint: process.env.HYGRAPH_ENDPOINT,
                token: process.env.HYGRAPH_TOKEN,
            },
        },
    ],
}
