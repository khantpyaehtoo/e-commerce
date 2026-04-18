import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import useSupabase from "../hooks/useSupabase";
import MenuSection from "./MenuSection";
import Footer from "./Footer";
import SkeletonCard from "./skeletons/SkeletonCard";
import { BookmarkPlus, Info, ShoppingCart } from "lucide-react";
import { CartContext } from "../contexts/CartContext";

export default function ShoppingItems() {
    const [sortBy, setSortBy] = useState("low-to-high");
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

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

    const handleAddToCart = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(item);
    };

    return (
        <div className="bg-gray-50 relative min-h-screen w-full shadow-2xl ">
            <MenuSection setSortBy={setSortBy} sortBy={sortBy} />

            {loading && (
                <div className="p-5 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                </div>
            )}
            {error && <p className="text-center text-red-500 mt-10">{error}</p>}

            {!loading && items.length > 0 && (
                <div className="p-5 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {filterAndSort().map((item) => (
                            <Link to={`/marketItems/${item.id}`} key={item.id}>
                                <div className="grid grid-cols-2 gap-2 bg-white border border-gray-100 rounded-lg overflow-hidden h-[220px] md:hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full h-full">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover bg-amber-50 shadow-sm rounded-l-md"
                                        />
                                    </div>
                                    <div className="px-6 py-4 flex flex-col h-full">
                                        <div className="flex-grow">
                                            <h2 className="py-1 font-bold text-xl text-gray-800">
                                                {item.name}
                                            </h2>
                                            <p className="py-2 text-purple-600 font-semibold">
                                                {item.price.toLocaleString()}{" "}
                                                <small>mmk</small>
                                            </p>
                                        </div>
                                        <div className="flex flex-row-reverse gap-2 justify-end items-center mb-2">
                                            <div className="bg-purple-600 text-white px-6 py-2 w-full text-center rounded-lg hover:bg-purple-700 transition-colors">
                                                Info
                                            </div>
                                        </div>
                                        <div className="flex flex-row-reverse gap-2 justify-end items-center mb-2">
                                            <button 
                                                onClick={(e) => handleAddToCart(e, item)}
                                                className="bg-purple-600 text-white px-6 py-2 w-full text-center rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                Add Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden h-[380px] hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <div className="w-full h-[220px] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover bg-amber-50"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col justify-between flex-grow">
                                        <div>
                                            <h2 className="font-bold text-xl text-gray-800 truncate">
                                                {item.name}
                                            </h2>
                                            <p className="text-purple-600 font-semibold mt-1">
                                                {item.price.toLocaleString()}{" "}
                                                <small>mmk</small>
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex justify-center items-center gap-3 bg-purple-600 text-white px-4 py-2 w-full text-center rounded-lg mt-3 hover:bg-purple-700 transition-colors">
                                                <Info size={20} /> View Details
                                            </div>
                                            <button 
                                                onClick={(e) => handleAddToCart(e, item)}
                                                className="flex justify-center items-center gap-3 border-1 border-purple-700 bg-white text-black px-4 py-2 w-full text-center rounded-lg mt-3 hover:bg-black hover:text-white transition-colors "
                                            >
                                                <BookmarkPlus size={20} /> Add
                                                Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {!loading && items.length === 0 && !error && (
                <p className="text-center mt-10 text-gray-600">
                    No items found.
                </p>
            )}
            <Footer />
        </div>
    );
}
