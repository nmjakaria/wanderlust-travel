import { MapPin, ArrowUpLeft, Calendar } from '@gravity-ui/icons';
import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DestinationCard = ({ destination }) => {
    const { _id, imageUrl, destinationName, country, price, duration } = destination;

    return (
        <Card className="group cursor-pointer bg-transparent">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-xl h-[250px]">
                <Image
                    alt={destinationName}
                    src={imageUrl}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="py-4 space-y-2">
                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className='text-xl' />
                    <span className="text-lg font-medium">{country}</span>
                </div>

                {/* Title and Price Row */}
                <div className="flex justify-between items-baseline">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {destinationName}
                    </h2>
                    <div className="flex items-baseline">
                        <span className="text-2xl font-bold">${price}</span>
                        <span className="text-gray-500 text-sm ml-1">/Person</span>
                    </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 text-gray-500 pb-2">
                    <Calendar />
                    <span className="font-medium">{duration}</span>
                </div>

                {/* Action Button */}
                <div className="pt-2">

                    <Link href={`/destinations/${_id}`}>
                        <Button variant='goust' className={`flex items-center gap-2 text-[#00A3C4] font-bold text-lg border-b-2 border-[#00A3C4] pb-0.5 hover:opacity-80 transition-opacity uppercase tracking-wider rounded-none`}> Book Now
                            <ArrowUpLeft />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default DestinationCard;