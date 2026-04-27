import { useState, useEffect } from "react";
import { X, Loader2, Save, Trash2 } from "lucide-react";
import useSupabase from "../../hooks/useSupabase";
import { cn } from "../../lib/utils";

export default function ProductFormModal({ isOpen, onClose, product = null }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        images: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrlInput, setImageUrlInput] = useState("");

    const { upsertItem, uploadImage } = useSupabase();

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                image: product.image || "",
                images: product.images || [],
            });
        } else {
            setFormData({ name: "", price: "", image: "", images: [] });
        }
        setImageUrlInput("");
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setIsLoading(true);
            try {
                const uploadPromises = files.map(file => uploadImage(file));
                const uploadedUrls = await Promise.all(uploadPromises);
                
                setFormData(prev => {
                    const newImages = [...prev.images, ...uploadedUrls];
                    return {
                        ...prev,
                        image: prev.image || uploadedUrls[0], // Set first one as main if none exists
                        images: newImages
                    };
                });
            } catch (err) {
                setError("Failed to upload one or more images");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const addImageUrl = () => {
        if (imageUrlInput) {
            setFormData(prev => ({
                ...prev,
                image: prev.image || imageUrlInput,
                images: [...prev.images, imageUrlInput]
            }));
            setImageUrlInput("");
        }
    };

    const removeImage = (indexToRemove) => {
        setFormData(prev => {
            const newImages = prev.images.filter((_, index) => index !== indexToRemove);
            let newMainImage = prev.image;
            if (prev.image === prev.images[indexToRemove]) {
                newMainImage = newImages[0] || "";
            }
            return {
                ...prev,
                image: newMainImage,
                images: newImages
            };
        });
    };

    const setAsMain = (img) => {
        setFormData(prev => ({ ...prev, image: img }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const productData = {
                name: formData.name,
                price: Number(formData.price),
                image: formData.image || (formData.images.length > 0 ? formData.images[0] : ""),
                images: formData.images,
            };

            if (product?.id) {
                productData.id = product.id;
            }

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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
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

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
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
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex justify-between">
                            Images
                            {isLoading && <Loader2 size={12} className="animate-spin text-black" />}
                        </label>
                        <div className="space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="w-full px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-xl transition-all outline-none font-bold text-gray-700 text-sm"
                            />
                            
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={imageUrlInput}
                                    onChange={(e) => setImageUrlInput(e.target.value)}
                                    placeholder="Paste Image URL..."
                                    className="flex-1 px-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border-2 rounded-xl transition-all outline-none font-bold text-gray-700 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="px-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews */}
                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-100">
                                    <img
                                        src={img}
                                        alt={`Preview ${index}`}
                                        className={cn(
                                            "w-full h-full object-cover transition-opacity",
                                            formData.image === img ? "opacity-100" : "opacity-60"
                                        )}
                                    />
                                    {formData.image === img && (
                                        <div className="absolute top-1 left-1 bg-purple-600 text-[8px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase">
                                            Main
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setAsMain(img)}
                                            className="p-1 bg-white rounded-full text-gray-800 hover:text-purple-600"
                                            title="Set as main"
                                        >
                                            <Save size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="p-1 bg-white rounded-full text-red-600 hover:text-red-700"
                                            title="Remove"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-4 sticky bottom-0 bg-white">
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
