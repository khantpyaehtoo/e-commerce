import useSupabase from "../../hooks/useSupabase";
import { ShoppingBag, TrendingUp, Package, Users, Loader2 } from "lucide-react";

export default function DashboardHome() {
    const { useCollection } = useSupabase();
    const { data: orders, loading: ordersLoading } = useCollection("data");
    const { data: products, loading: productsLoading } = useCollection("Market_Items");

    const isLoading = ordersLoading || productsLoading;

    // Calculate basic stats
    const totalOrders = orders.length;
    const totalProducts = products.length;
    
    // Attempt to calculate approximate revenue if possible
    // Note: This is simplified as it doesn't account for historical price changes
    const totalRevenue = orders.reduce((acc, order) => {
        const product = products.find(p => p.name === order.product_name);
        return acc + (product ? product.price : 0);
    }, 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-gray-500" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">Revenue (Est.)</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalRevenue.toLocaleString()} MMK</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">Total Products</p>
                        <h3 className="text-2xl font-bold text-gray-800">{totalProducts}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase">Active Users</p>
                        <h3 className="text-2xl font-bold text-gray-800">1</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-700">Recent Orders List</h3>
                        <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                <tr>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Product</th>
                                    <th className="px-6 py-3">Payment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {orders.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-800">{order.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.product_name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-bold">
                                                {order.payment}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-400">No orders yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-700">Top Products</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="text-sm font-bold text-gray-800 truncate">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.price.toLocaleString()} MMK</p>
                                </div>
                            </div>
                        ))}
                        {products.length === 0 && (
                            <div className="text-center py-10 text-gray-400">No products found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
