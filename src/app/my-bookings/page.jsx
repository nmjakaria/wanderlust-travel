import CancelBokingAlert from '@/components/CancelBokingAlert';
import { auth } from '@/lib/auth';
import { Button, Card, Chip, } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa6';
import { PiMapPinLineBold } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/booking/${user?.id}`)
    const bookings = await res.json();

    return (
        <div>
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-500 text-lg">Manage and view your upcoming travel plans</p>
                </div>

                {/* Bookings List */}
                <div className="space-y-6">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <Card
                                key={booking._id}
                                className="p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Section */}
                                    <div className="relative w-full md:w-72 h-48 rounded-lg overflow-hidden shrink-0">
                                        <Image
                                            src={booking.imageUrl || "https://via.placeholder.com/300"}
                                            alt={booking.destinationName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details Section */}
                                    <div className="grow flex flex-col justify-between py-1">
                                        <div className="space-y-3">
                                            {/* Status Chip */}
                                            {/* <Chip
                                                variant="soft"
                                                color={booking.status === 'Confirmed' ? "success" : "warning"}
                                                size="sm"
                                                className="capitalize font-medium px-2"
                                                startContent={
                                                    <div className={`w-2 h-2 rounded-full mx-1 ${booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                }
                                            >
                                                {booking.status || 'Confirmed'}
                                            </Chip> */}

                                            <h2 className="text-2xl font-bold text-gray-800">
                                                {booking.destinationName}
                                            </h2>

                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                    <FaRegCalendarAlt className="text-gray-400" />
                                                    <span>Departure: {booking.departureDate || 'May 15, 2026'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                                    <PiMapPinLineBold className="text-gray-400 text-lg" />
                                                    <span>Booking ID: {booking._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-3xl font-bold text-[#00A3C4] mt-4">
                                            ${booking.price}
                                        </div>
                                    </div>

                                    {/* Actions Section */}
                                    <div className="flex md:flex-col justify-end gap-3 shrink-0 self-end md:self-center">
                                        <CancelBokingAlert bookingId = {booking._id} />

                                        <Button
                                            className="bg-[#00A3C4] text-white font-semibold rounded-lg min-w-25"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FaRegEye />
                                                <span>View</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">No bookings found. Start exploring!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingPage;