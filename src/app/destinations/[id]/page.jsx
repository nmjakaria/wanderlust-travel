import Image from 'next/image';
import React from 'react';
import { FaCalendarDays, FaCheck } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { PiMapPinLineBold } from 'react-icons/pi';
import EditDestination from '@/components/EditDestination';
import DeleteDestinationDialog from '@/components/DeleteDestinationDialog';
import Link from 'next/link';
import BookingCard from '@/components/BookingCard';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/destination/${id}`);
    const destination = await res.json();
    const { imageUrl, destinationName, country, price, duration, description } = destination;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Top Navigation & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <Link href={`/destinations`}>
                    <button className="flex items-center text-gray-500 hover:text-cyan-600 gap-2 transition-all group font-medium">
                        <GoArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Destinations

                    </button>
                </Link>
                <div className="flex gap-3">
                    {/* Edit Button */}
                    <EditDestination destination={destination} />

                    {/* Cancel Button */}
                    <DeleteDestinationDialog destination={destination} />
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative w-full h-75 md:h-125 rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Left Column: Information */}
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <div className="flex items-center gap-2 text-cyan-600 mb-3">
                            <PiMapPinLineBold size={22} />
                            <span className="font-bold tracking-wide uppercase text-sm">{country}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {destinationName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 text-gray-600">
                            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                                <span className="text-yellow-600 font-bold text-lg">★ 4.9</span>
                                <span className="text-sm text-yellow-700/60 font-medium">(234 reviews)</span>
                            </div>
                            <div className="flex items-center gap-3 font-medium border-l pl-8 border-gray-200">
                                <FaCalendarDays className="text-cyan-500" />
                                <span>{duration}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800">Overview</h3>
                        <p className="text-gray-500 leading-relaxed text-lg text-justify">
                            {description || "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[
                                "Luxury beachfront accommodation",
                                "Visit Uluwatu Temple at sunset",
                                "Traditional Balinese spa treatment",
                                "Private beach dinner experience",
                                "Sunrise trek to Mount Batur"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-cyan-50/30 transition-colors group">
                                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:text-cyan-600 transition-colors">
                                        <FaCheck className="text-cyan-500" size={14} />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Booking Card */}
                <div className="relative">
                    <BookingCard destination={destination} />
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;