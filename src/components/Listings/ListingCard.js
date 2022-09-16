import React from 'react'
import './ListingCard.scss'

// this will be the generic card for all listings
const ListingCard = ({ listingCardData }) => {
    return (
        <div className="listingCard">
            <div className="listingData">{listingCardData.id}</div>
            <div className="listingData"> {listingCardData.listingTitle}</div>
            <div className="listingData">{listingCardData.listingLocation}</div>
            <div className="listingData"> {listingCardData.slug}</div>
            <div className="listingData">{listingCardData.listingBuildingStatus || listingCardData.listingBuildStatus}</div>
            <div className="listingData"> {listingCardData.listingStyle}</div>
            <div className="listingData">{listingCardData.listingPriceRange}</div>
        </div>
    )
}

export default ListingCard
