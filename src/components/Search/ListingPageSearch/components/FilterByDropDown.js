import React from 'react'
import './FilterByDropDown.scss'

const FilterByDropDown = ({ selected, options, placeholder, onChange }) => {
    const handleOnChange = (e) => {
        console.log('[FilterByDropDown - handleOnChange]')

        const selectedOption = options.find((option) => option === e.target.value)
        onChange(selectedOption)
    }

    const placeHolderElement = placeholder ? (
        <option disabled value="">
            {placeholder}
        </option>
    ) : null

    return (
        <div className="filterByDropDown">
            <select value={selected} onChange={handleOnChange}>
                {placeHolderElement}
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default FilterByDropDown
