import React from 'react'
import './ListingCard.scss'

const ListElem = ({ name, value }) => {
    const styles = { color: 'green', fontWeight: 'bold', display: 'block' }
    return (
        <React.Fragment>
            <span style={styles}>{name}</span>
            {value}
        </React.Fragment>
    )
}
// this will be the generic card for all listings
const ListingCard = ({ listingCardData }) => {
    return (
        <div className="listingCard">
            <div className="listingData">
                <ListElem name="id" value={listingCardData.id} />
            </div>
            <div className="listingData">
                <ListElem name="listingTitle" value={listingCardData.listingTitle} />
            </div>
            <div className="listingData">
                <ListElem name="listingLocation" value={listingCardData.listingLocation} />
            </div>
            <div className="listingData">
                <ListElem name="listingLocation" value={listingCardData.listingLocation} />
            </div>
            <div className="listingData">
                <ListElem name="listingBuildStatus" value={listingCardData.listingBuildingStatus || listingCardData.listingBuildStatus} />
            </div>
            <div className="listingData">
                <ListElem name="listingStyle" value={listingCardData.listingStyle} />{' '}
            </div>
            <div className="listingData">
                <ListElem name="listingPriceRange" value={listingCardData.listingPriceRange} />
            </div>
            <div className="listingData">
                <ListElem name="itemCountry.countryName" value={listingCardData.itemCountry.countryName} />
            </div>
            <div className="listingData">
                <ListElem name="itemCountry.countrySlug" value={listingCardData.itemCountry.countrySlug} />
            </div>
        </div>
    )
}

export default ListingCard
