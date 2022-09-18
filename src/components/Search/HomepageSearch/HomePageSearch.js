import React, { useState } from 'react'
import SearchByButtons from '../ListingPageSearch/components/SearchByButtons'
import SearchBar from '../ListingPageSearch/components/SearchBar'

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

    const handleSearchTextChange = (newValue) => {
        console.log('[HomePageSearch - handleSearchChange]')
        const sq = newValue
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
            <SearchByButtons
                classes={['homepage-variant']}
                selected={searchParamsState.selectedListingType}
                shouldPreventDefault={true}
                searchByTypes={listingTypes}
                onSearchByChange={handleSearchByChange}
            />
            <div className="searchBarContainer">
                <SearchBar value={searchParamsState.searchText} onSearchTextChange={handleSearchTextChange} classes={['homePageSearchBar']} placeholder="Begin Searching..." />
            </div>
        </form>
    )
}

export default HomePageSearch
