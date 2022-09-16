import React from 'react'
import ListingCard from './ListingCard'
import './Listings.scss'

// generates listings based on what data is provided in props
const Listings = ({ listingsData }) => {
    return (
        <div className="listings">
            {listingsData.map((listing) => (
                <ListingCard key={listing.id} listingCardData={listing} />
            ))}
        </div>
    )
}

export default Listings
