import React from 'react'
import './SearchByButtons.scss'

const SearchByButtons = ({ selected, searchByTypes, onSearchByChange = null, shouldPreventDefault = false, classes = [] }) => {
    const handleSearchByBtnClick = (searchByType, event) => {
        if (shouldPreventDefault) event.preventDefault()
        if (onSearchByChange) onSearchByChange(searchByType)
    }

    return (
        <div className={`searchByButtons${classes.length ? ' ' + classes.join(' ') : ''}`}>
            {searchByTypes.map((searchByType) => (
                <a
                    href={`${searchByType.slug}`}
                    key={searchByType.id}
                    className={`searchByButton ${selected.id === searchByType.id ? 'active' : ''}`}
                    onClick={handleSearchByBtnClick.bind(this, searchByType)}
                >
                    {searchByType.label}
                </a>
            ))}
        </div>
    )
}

export default SearchByButtons
