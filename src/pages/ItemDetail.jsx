import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import OrderFormModal from "./OrderFormModal";
import { Undo2 } from "lucide-react";
import useSupabase from "../hooks/useSupabase";

export default function ItemDetail() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(false);

    let { getDocument } = useSupabase();

    let { data: item, loading, error } = getDocument("Market_Items", id);

    return (
        <div className="h-screen relative">
            {loading && <p>loading...</p>}
            {error && <p>{error}</p>}

            {item && (
                <>
                    <div className="flex flex-row justify-between items-center bg-gray-200 p-3 shadow-sm shadow-gray-500 ">
                        <button
                            onClick={() => navigate("/")}
                            className="text-gray-600 "
                        >
                            <Undo2 />
                        </button>
                        <h2
                            className="font-bold text-2xl"
                            onClick={() => navigate("/")}
                        >
                            Burmese_Python
                        </h2>
                    </div>

                    <div
                        className={`${isFormOpen ? "hidden md:grid" : "grid"} grid-cols-1 md:grid-cols-2 gap-2 my-10`}
                    >
                        <div>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-[95%] h-[250px] bg-amber-400  px-5 mx-auto object-cover"
                            />
                        </div>
                        <div className="space-y-4 px-5 md:px-0">
                            <h1 className="font-bold text-3xl">{item.name}</h1>
                            <p className="text-red-400">
                                {item.price} <small>mmk</small>
                            </p>
                            <button
                                className="p-3 bg-amber-950 text-white rounded-full"
                                onClick={() => setIsFormOpen(true)}
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                    {isFormOpen && (
                        <div className="fixed inset-0 bg-white z-50 md:relative md:bg-transparent md:z-0 md:mt-10 ">
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-4 right-6 text-3xl font-bold text-gray-600 md:hidden"
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
