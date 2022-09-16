import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchByButtons from './components/SearchByButtons'
import FilterByDropDown from './components/FilterByDropDown'
import './ListingSearchBar.scss'

const ListingSearchBar = ({ onSelectedListingTypeChanged, defaultListingType, listingTypes, filterByEnums, dataSource, onSearchResults }) => {
    useEffect(() => {
        console.log('data source changed: ', dataSource)
        const sp = buildSearchParams()
        setQueryParams(updateURLSearchParam(['type'], [sp.listingType.value]))
        onSearchResults(doSearch(sp))
    }, [dataSource])

    // ======= CONSTANTS ACTING AS DATASOURCE FOR DROPDOWNS =======
    const REAL_ESTATE_FILTERS = filterByEnums.RealEstateFilterByEnums
    const HOTEL_FILTERS = filterByEnums.HotelFilterByEnums
    const LAND_FILTERS = filterByEnums.LandFilterByEnums

    const FILTERS = {
        [REAL_ESTATE_FILTERS.id]: { data: REAL_ESTATE_FILTERS.data },
        [HOTEL_FILTERS.id]: { data: HOTEL_FILTERS.data },
        [LAND_FILTERS.id]: { data: LAND_FILTERS.data },
    }
    // ======= END OF CONSTANTS ACTING AS DATASOURCE FOR DROPDOWNS =======

    // HANDLE QUERY PARAMS IF PASSED IN THE URL TO INITALIZE STATES
    const [queryParams, setQueryParams] = useSearchParams()
    const qp_searchKeyword = queryParams.get('search')
    const qp_BuildingStyle = queryParams.get('style')
    const qp_BuildingStatus = queryParams.get('status')
    const qp_ListingType = queryParams.get('type')

    // ======= STATES =======
    const [searchText, setSearchText] = useState(qp_searchKeyword || '')
    const possibleListingType = listingTypes.find((lt) => lt.value === qp_ListingType)
    const [selectedListingType, setSelectedListingType] = useState(possibleListingType || defaultListingType || listingTypes[0])
    const [filterGroupByListingType, setFilterGroupByListingType] = useState(FILTERS[selectedListingType.value])
    const validBuildingStatus = filterGroupByListingType?.data?.buildingStatus.includes(qp_BuildingStatus)
    const validBuildingType = filterGroupByListingType?.data?.buildingStyle.includes(qp_BuildingStyle)
    const [selectedBuildingStatus, setSelectedBuildingStatus] = useState(validBuildingStatus ? qp_BuildingStatus : '')
    const [selectedBuildingStyle, setSelectedBuildingStyle] = useState(validBuildingType ? qp_BuildingStyle : '')
    // ======= END OF STATES =======

    const init = () => {
        // update datasource based on starting states.
        onSelectedListingTypeChanged(null, selectedListingType)
    }

    // only on initial mount this runs
    useEffect(() => {
        init()
    }, [])

    // ======= UTILITY/HELPER FUNCTIONS =========
    const updateURLSearchParam = (keys, values) => {
        console.log('[updateURLSearchParam]', keys, values)
        let updatedSearchParams = new URLSearchParams(queryParams.toString())

        for (let i = 0; i < keys.length; i++) {
            if (values[i] === '' || values[i] === null) {
                updatedSearchParams.delete(keys[i])
            } else {
                updatedSearchParams.set(keys[i], values[i])
            }
        }
        return updatedSearchParams.toString()
    }

    const buildSearchParams = () => ({
        buildingStatus: selectedBuildingStatus,
        buildingStyle: selectedBuildingStyle,
        listingType: selectedListingType,
        searchingFor: searchText,
    })

    // MAIN SEARCH LOGIC
    const doSearch = (searchParams) => {
        console.log('searching...')
        console.log('searchParams: ', searchParams)

        // js code to do filtering based on search params
        // const hasCountryFilter = country ? true : false
        const hasBuildingTypeFilter = searchParams.buildingStyle ? true : false
        const hasBuildingStatusFilter = searchParams.buildingStatus ? true : false

        // const searchingBy = searchParams.listingType.value
        const text = searchParams.searchingFor

        const filteredData = dataSource.reduce((filteredArr, currentListing) => {
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
    // ======= END OF UTILITY/HELPER FUNCTIONS =========

    // ========== SEARCH BAR HANDLERS ==========
    const handleSearchByChange = (updatedValue) => {
        console.log('[handleSearchByChange]: ', updatedValue.value)
        if (selectedListingType.value === updatedValue.value) return
        setFilterGroupByListingType(FILTERS[updatedValue.value])

        setSelectedBuildingStatus('')
        setSelectedBuildingStyle('')

        onSelectedListingTypeChanged(selectedListingType, updatedValue)
        setSelectedListingType(updatedValue)
    }

    const handleSearchTextChange = (e) => {
        console.log('[handleSearchTextChange]')
        setSearchText(e.target.value)
        setQueryParams(updateURLSearchParam(['search'], [e.target.value]))
    }

    // TODO: figure out why this doesnt work.
    const handleSubmit = (e) => {
        console.log('[handleSubmit]')
        e.preventDefault()
        onSearchResults(doSearch(buildSearchParams()))
    }
    // ========== END OF SEARCH BAR HANDLERS ==========

    useEffect(() => {
        const sp = buildSearchParams()
        setQueryParams(updateURLSearchParam(['style', 'status'], [sp.buildingStyle, sp.buildingStatus]))
        onSearchResults(doSearch(buildSearchParams()))
    }, [selectedBuildingStatus, selectedBuildingStyle])

    // ========== DROPDOWN FILTER HANDLERS ==========
    const handleBuildingStatusChange = (selectedValue) => {
        console.log('[handleBuildingStatusChange]')
        setSelectedBuildingStatus(selectedValue)
    }
    const handleBuildingTypesChange = (selectedValue) => {
        console.log('handleBuildingTypesChange')
        setSelectedBuildingStyle(selectedValue)
    }
    const onClearFilters = (e) => {
        console.log('[onClearFilters]')
        e.preventDefault()
        setQueryParams(updateURLSearchParam(['status', 'style'], [null, null]))
        setSelectedBuildingStatus('')
        setSelectedBuildingStyle('')
    }
    // ========== END OF DROPDOWN FILTER HANDLERS ==========

    return (
        <form onSubmit={handleSubmit}>
            <div className="searchBarContainer">
                <SearchByButtons selected={selectedListingType} searchByTypes={listingTypes} onSearchByChange={handleSearchByChange} />
                <input className="searchbar" type="text" value={searchText} onChange={handleSearchTextChange} placeholder={`Search ${selectedListingType.label}`} />
                <input className="searchSubmit" type="submit" value="Ok" />
                <div className="filterByGroup">
                    {filterGroupByListingType.data?.buildingStatus.length ? (
                        <FilterByDropDown
                            selected={selectedBuildingStatus}
                            options={filterGroupByListingType.data.buildingStatus}
                            placeholder={'Building Status'}
                            onChange={handleBuildingStatusChange}
                        />
                    ) : null}
                    {filterGroupByListingType.data?.buildingStyle.length ? (
                        <FilterByDropDown selected={selectedBuildingStyle} options={filterGroupByListingType.data.buildingStyle} placeholder={'Building Style'} onChange={handleBuildingTypesChange} />
                    ) : null}
                    {selectedBuildingStatus || selectedBuildingStyle ? (
                        <a className="clearBtn" href="#" onClick={onClearFilters}>
                            clear
                        </a>
                    ) : null}
                </div>
            </div>
        </form>
    )
}

export default ListingSearchBar
