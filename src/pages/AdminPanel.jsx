import { useState } from "react";

export default function AdminPanel() {
    let [section, setSection] = useState("");

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-gray-200 border-r border-gray-300 flex flex-col justify-between">
                <div>
                    {/* Sidebar Header */}
                    <div className="p-6 text-xl font-bold border-b border-gray-300 bg-gray-300">
                        Admin Panel
                    </div>
                    {/* Menu Items */}
                    <nav className="p-4 space-y-2">
                        <a
                            href="#"
                            className="block py-2.5 px-4 rounded bg-gray-300 font-bold"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="block py-2.5 px-4 rounded hover:bg-gray-300"
                        >
                            Orders
                        </a>
                        <a
                            href="#"
                            className="block py-2.5 px-4 rounded hover:bg-gray-300"
                        >
                            Products
                        </a>
                        <a
                            href="#"
                            className="block py-2.5 px-4 rounded hover:bg-gray-300"
                        >
                            Analytics
                        </a>
                    </nav>
                </div>
                {/* User Profile */}
                <div className="p-4 border-t border-gray-300">
                    <p className="font-bold text-gray-700">Eric</p>
                    <p className="text-sm text-gray-500">Log out</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/*Main Content Header */}
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Friday, April 3, 2026
                        </span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 space-y-6">
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
                </main>
            </div>
        </div>
    );
}
