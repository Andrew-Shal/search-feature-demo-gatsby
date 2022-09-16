exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    // used to build country pages
    const { data } = await graphql(`
        {
            allGraphCmsItemCountry {
                edges {
                    node {
                        countrySlug
                        id
                    }
                }
            }
        }
    `)

    const countries = data.allGraphCmsItemCountry.edges

    countries.forEach((country) => {
        createPage({
            path: `/${country.node.countrySlug}/`,
            component: require.resolve('./src/templates/Country/listingPageByCountry.js'),
            context: {
                slug: country.node.countrySlug,
                id: country.node.id,
            },
            defer: country.node.countrySlug > 3,
        })
    })
}
