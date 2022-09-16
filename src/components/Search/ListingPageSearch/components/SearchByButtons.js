import React from 'react'
import './SearchByButtons.scss'

const SearchByButtons = ({ selected, searchByTypes, onSearchByChange }) => {
    const handleSearchByBtnClick = (searchByType, event) => {
        event.preventDefault()
        onSearchByChange(searchByType)
    }

    return (
        <div className="searchByButtons">
            {searchByTypes.map((searchByType) => (
                <input
                    type="button"
                    key={searchByType.id}
                    className={`searchByButton ${selected.id === searchByType.id ? 'active' : ''}`}
                    onClick={handleSearchByBtnClick.bind(this, searchByType)}
                    value={searchByType.label}
                />
            ))}
        </div>
    )
}

export default SearchByButtons
