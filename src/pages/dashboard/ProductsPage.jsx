import useSupabase from "../../hooks/useSupabase";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

export default function ProductsPage() {
    const { useCollection } = useSupabase();
    const { data: products, loading, error } = useCollection("Market_Items");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors font-bold">
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-gray-500" size={40} />
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">
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
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="font-bold text-gray-800">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-600 font-medium">
                                                {product.price.toLocaleString()}{" "}
                                                MMK
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                {product.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
