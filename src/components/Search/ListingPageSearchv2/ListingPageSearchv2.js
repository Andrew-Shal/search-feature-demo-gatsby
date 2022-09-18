import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { updateURLSearchParam, searchFn } from '../../../utility/utils'
import FilterByDropDown from './components/FilterByDropDown'
import './ListingSearchBarv2.scss'

const ListingPageSearchv2 = ({ dataSource, filterGroups, onSearchResults, onSearchParams = null, searchPlaceholder }) => {
    // HANDLE QUERY PARAMS IF PASSED IN THE URL TO INITALIZE STATES
    const [queryParams, setQueryParams] = useSearchParams()
    const qp_searchKeyword = queryParams.get('sq')
    const qp_BuildingStyle = queryParams.get('style')
    const qp_BuildingStatus = queryParams.get('status')

    const [searchText, setSearchText] = useState(qp_searchKeyword || '')
    const validBuildingStatus = filterGroups.buildingStatusOptions.includes(qp_BuildingStatus)
    const validBuildingStyle = filterGroups.buildingStyleOptions.includes(qp_BuildingStyle)
    const [selectedBuildingStatus, setSelectedBuildingStatus] = useState(validBuildingStatus ? qp_BuildingStatus : '')
    const [selectedBuildingStyle, setSelectedBuildingStyle] = useState(validBuildingStyle ? qp_BuildingStyle : '')
    // ======= END OF STATES =======

    // ======= HELPER FUNCTIONS =========
    const getSearchParams = () => ({
        buildingStatus: selectedBuildingStatus, // string
        buildingStyle: selectedBuildingStyle, // string
        searchingFor: searchText, // string
    })
    // ======= EOND OF HELPER FUNCTIONS =========

    // ======= HANDLERS  =========
    const handleSubmit = (e) => {
        console.log('[handleSubmit]')
        e.preventDefault()
        const sp = getSearchParams()

        if (onSearchParams) onSearchParams(sp)
        onSearchResults(searchFn(dataSource, sp))
    }
    const handleSearchTextChange = (e) => {
        console.log('[handleSearchTextChange]')
        setSearchText(e.target.value)
        setQueryParams(updateURLSearchParam(['search'], [e.target.value], queryParams))
    }
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
        setQueryParams(updateURLSearchParam(['status', 'style'], [null, null], queryParams))
        setSelectedBuildingStatus('')
        setSelectedBuildingStyle('')
    }
    // ======= END OF HANDLERS  =========

    useEffect(() => {
        const sp = getSearchParams()
        setQueryParams(updateURLSearchParam(['style', 'status'], [sp.buildingStyle, sp.buildingStatus], queryParams))
        onSearchResults(searchFn(dataSource, getSearchParams()))
    }, [selectedBuildingStatus, selectedBuildingStyle])

    return (
        <form onSubmit={handleSubmit}>
            <div className="searchBarContainer">
                <input className="searchbar" type="text" value={searchText} onChange={handleSearchTextChange} placeholder={`Search ${searchPlaceholder}`} />
                <input className="searchSubmit" type="submit" value="Ok" />
                <div className="filterByGroup">
                    {filterGroups.buildingStatusOptions.length ? (
                        <FilterByDropDown selected={selectedBuildingStatus} options={filterGroups.buildingStatusOptions} placeholder={'Building Status'} onChange={handleBuildingStatusChange} />
                    ) : null}
                    {filterGroups.buildingStyleOptions.length ? (
                        <FilterByDropDown selected={selectedBuildingStyle} options={filterGroups.buildingStyleOptions} placeholder={'Building Style'} onChange={handleBuildingTypesChange} />
                    ) : null}
                    {selectedBuildingStatus || selectedBuildingStyle ? <input className="clearBtn" type="button" onClick={onClearFilters} value="clear" /> : null}
                </div>
            </div>
        </form>
    )
}

export default ListingPageSearchv2
