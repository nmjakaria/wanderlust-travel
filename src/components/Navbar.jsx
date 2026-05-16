"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LuUserRound } from "react-icons/lu";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, toast } from "@heroui/react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Admin", href: "/admin" },
    { name: "Add Destination", href: "/add-destination" },
];

const USER_LINKS = [
    { name: "Login", href: "/login" },
    { name: "Sign Up", href: "/signup" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef(null);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    // মেনুর বাইরে ক্লিক করলে মেনু অটোমেটিক বন্ধ হওয়ার জন্য (UX Improvement)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Logout successfully');
                    window.location.href = '/';
                },
            },
        });
    };

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-4 relative z-50">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

                {/* ----------------- LEFT SIDE: Mobile Menu Button & Desktop Links ----------------- */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            setIsUserMenuOpen(false); // অন্য মেনু বন্ধ করা হলো
                        }}
                        type="button"
                        className="md:hidden text-gray-700 hover:text-black focus:outline-none relative z-50 p-1"
                        aria-label="Toggle Menu"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`${isActive
                                        ? "text-[#00A3C4] border-b-2 border-[#00A3C4] pb-1 font-semibold"
                                        : "text-gray-700 hover:text-black font-medium"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ----------------- CENTER: Brand/Logo ----------------- */}
                <div className="shrink-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                    <Link href="/">
                        <Image
                            alt="Wanderlust Logo"
                            src="/assets/Wanderlast.png"
                            width={140}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* ----------------- RIGHT SIDE: Desktop Actions & Mobile Avatar ----------------- */}
                <div className="flex items-center space-x-4 relative z-50">
                    {/* Desktop View */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-black font-medium">
                            <LuUserRound />
                            <span>Profile</span>
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <Avatar.Image alt="Avater" src={user?.image} />
                                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                                <Button color="danger" variant="flat" className="rounded-xl font-semibold" onClick={handleSignOut}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {USER_LINKS.map((link) => (
                                    <Link key={link.name} href={link.href} className="text-gray-700 hover:text-black font-medium">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile View User Menu (পিওর রিয়্যাক্ট ও টেলউইন্ড ড্রপডাউন) */}
                    <div className="md:hidden flex items-center relative" ref={menuRef}>
                        {user ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsUserMenuOpen(!isUserMenuOpen);
                                        setIsOpen(false); // মেইন মেনু বন্ধ করা হলো
                                    }}
                                    className="outline-none focus:outline-none block"
                                >
                                    <Avatar>
                                        <Avatar.Image alt="Avater" src={user?.image} />
                                        <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                </button>

                                {/* কাস্টম অবলুট ড্রপডাউন মেনু */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-12 w-40 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsUserMenuOpen(false);
                                                handleSignOut();
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold border-t border-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href="/login" className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ----------------- Mobile Main Hamburger Drawer ----------------- */}
            {isOpen && (
                <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-lg z-40 animate-fade-in">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-gray-700 font-medium py-1 hover:text-[#00A3C4] ${pathname === link.href ? "text-[#00A3C4] font-bold" : ""}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {!user && (
                        <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                            {USER_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-600 font-medium hover:text-[#00A3C4]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;