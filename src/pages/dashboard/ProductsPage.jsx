import { useState } from "react";
import useSupabase from "../../hooks/useSupabase";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import ProductFormModal from "./ProductFormModal";
import { supabase } from "../../../supabaseClient";

export default function ProductsPage() {
    const { useCollection } = useSupabase();
    const { data: products, loading, error } = useCollection("Market_Items");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                const { error: deleteError } = await supabase
                    .from("Market_Items")
                    .delete()
                    .eq("id", id);

                if (deleteError) throw deleteError;
                // Success - the useCollection hook will auto-refresh due to realtime listener
            } catch (err) {
                alert(`Error deleting product: ${err.message}`);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Products</h2>
                <button
                    onClick={handleAddClick}
                    className="bg-black text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all font-black uppercase tracking-widest text-xs lg:text-sm shadow-lg active:scale-95 whitespace-nowrap"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add Product</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-gray-500" size={40} />
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-bold">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 shadow-sm">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="font-bold text-gray-800 text-lg">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700 font-black">
                                                {product.price.toLocaleString()}{" "}
                                                <small className="text-gray-400">
                                                    MMK
                                                </small>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md uppercase">
                                                #
                                                {product.id
                                                    .toString()
                                                    .slice(0, 8)}
                                                ...
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(product)
                                                    }
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            product.id,
                                                            product.name,
                                                        )
                                                    }
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-20 text-center text-gray-400 italic font-medium"
                                        >
                                            No products found in the database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={editingProduct}
            />
        </div>
    );
}
