import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

export default function ShoppingItems() {
    const [sortBy, setSortBy] = useState("low-to-high");

    let {
        data: marketItems,
        loading,
        error,
    } = useFetch(`http://localhost:3001/marketItems`);

    const filterAndSort = () => {
        let filtered = [...marketItems];

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "low-to-high":
                    return a.price - b.price;
                case "high-to-low":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return filtered;
    };

    return (
        <>
            <nav>
                {/* Mobile View Nav */}
                <div className="md:hidden grid grid-cols-3 gap-2 mx-2 my-2 ">
                    <select
                        className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-payment"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>

                    {navItems.map((item, key) => (
                        <a
                            href={item.href}
                            key={key}
                            className="py-3 px-4 bg-blue-400 text-white hover:bg-amber-300 focus:bg-white rounded-md text-center"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Desktop View Nav */}
                <div className="hidden md:flex justify-between items-center px-10 py-5">
                    <div className="flex gap-4">
                        {navItems.map((item, key) => (
                            <a
                                href={item.href}
                                key={key}
                                className="text-gray-700 hover:text-blue-500 font-bold"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <select
                        className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="low-to-high">Sort: Low to High</option>
                        <option value="high-to-low">Sort: High to Low</option>
                    </select>
                </div>
            </nav>

            {loading && <p className="text-center mt-10">loading...</p>}
            {error && <p className="text-center text-red-500 mt-10">{error}</p>}

            {!!marketItems && (
                <div className="p-5 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {filterAndSort().map((item) => (
                            <Link to={`/marketItems/${item.id}`} key={item.id}>
                                <div className="grid grid-cols-2 gap-2 bg-gray-600 p-2 rounded-lg overflow-hidden h-[220px] md:hidden">
                                    <div className="w-full h-full">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover bg-amber-200 shadow-2xl rounded-l-md"
                                        />
                                    </div>
                                    <div className="px-6 py-4 flex flex-col h-full">
                                        <div className="flex-grow">
                                            <h2 className="py-1 font-bold text-2xl text-white">
                                                {item.name}
                                            </h2>
                                            <p className="py-2 text-gray-200">
                                                {item.price} <small>mmk</small>
                                            </p>
                                        </div>
                                        <div className="flex flex-row-reverse gap-2 justify-end items-center mb-2">
                                            <div className="bg-red-600 text-white px-6 py-2 w-full text-center rounded-lg">
                                                Info
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-col bg-gray-600 rounded-lg overflow-hidden h-[380px] hover:scale-105 transition-transform duration-300">
                                    <div className="w-full h-[220px]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover bg-amber-200"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h2 className="font-bold text-xl text-white truncate">
                                                {item.name}
                                            </h2>
                                            <p className="text-gray-200 mt-1">
                                                {item.price} <small>mmk</small>
                                            </p>
                                        </div>
                                        <div className="bg-red-600 text-white px-4 py-2 w-full text-center rounded-lg mt-3">
                                            View Details
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
