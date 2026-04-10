import { NavLink } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { cn } from "../lib/utils";

const adminPath = `/${import.meta.env.VITE_ADMIN_PATH}`;
const sideItem = [
    { name: "Dashboard", dir: adminPath },
    { name: "Order", dir: `${adminPath}/order` },
    { name: "Product", dir: `${adminPath}/product` },
];

export default function SideBar() {
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out : ", error.message);
        }
    };

    return (
        <div className="w-64 bg-gray-200 border-r border-gray-300 flex flex-col justify-between">
            <div>
                {/* Sidebar Header */}
                <div className="p-6 text-xl font-bold border-b border-gray-300 bg-gray-300">
                    Admin Panel
                </div>
                {/* Menu Items */}
                <nav className="p-4 space-y-2">
                    {sideItem.map((item, key) => (
                        <NavLink
                            to={item.dir}
                            key={key}
                            end={item.dir === adminPath}
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
                    className="text-sm text-red-500 cursor-pointer"
                    onClick={() => handleSignOut()}
                >
                    Log out →
                </button>
            </div>
        </div>
    );
}
