import { useState, useEffect } from "react";
import { X, Loader2, Save } from "lucide-react";
import useSupabase from "../../hooks/useSupabase";

export default function ProductFormModal({ isOpen, onClose, product = null }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { upsertItem } = useSupabase();

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                image: product.image || "",
            });
        } else {
            setFormData({ name: "", price: "", image: "" });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const productData = {
            name: formData.name,
            price: Number(formData.price),
            image: formData.image,
        };

        if (product?.id) productData.id = product.id;

        try {
            await upsertItem("Market_Items", productData);

            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                        {product ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg font-bold">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Product Name
                        </label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="e.g. Rare Cactus"
                            className="w-full px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-xl transition-all outline-none font-bold text-gray-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Price (MMK)
                        </label>
                        <input
                            required
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value,
                                })
                            }
                            placeholder="5000"
                            className="w-full px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-xl transition-all outline-none font-bold text-gray-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            Image URL
                        </label>
                        <input
                            required
                            type="url"
                            value={formData.image}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    image: e.target.value,
                                })
                            }
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-xl transition-all outline-none font-bold text-gray-700"
                        />
                    </div>

                    {formData.image && (
                        <div className="mt-2 rounded-xl overflow-hidden border-2 border-gray-100 aspect-video bg-gray-50">
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) =>
                                    (e.target.src =
                                        "https://placehold.co/600x400?text=Invalid+Image+URL")
                                }
                            />
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Save size={20} />
                                    {product
                                        ? "Update Product"
                                        : "Save Product"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
