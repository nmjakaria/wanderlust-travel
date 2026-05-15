import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async() => {
    const res = await fetch('http://localhost:5000/destination')
    const destinations = await res.json()
    
    return (
        <div className='container mx-auto p-8 space-y-3'>
            <div>
                <h2 className='text-5xl'>Explore All Destinations</h2>
                <p className='text-lg text-gray-700'>Find your perfect travel experience from our curated collection</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {
                    destinations.map(destination=>
                        <DestinationCard key={destination._id} destination={destination} />
                    )
                }
            </div>
        </div>
    );
};

export default DestinationPage;