import { NavLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;
const sideItem = [
    { name: "Dashboard", dir: adminPath },
    { name: "Order", dir: `${adminPath}/order` },
    { name: "Product", dir: `${adminPath}/product` },
];

export default function SideBar({ isOpen, onClose }) {
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out : ", error.message);
        }
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 w-64 bg-gray-200 border-r border-gray-300 flex flex-col justify-between z-50 transition-transform duration-300 transform lg:relative lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div>
                    {/* Sidebar Header */}
                    <div className="p-6 text-xl font-bold border-b border-gray-300 bg-gray-300 flex justify-between items-center">
                        Admin Panel
                        <button 
                            className="lg:hidden p-1 hover:bg-gray-400 rounded-md transition-colors"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {/* Menu Items */}
                    <nav className="p-4 space-y-2">
                        {sideItem.map((item, key) => (
                            <NavLink
                                to={item.dir}
                                key={key}
                                end={item.dir === adminPath}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
                                className={({ isActive }) =>
                                    cn(
                                        "block py-3 px-4 rounded-lg transition-all duration-200 font-bold border border-transparent",

                                        "text-gray-600 hover:bg-white hover:text-black hover:shadow-sm hover:border-gray-200",

                                        isActive &&
                                            "bg-black text-white shadow-md hover:bg-black hover:text-white",
                                    )
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-300">
                    <p className="font-bold text-gray-700 cursor-default">Admin</p>
                    <button
                        className="text-sm text-red-500 cursor-pointer hover:underline"
                        onClick={() => handleSignOut()}
                    >
                        Log out →
                    </button>
                </div>
            </div>
        </>
    );
}
