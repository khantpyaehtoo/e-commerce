import { useState } from "react";
import { Link } from "react-router-dom";

import useSupabase from "../hooks/useSupabase";
import MenuSection from "./MenuSection";
import Footer from "./Footer";

export default function ShoppingItems() {
    const [sortBy, setSortBy] = useState("low-to-high");

    const { useCollection } = useSupabase();
    const { data: items, error, loading } = useCollection("Market_Items");

    const filterAndSort = () => {
        let filtered = [...items];

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
        <div className="bg-gray-700 relative min-h-screen w-full shadow-2xl ">
            <MenuSection setSortBy={setSortBy} sortBy={sortBy} />

            {loading && <p className="text-center mt-10">loading...</p>}
            {error && <p className="text-center text-red-500 mt-10">{error}</p>}

            {items.length > 0 && (
                <div className="p-5 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {filterAndSort().map((item) => (
                            <Link to={`/marketItems/${item.id}`} key={item.id}>
                                <div className="grid grid-cols-2 gap-2 bg-gray-600 border-1 rounded-lg overflow-hidden h-[220px] md:hidden">
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
            <Footer />
        </div>
    );
}
