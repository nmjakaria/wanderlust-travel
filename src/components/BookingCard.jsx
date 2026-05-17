"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Calendar, Card, DateField, DatePicker, FieldError, Input, Label } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowRightLong, FaCheck } from 'react-icons/fa6';

const BookingCard = ({ destination }) => {
    const {
        data: session,
        error,
    } = authClient.useSession()
    const user = session?.user

    const { _id, imageUrl, destinationName, country, price, duration } = destination;
    const [departureDate, setDepartureDate] = useState()

    const handleBooking = async () => {
        const bookingData = {

            userId: user?.id,
            userName: user?.name,
            userImage: user?.image,
            destinationId: _id,
            imageUrl,
            destinationName,
            country,
            price,
            departureDate: new Date(departureDate)
        }
        const { data: tokenData } = await authClient.token()

        const res = await fetch('http://localhost:5000/booking', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(bookingData)
        })
        const data = await res.json()
        if (res.ok) {
            toast.success(`Book ${destinationName} successfully`);
        }
    }

    return (
        <div>
            <Card className="sticky top-10 p-8 border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[32px] bg-white">
                <div className="space-y-1 mb-8">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Price starting from</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-cyan-600">${price}</span>
                        <span className="text-gray-400 font-medium">/ person</span>
                    </div>
                </div>

                <div className="space-y-5 mb-8">
                    {/* <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Select Date</label>
                        <Input
                            type="date"
                            defaultValue="2026-05-15"
                            className="rounded-2xl"
                            variant="flat"
                            size="lg"
                        />
                    </div> */}
                    <DatePicker
                        isRequired
                        className="w-64"
                        // isInvalid={isInvalid}
                        // minValue={currentDate}
                        name="date"
                        value={departureDate}
                        onChange={setDepartureDate}
                    >
                        <Label>Departure date</Label>
                        <DateField.Group fullWidth>
                            <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                            <DateField.Suffix>
                                <DatePicker.Trigger>
                                    <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                            </DateField.Suffix>
                        </DateField.Group>
                        <FieldError>Date must be today or in the future.</FieldError>
                        <DatePicker.Popover>
                            <Calendar aria-label="Event date">
                                <Calendar.Header>
                                    <Calendar.YearPickerTrigger>
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator />
                                    </Calendar.YearPickerTrigger>
                                    <Calendar.NavButton slot="previous" />
                                    <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                    <Calendar.GridHeader>
                                        {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                    <Calendar.YearPickerGridBody>
                                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>
                    <Button
                        onClick={handleBooking}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold h-16 text-lg rounded-2xl shadow-lg shadow-cyan-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        Book Now
                        <FaArrowRightLong />
                    </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    {["Free cancellation up to 7 days", "Travel insurance included", "24/7 customer support"].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                            <FaCheck className="text-green-500" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default BookingCard;