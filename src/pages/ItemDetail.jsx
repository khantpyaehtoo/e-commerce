import { useParams } from "react-router-dom";
import { useState } from "react";
import OrderFormModal from "./OrderFormModal";

import useSupabase from "../hooks/useSupabase";
import DetailNavSection from "../components/DetailNavSection";
import { cn } from "../lib/utils";

export default function ItemDetail() {
    let { id } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);

    let { getDocument } = useSupabase();

    let { data: item, loading, error } = getDocument("Market_Items", id);

    return (
        <div className="h-screen relative">
            <DetailNavSection />

            {loading && <p>loading...</p>}
            {error && <p>{error}</p>}

            {item && (
                <>
                    <div
                        className={cn(
                            "grid-cols-1 md:grid-cols-2 gap-4 my-10 h-[400px] px-10",
                            isFormOpen ? "hidden md:grid" : "grid",
                        )}
                    >
                        <div className="border-amber-200 border border-2 rounded-md">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-[95%] h-[250px] mx-auto object-cover"
                            />
                        </div>

                        <div className="space-y-4 px-5 md:px-3 py-3">
                            <h1 className="font-bold text-3xl">{item.name}</h1>

                            <div className="">
                                <p>
                                    {item.price} <small>mmk</small>
                                </p>
                                <button
                                    className="p-2 my-3 text-white rounded-full bg-purple-500 hover:bg-purple-400"
                                    onClick={() => setIsFormOpen(true)}
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                    {isFormOpen && (
                        <div className="fixed inset-0 bg-white z-50 md:relative md:bg-transparent md:z-0 md:mt-10 ">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-6 text-3xl font-bold cursor-pointer text-gray-600 md:hidden"
                            >
                                ×
                            </button>

                            <OrderFormModal
                                productName={item.name}
                                onClose={() => setIsFormOpen(false)}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
