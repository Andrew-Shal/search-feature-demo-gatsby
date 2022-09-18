import React from 'react'
import HomePageSearch from '../components/Search/HomepageSearch/HomePageSearch'
import { listingPagesMetaData } from '../common/listingPagesMetaData'

const HomePage = () => {
    const handleSearchParams = (searchParams) => {
        console.log('[HomePage - handleSearchParams]')
        console.log('searchParams: ', searchParams)
        window.location.href = `${searchParams.selectedListingType.slug}?sq=${searchParams.searchtext}`
    }

    return (
        <React.Fragment>
            <h1>This is a search feature demo</h1>
            <HomePageSearch defaultListingType={listingPagesMetaData[0]} listingTypes={listingPagesMetaData} onSearchParams={handleSearchParams} />
        </React.Fragment>
    )
}

export default HomePage
