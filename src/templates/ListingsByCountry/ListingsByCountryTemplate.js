import React, { useState } from 'react'
import Listings from '../../components/Listings/Listings'
import SearchByButtons from '../../components/Search/ListingPageSearch/components/SearchByButtons'
import ListingPageSearch from '../../components/Search/ListingPageSearch/ListingPageSearch'
import { listingPagesMetaData } from '../../common/listingPagesMetaData'
import { prependCountryToSlug } from '../../utility/utils'
import SearchWrapper from '../../components/Search/shared/SearchWrapper'
import Loadable from '@loadable/component'

const LoadableRouter = Loadable(() => import('../../components/Search/ListingPageSearch/LoadableRouter'))

const ListingsByCountryTemplate = (props) => {
    const listingPagesMetaDataByCountry = listingPagesMetaData.map((lpmd) => ({
        ...lpmd,
        slug: prependCountryToSlug(props.pageContext.countrySlug, lpmd.slug),
    }))

    const dataSource = props.pageContext.data
    const filterGroups = props.pageContext.filters
    const [searchResults, setSearchResults] = useState(dataSource)

    // this will allow th search bar to load in
    const [showListings, setShowListings] = useState(false)

    const handleSearchResults = (searchResults) => {
        console.log('[handleSearchResults]')
        setSearchResults([...searchResults])
        setShowListings(true)
    }

    const handleSearchParams = (searchParams) => {
        console.log('handleSearchParams')
    }

    const handleSearchChange = (searchByType) => {
        console.log('[ListingPageByCountryv2 - handleSearchChange]')
    }

    return (
        <React.Fragment>
            <a href="/">Home</a>
            <h3>{`${props.pageContext.title} Listings`}</h3>
            <SearchWrapper>
                <SearchByButtons
                    selected={listingPagesMetaDataByCountry.find((lp) => lp.value === props.pageContext.listingType)}
                    searchByTypes={listingPagesMetaDataByCountry}
                    onSearchByChanged={handleSearchChange}
                />
                {typeof window !== 'undefined' ? (
                    <LoadableRouter
                        path={`${props.path}`}
                        element={
                            <ListingPageSearch
                                dataSource={dataSource}
                                filterGroups={filterGroups}
                                onSearchParams={handleSearchParams}
                                onSearchResults={handleSearchResults}
                                searchPlaceholder={props.pageContext.title}
                            />
                        }
                    />
                ) : null}
            </SearchWrapper>
            {showListings ? searchResults?.length ? <Listings listingsData={searchResults} /> : <h3>No results found</h3> : <h3>Loading...</h3>}
        </React.Fragment>
    )
}

export default ListingsByCountryTemplate
