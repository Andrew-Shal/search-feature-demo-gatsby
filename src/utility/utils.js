export const prependCountryToSlug = (countryName, slug) => {
    return '/' + countryName + slug
}

export const updateURLSearchParam = (keys, values, currentQueryParams) => {
    console.log('[updateURLSearchParam]', keys, values)
    let updatedSearchParams = new URLSearchParams(currentQueryParams.toString())

    for (let i = 0; i < keys.length; i++) {
        if (values[i] === '' || values[i] === null) {
            updatedSearchParams.delete(keys[i])
        } else {
            updatedSearchParams.set(keys[i], values[i])
        }
    }
    return updatedSearchParams.toString()
}

// MAIN SEARCH LOGIC
export const searchFn = (dataset, searchParams) => {
    console.log('searching...')
    console.log('searchParams: ', searchParams)

    // js code to do filtering based on search params
    // const hasCountryFilter = country ? true : false
    const hasBuildingTypeFilter = searchParams.buildingStyle ? true : false
    const hasBuildingStatusFilter = searchParams.buildingStatus ? true : false

    // const searchingBy = searchParams.listingType.value
    const text = searchParams.searchingFor

    const filteredData = dataset.reduce((filteredArr, currentListing) => {
        const validate = (needle, haystack) => haystack.toLowerCase().includes(needle)

        // sets to true for all listings and updates to false when a criteria is not met
        let meetsCriteria = true

        // filter for building types
        if (hasBuildingTypeFilter && currentListing.listingStyle !== searchParams.buildingStyle) meetsCriteria = false
        // filter for building statuses
        if (hasBuildingStatusFilter && currentListing.listingBuildingStatus !== searchParams.buildingStatus) meetsCriteria = false

        if (
            text.trim() !== '' &&
            !(
                validate(text, currentListing.createdAt) ||
                validate(text, currentListing.listingBuildingStatus) ||
                validate(text, currentListing.listingLocation) ||
                validate(text, currentListing.listingPriceRange) ||
                validate(text, currentListing.listingStyle) ||
                validate(text, currentListing.listingTitle) ||
                validate(text, currentListing.slug) ||
                validate(text, currentListing.itemCountry.countryName)
            )
        ) {
            meetsCriteria = false
        }

        // determines if items should be in filtered listing
        if (meetsCriteria) filteredArr.push(currentListing)

        return filteredArr
    }, [])

    return filteredData
}
