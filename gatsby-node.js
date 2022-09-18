exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    // get enums for filtering dropdowns
    const { data: listingTypesEnums } = await graphql(`
        {
            RealEstateFilterByEnums: allGraphCmsItemRealEstate {
                buildingStatus: distinct(field: listingBuildingStatus)
                buildingStyle: distinct(field: listingStyle)
            }
            HotelFilterByEnums: allGraphCmsItemHotel {
                buildingStatus: distinct(field: listingBuildingStatus)
                buildingStyle: distinct(field: listingStyle)
            }
            LandFilterByEnums: allGraphCmsItemLand {
                buildingStatus: distinct(field: listingBuildingStatus)
                buildingStyle: distinct(field: listingStyle)
            }
        }
    `)

    // get all data by listing type grouping
    const { data: allListingTypesData } = await graphql(`
        {
            allRealEstateListings: allGraphCmsItemRealEstate {
                nodes {
                    id
                    createdAt
                    listingBuildingStatus
                    listingLocation
                    listingPriceRange
                    listingStyle
                    listingTitle
                    slug
                    itemCountry {
                        id
                        countrySlug
                        countryName
                    }
                }
            }
            allLandListings: allGraphCmsItemLand {
                nodes {
                    id
                    createdAt
                    listingBuildingStatus
                    listingLocation
                    listingPriceRange
                    listingStyle
                    listingTitle
                    slug
                    itemCountry {
                        id
                        countrySlug
                        countryName
                    }
                }
            }
            allHotels: allGraphCmsItemHotel {
                nodes {
                    id
                    createdAt
                    listingBuildingStatus
                    listingLocation
                    listingPriceRange
                    listingStyle
                    listingTitle
                    slug
                    itemCountry {
                        id
                        countrySlug
                        countryName
                    }
                }
            }
        }
    `)

    // =========== PAGES BY LISTING TYPE ===========
    // IE. www.test.com/hotel/listings
    // =============================================

    // get page context for hotels listing page
    const hotels = allListingTypesData.allHotels?.nodes || []
    const hotelBuildingStyleEnums = listingTypesEnums.HotelFilterByEnums.buildingStyle
    const hotelBuildingStatusEnums = listingTypesEnums.HotelFilterByEnums.buildingStatus

    // get page context for lands listing page
    const lands = allListingTypesData.allLandListings?.nodes || []
    const landBuildingStyleEnums = listingTypesEnums.LandFilterByEnums.buildingStyle
    const landBuildingStatusEnums = listingTypesEnums.LandFilterByEnums.buildingStatus

    // get page context for real estate listing page
    const realEstates = allListingTypesData.allRealEstateListings?.nodes || []
    const realEstateBuildingStyleEnums = listingTypesEnums.RealEstateFilterByEnums.buildingStyle
    const realEstateBuildingStatusEnums = listingTypesEnums.RealEstateFilterByEnums.buildingStatus

    createPage({
        path: `/real-estate/listings`,
        component: require.resolve('./src/templates/ListingsByListingType/ListingsByListingTypeTemplate.js'),
        context: {
            title: 'Real Estate',
            listingType: 'real-estate',
            data: realEstates,
            filters: {
                buildingStyleOptions: realEstateBuildingStyleEnums,
                buildingStatusOptions: realEstateBuildingStatusEnums,
            },
        },
    })
    createPage({
        path: `/land/listings`,
        component: require.resolve('./src/templates/ListingsByListingType/ListingsByListingTypeTemplate.js'),
        context: {
            title: 'Land',
            listingType: 'land',
            data: lands,
            filters: {
                buildingStyleOptions: landBuildingStyleEnums,
                buildingStatusOptions: landBuildingStatusEnums,
            },
        },
    })
    createPage({
        path: `/hotel/listings`,
        component: require.resolve('./src/templates/ListingsByListingType/ListingsByListingTypeTemplate.js'),
        context: {
            title: 'hotel',
            listingType: 'hotel',
            data: hotels,
            filters: {
                buildingStyleOptions: hotelBuildingStyleEnums,
                buildingStatusOptions: hotelBuildingStatusEnums,
            },
        },
    })
    // =========== END OF PAGES BY LISTING TYPE ===========

    // =========== PAGES BY COUNTRY / LISTING TYPE ===========
    // IE. www.test.com/belize/real-estate/listings
    // =======================================================
    const { data: allCountries } = await graphql(`
        {
            allListingTypesByCountry: allGraphCmsItemCountry {
                nodes {
                    id
                    countryName
                    countrySlug
                    allRealEstateListingsByCountry: itemRealEstates {
                        id
                        createdAt
                        listingBuildingStatus
                        listingLocation
                        listingPriceRange
                        listingStyle
                        listingTitle
                        slug
                        itemCountry {
                            id
                            countrySlug
                            countryName
                        }
                    }
                    allLandListingsByCountry: itemLand {
                        id
                        createdAt
                        listingBuildingStatus
                        listingLocation
                        listingPriceRange
                        listingStyle
                        listingTitle
                        slug
                        itemCountry {
                            id
                            countrySlug
                            countryName
                        }
                    }
                    allHotelsByCountry: itemHotels {
                        id
                        createdAt
                        listingBuildingStatus
                        listingLocation
                        listingPriceRange
                        listingStyle
                        listingTitle
                        slug
                        itemCountry {
                            id
                            countrySlug
                            countryName
                        }
                    }
                }
            }
        }
    `)

    for (const country of allCountries.allListingTypesByCountry.nodes) {
        // get page context for country/hotels listing page
        const hotels = country.allHotelsByCountry || []

        // get page context for country/lands listing page
        const lands = country.allLandListingsByCountry || []

        // get page context for country/real estates listing page
        const realEstates = country.allRealEstateListingsByCountry || []

        const { data: allListingFiltersByCountry } = await graphql(
            `query GetAllListingFiltersByCountry {
                    RealEstateFilterByEnums: allGraphCmsItemRealEstate(filter: { itemCountry: { id: { eq: ` +
                JSON.stringify(country.id) +
                ` } } }) {
                    buildingStatus: distinct(field: listingBuildingStatus)
                    buildingStyle: distinct(field: listingStyle)
                }
                HotelFilterByEnums: allGraphCmsItemHotel(filter: { itemCountry: { id: { eq: ` +
                JSON.stringify(country.id) +
                ` } } }) {
                        buildingStatus: distinct(field: listingBuildingStatus)
                    buildingStyle: distinct(field: listingStyle)
                }
                LandFilterByEnums: allGraphCmsItemLand(filter: { itemCountry: { elemMatch: { id: { eq:` +
                JSON.stringify(country.id) +
                ` } } } }) {
                    buildingStatus: distinct(field: listingBuildingStatus)
                    buildingStyle: distinct(field: listingStyle)
                    }

                }`
        )
        // hotel filter options
        const hotelBuildingStyleEnums = allListingFiltersByCountry.HotelFilterByEnums.buildingStyle
        const hotelBuildingStatusEnums = allListingFiltersByCountry.HotelFilterByEnums.buildingStatus
        // land filter options
        const landBuildingStyleEnums = allListingFiltersByCountry.LandFilterByEnums.buildingStyle
        const landBuildingStatusEnums = allListingFiltersByCountry.LandFilterByEnums.buildingStatus
        // real estate filter options
        const realEstateBuildingStyleEnums = allListingFiltersByCountry.RealEstateFilterByEnums.buildingStyle
        const realEstateBuildingStatusEnums = allListingFiltersByCountry.RealEstateFilterByEnums.buildingStatus

        createPage({
            path: `/${country.countrySlug}/real-estate/listings`,
            component: require.resolve('./src/templates/ListingsByCountry/ListingsByCountryTemplate.js'),
            context: {
                countryId: country.id,
                title: `Real Estates in ${country.countryName}`,
                countrySlug: country.countrySlug,
                countryName: country.countryName,
                listingType: 'real-estate',
                data: realEstates,
                filters: {
                    buildingStyleOptions: realEstateBuildingStyleEnums,
                    buildingStatusOptions: realEstateBuildingStatusEnums,
                },
            },
        })
        createPage({
            path: `/${country.countrySlug}/land/listings`,
            component: require.resolve('./src/templates/ListingsByCountry/ListingsByCountryTemplate.js'),
            context: {
                countryId: country.id,
                title: `Lands in ${country.countryName}`,
                countrySlug: country.countrySlug,
                countryName: country.countryName,
                listingType: 'land',
                data: lands,
                filters: {
                    buildingStyleOptions: landBuildingStyleEnums,
                    buildingStatusOptions: landBuildingStatusEnums,
                },
            },
        })
        createPage({
            path: `/${country.countrySlug}/hotel/listings`,
            component: require.resolve('./src/templates/ListingsByCountry/ListingsByCountryTemplate.js'),
            context: {
                countryId: country.id,
                title: `Hotels in ${country.countryName}`,
                countrySlug: country.countrySlug,
                countryName: country.countryName,
                listingType: 'hotel',
                data: hotels,
                filters: {
                    buildingStyleOptions: hotelBuildingStyleEnums,
                    buildingStatusOptions: hotelBuildingStatusEnums,
                },
            },
        })
    }

    // =========== END OF PAGES BY COUNTRY / LISTING TYPE ===========
}
