import React from "react";

export default function DashboardHome() {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-200 h-32 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-600">
                    Total Orders (75)
                </div>
                <div className="bg-gray-200 h-32 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-600">
                    Total Revenue (1,500,000 MMK)
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gray-200 h-[500px] rounded-lg border border-gray-300 p-6">
                    <h3 className="font-bold text-gray-700 mb-4">
                        Recent Orders List
                    </h3>
                    <div className="text-gray-500 text-center mt-20">
                        Orders
                    </div>
                </div>

                <div className="bg-gray-200 h-[500px] rounded-lg border border-gray-300 p-6">
                    <h3 className="font-bold text-gray-700 mb-4">
                        Top Products
                    </h3>
                    <div className="text-gray-500 text-center mt-20">
                        Product
                    </div>
                </div>
            </div>
        </>
    );
}
