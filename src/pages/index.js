import React from 'react'
import HomePageSearch from '../components/Search/HomepageSearch/HomePageSearch'
import { listingPagesMetaData } from '../common/listingPagesMetaData'
import { prependCountryToSlug } from '../utility/utils'
import { graphql } from 'gatsby'
import SearchWrapper from '../components/Search/shared/SearchWrapper'

const HomePage = ({ data }) => {
    const handleSearchParams = (searchParams) => {
        console.log('[HomePage - handleSearchParams]')
        let sq = ''
        if (searchParams.searchtext) sq = `?sq=${searchParams.searchtext}`
        const isBrowser = typeof window !== 'undefined'
        console.log('isBrowser: ', isBrowser)
        if (isBrowser) {
            window.location.href = searchParams.selectedListingType.slug + sq
        }
    }

    const countries = data.allListingTypesByCountry.nodes || []

    const countriesWithAdjustedSlugs = countries.map((country) => {
        // defaulting to real estate or whatever is the first item in listingpagesmetadata
        const adjustedSlug = prependCountryToSlug(country.countrySlug, listingPagesMetaData[0].slug)
        return { ...country, countrySlug: adjustedSlug }
    })

    return (
        <React.Fragment>
            <SearchWrapper>
                <HomePageSearch defaultListingType={listingPagesMetaData[0]} listingTypes={listingPagesMetaData} onSearchParams={handleSearchParams} />
            </SearchWrapper>
            <ul>
                {countriesWithAdjustedSlugs.map((country) => (
                    <li key={country.id}>
                        <a href={country.countrySlug}>{country.countryName}</a>
                    </li>
                ))}
            </ul>
            <br />
            <br />
            <h2>This is a search feature demo</h2>
            Paths should be either of 2<br />
            <ol>
                <li>
                    This filter listings by country and listing type.
                    <ul>
                        <li>www.domain.com/[COUNTRY]/[LISTING_TYPE]/listings</li>
                    </ul>
                </li>

                <li>
                    This filter by listing type.
                    <ul>
                        <li>www.domain.com/[LISTING_TYPE]/listings</li>
                    </ul>
                </li>
            </ol>
            <br />
            Additional, you can filter by building style and building status, see examples below.
            <ul>
                <li>
                    Filtering by status
                    <br />
                    www.domain.com/[LISTING_TYPE]/listings?status=built
                </li>
                <li>
                    Filtering by status
                    <br />
                    www.domain.com/[COUNTRY]/[LISTING_TYPE]/listings?style=apartment_complex
                </li>
                <li>
                    Filtering by status and style
                    <br />
                    www.domain.com/[COUNTRY]/[LISTING_TYPE]/listings?style=apartment_complex&amp;status=under_construction
                </li>
                <li>
                    Filtering by status and style and searching
                    <br />
                    www.domain.com/[COUNTRY]/[LISTING_TYPE]/listings?style=apartment_complex&amp;status=under_construction&sq=30k
                </li>
            </ul>
            The search(sq) looks for matches in the following database fields. You can see the code in utillity/utility.js under searchfn
            <ul>
                <li>createdAt</li>
                <li>listingBuildingStatus</li>
                <li>listingLocation</li>
                <li>listingPriceRange</li>
                <li>listingStyle</li>
                <li>listingTitle</li>
                <li>slug</li>
                <li>itemCountry.countryName</li>
            </ul>
        </React.Fragment>
    )
}

export const query = graphql`
    {
        allListingTypesByCountry: allGraphCmsItemCountry {
            nodes {
                id
                countryName
                countrySlug
            }
        }
    }
`

export default HomePage
