import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listings from '../../components/Listings/Listings'
import SearchByButtons from '../../components/Search/ListingPageSearchv2/components/SearchByButtons'
import ListingPageSearchv2 from '../../components/Search/ListingPageSearchv2/ListingPageSearchv2'
import { listingPagesMetaData } from '../../common/listingPagesMetaData'
import { prependCountryToSlug } from '../../utility/utils'

const ListingPageByCountryv2 = (props) => {
    const listingPagesMetaDataByCountry = listingPagesMetaData.map((lpmd) => ({
        ...lpmd,
        slug: prependCountryToSlug(props.pageContext.countrySlug, lpmd.slug),
    }))

    console.log('listingPagesMetaDataByCountry: ', listingPagesMetaDataByCountry)

    // const filterGroups = props.data.
    console.log('props: ', props)
    const dataSource = props.pageContext.data
    const filterGroups = props.pageContext.filters
    const [searchResults, setSearchResults] = useState(dataSource)

    const handleSearchResults = (searchResults) => {
        console.log('[handleSearchResults]')
        setSearchResults([...searchResults])
    }

    const handleSearchParams = (searchParams) => {
        console.log('handleSearchParams')
    }

    const handleSearchChange = (searchByType) => {
        console.log('[ListingPageByCountryv2 - handleSearchChange]')
    }

    return (
        <React.Fragment>
            <h3>{`${props.pageContext.title} Listings`}</h3>
            <SearchByButtons
                selected={listingPagesMetaDataByCountry.find((lp) => lp.value === props.pageContext.listingType)}
                searchByTypes={listingPagesMetaDataByCountry}
                onSearchByChanged={handleSearchChange}
            />

            <Router>
                <Routes>
                    <Route
                        path={`${props.path}`}
                        element={
                            <ListingPageSearchv2
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
            {searchResults?.length ? <Listings listingsData={searchResults} /> : <h3>No results found</h3>}
        </React.Fragment>
    )
}

export default ListingPageByCountryv2
