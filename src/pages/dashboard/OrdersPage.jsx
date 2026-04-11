import useSupabase from "../../hooks/useSupabase";
import { Package, Phone, MapPin, CreditCard, Hash, Loader2 } from "lucide-react";

export default function OrdersPage() {
    const { useCollection } = useSupabase();
    const { data: orders, loading, error } = useCollection("data");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
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
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Payment
                                    </th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800">
                                                    {order.name}
                                                </span>
                                                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                                    <Phone size={12} />
                                                    {order.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Package size={16} className="text-blue-500" />
                                                <span className="font-medium">{order.product_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <CreditCard size={14} className="text-green-500" />
                                                    <span>{order.payment}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                                                    <Hash size={12} />
                                                    <span>{order.receipt_digits}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-1 text-gray-600 max-w-xs">
                                                <MapPin size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{order.address}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No orders found.
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
