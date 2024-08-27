"use client";

import { useEffect, useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isUserMenuOpen, setisUserMenuOpen] = useState(false);
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        setPathname(currentPath);
    }, []);

    const handleToggle = () => {
        setisMenuOpen(!isMenuOpen);
    };

    const handleUserToggle = () => {
        setisUserMenuOpen(!isUserMenuOpen);
    }

    return (
        <div className="mx-2 md:mx-20 my-10">
            <nav className="bg-white bg-opacity-80 border-gray-200 dark:bg-gray-900 relative z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
                    <a href="/" className="relative flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden border border-white-800 shadow-xl rounded  p-[2px]">
                            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#EAB308_20deg,transparent_120deg)]"></div>
                            <span className="self-center z-20  text-white text-sm font-extrabold whitespace-nowrap dark:text-white uppercase rounded p-2 shadow-xl bg-yellow-500">
                                ScamChecker.ae</span>
                        </div>
                    </a>
                    {/* Navigation Menu for Large and Medium Screens */}
                    <div className="hidden md:flex items-center justify-between w-full md:w-auto">
                        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-medium p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a
                                    href="/"
                                    className={`block py-2 px-3 rounded ${pathname === "/" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        }`}
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className={`block py-2 px-3 rounded ${pathname === "/about" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        }`}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact-us"
                                    className={`block py-2 px-3 rounded ${pathname === "/contact-us" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        }`}
                                >
                                    Contact Us
                                </a>
                            </li>

                            <li><a href="/login" className="block ml-10 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Login</a></li>

                            <li><a href="/register" className="block py-2 px-3 text-white rounded bg-black">Register</a></li>

                        </ul>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-2">

                        {/* Menu Toggle Button */}
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isMenuOpen}
                            onClick={handleToggle}
                        >
                            <span className="sr-only">فتح القائمة الرئيسية</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    {/* Mobile Menu */}
                    <div
                        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setisMenuOpen(false)}
                    >
                        <div
                            className={`absolute top-0 right-0 w-64 h-screen bg-white dark:bg-gray-800 p-4 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                            id="navbar-user"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
                        >
                            {/* Close Icon */}
                            <div className="flex justify-end">
                                <button onClick={() => setisMenuOpen(false)} aria-label="Close Menu">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-900 dark:text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Menu Items */}
                            <ul className="space-y-4 mt-6 font-medium">
                                <li>
                                    <a
                                        href="/"
                                        className={`block py-2 px-3 rounded ${pathname === "/" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            }`}
                                        aria-current="page"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className={`block py-2 px-3 rounded ${pathname === "/about" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact-us"
                                        className={`block py-2 px-3 rounded ${pathname === "/contact-us" ? "text-white bg-gray-400" : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/login"
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/register"
                                        className="block py-2 px-3 text-white rounded bg-black"
                                    >
                                        Register
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>



                </div>
            </nav>
        </div>
    );
};

export default Navbar;
