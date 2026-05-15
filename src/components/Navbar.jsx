"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import Image from "next/image";


// 1. Declare your navigation items in an array
const NAV_LINKS = [
    { name: "Home", href: "/", active: true },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/bookings" },
    { name: "Admin", href: "/admin" },
    { name: "Add Destination", href: "/add-destination" },
];

const USER_LINKS = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

                {/* Mobile Toggle Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 hover:text-black focus:outline-none"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Left Side: Desktop Links (Mapped from Array) */}
                <div className="hidden md:flex items-center space-x-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${link.active
                                ? "text-[#00A3C4] border-b-2 border-[#00A3C4] pb-1 font-semibold"
                                : "text-gray-700 hover:text-black font-medium"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Center: Brand/Logo */}
                <div className="shrink-0">

                    <Image
                        alt="Wanderlast Logo"
                        src="/assets/Wanderlast.png"
                        width={150}
                        height={100}
                    />
                </div>

                {/* Right Side: Desktop User Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-black font-medium group">
                        <LuUserRound />
                        <span>Profile</span>
                    </button>
                    {USER_LINKS.map((link) => (
                        <Link key={link.name} href={link.href} className="text-gray-700 hover:text-black font-medium">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="md:hidden w-8"></div>
            </div>

            {/* Mobile Dropdown (Mapped from Arrays) */}
            <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4 space-y-4 pb-4`}>
                {[...NAV_LINKS, ...USER_LINKS].map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="block text-gray-700 font-medium hover:text-[#00A3C4]"
                        onClick={() => setIsOpen(false)} // Close menu after clicking
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;