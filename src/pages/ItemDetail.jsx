import { useParams } from "react-router-dom";
import { useState } from "react";
import OrderFormModal from "./OrderFormModal";
import { motion, AnimatePresence } from "framer-motion";

import useSupabase from "../hooks/useSupabase";
import DetailNavSection from "../components/DetailNavSection";
import { cn } from "../lib/utils";
import SkeletonDetail from "../components/skeletons/SkeletonDetail";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { BookmarkPlus } from "lucide-react";

export default function ItemDetail() {
    let { id } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { addToCart } = useContext(CartContext);

    let { getDocument } = useSupabase();

    let { data: item, loading, error } = getDocument("Market_Items", id);

    return (
        <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
            <DetailNavSection />

            <div className="container mx-auto px-4 py-8">
                {loading && <SkeletonDetail />}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-red-600 mt-10 bg-red-50 p-4 rounded-lg border border-red-200"
                    >
                        {error}
                    </motion.div>
                )}

                {!loading && item && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto",
                            isFormOpen ? "hidden md:grid" : "grid",
                        )}
                    >
                        {/* Image Section */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl aspect-square md:aspect-auto md:h-[500px]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 via-transparent to-transparent"></div>
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold uppercase tracking-wider rounded-full border border-purple-200"
                                >
                                    Featured Item
                                </motion.span>
                                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
                                    {item.name}
                                </h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-3xl font-bold text-purple-600">
                                    {item.price.toLocaleString()}
                                    <span className="text-sm font-normal text-gray-500 ml-1 uppercase">
                                        mmk
                                    </span>
                                </span>
                                <div className="h-6 w-px bg-gray-200"></div>
                                <span className="text-green-600 text-sm font-medium">In Stock</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                Experience quality and style with {item.name}. Perfect for your
                                daily needs and designed to provide the best value for your money.
                            </p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="pt-4 flex flex-wrap gap-4"
                            >
                                <button
                                    onClick={() => setIsFormOpen(true)}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-95"
                                >
                                    Order Now
                                    <svg
                                        className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-purple-600 transition-all duration-200 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 active:scale-95"
                                >
                                    <BookmarkPlus size={20} />
                                    Add to Cart
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white/90 backdrop-blur-md z-50 md:flex md:items-center md:justify-center overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-4xl mx-auto p-4"
                            >
                                <div className="w-full flex justify-center mt-12 md:mt-0">
                                    <OrderFormModal
                                        productName={item.name}
                                        onClose={() => setIsFormOpen(false)}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
