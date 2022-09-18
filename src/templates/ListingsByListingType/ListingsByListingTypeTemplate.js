import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listings from '../../components/Listings/Listings'
import SearchByButtons from '../../components/Search/ListingPageSearch/components/SearchByButtons'
import ListingPageSearch from '../../components/Search/ListingPageSearch/ListingPageSearch'
import { listingPagesMetaData } from '../../common/listingPagesMetaData'
import SearchWrapper from '../../components/Search/shared/SearchWrapper'

const ListingsByListingTypeTemplate = (props) => {
    const dataSource = props.pageContext.data
    const filterGroups = props.pageContext.filters
    const [searchResults, setSearchResults] = useState(dataSource)

    const handleSearchResults = (searchResults) => {
        console.log('[ListingsByListingTypeTemplate - [handleSearchResults]')
        setSearchResults([...searchResults])
    }

    const handleSearchParams = (searchParams) => {
        console.log('[ListingsByListingTypeTemplate - [handleSearchParams]')
    }

    const handleSearchChange = (searchByType) => {
        console.log('[ListingsByListingTypeTemplate - handleSearchChange]')
    }

    return (
        <React.Fragment>
            <a href="/">Home</a>
            <h3>{`${props.pageContext.title} Listings`}</h3>
            <SearchWrapper>
                <SearchByButtons selected={listingPagesMetaData.find((lp) => lp.value === props.pageContext.listingType)} searchByTypes={listingPagesMetaData} onSearchByChanged={handleSearchChange} />
                <Router>
                    <Routes>
                        <Route
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
                        ></Route>
                    </Routes>
                </Router>
            </SearchWrapper>

            {searchResults?.length ? <Listings listingsData={searchResults} /> : <h3>No results found</h3>}
        </React.Fragment>
    )
}

export default ListingsByListingTypeTemplate
