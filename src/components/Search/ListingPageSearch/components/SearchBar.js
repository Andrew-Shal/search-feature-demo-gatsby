import React from 'react'
import './SearchBar.scss'

const SearchBar = ({ value, onSearchTextChange, placeholder, classes = [] }) => {
    const handleSearchTextChange = (e) => {
        onSearchTextChange(e.target.value)
    }
    return (
        <div className={classes.join(' ') + ' searchBarWrapper'}>
            <input className="searchbar" autoComplete="off" type="text" value={value} onChange={handleSearchTextChange} placeholder={`Search ${placeholder}`} />
            <input className="searchSubmit" type="submit" value="Ok" />
        </div>
    )
}
export default SearchBar
