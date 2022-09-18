import React, { useState } from 'react'
import SearchByButtons from '../ListingPageSearchv2/components/SearchByButtons'

const HomePageSearch = ({ onSelectedListingTypeChanged = null, defaultListingType, listingTypes, onSearchParams }) => {
    const [searchParamsState, setSearchParamsState] = useState({
        searchtext: '',
        selectedListingType: { ...defaultListingType },
    })

    const handleSubmit = (e) => {
        console.log('[HomePageSearch - handleSubmit]')
        e.preventDefault()
        onSearchParams({ ...searchParamsState })
    }

    const handleSearchTextChange = (e) => {
        console.log('[HomePageSearch - handleSearchChange]')
        const sq = e.target.value
        setSearchParamsState({ ...searchParamsState, searchtext: sq })
    }

    const handleSearchByChange = (updatedValue) => {
        console.log('[HomePageSearch - handleSearchByChange]')
        if (searchParamsState.selectedListingType.value === updatedValue.value) return
        if (onSelectedListingTypeChanged) onSelectedListingTypeChanged(searchParamsState.selectedListingType, updatedValue)
        setSearchParamsState({ ...searchParamsState, selectedListingType: { ...updatedValue } })
    }

    return (
        <form onSubmit={handleSubmit}>
            <SearchByButtons selected={searchParamsState.selectedListingType} shouldPreventDefault={true} searchByTypes={listingTypes} onSearchByChange={handleSearchByChange} />
            <input type="text" className="homePageSearchBar" onChange={handleSearchTextChange} placeholder="search..." />
        </form>
    )
}

export default HomePageSearch
