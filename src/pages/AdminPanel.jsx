import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Menu } from "lucide-react";

export default function AdminPanel() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const curDate = new Date();
    const location = useLocation();

    // Determine the page title based on the current path
    const getPageTitle = () => {
        const path = location.pathname.split("/").filter(Boolean).pop();
        const adminPath = import.meta.env.VITE_ADMIN_PATH;

        if (!path || path === adminPath || path === "dashboard") {
            return "Dashboard Overview";
        }

        // Capitalize first letter
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
            {/* Sidebar */}
            <SideBar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/*Main Content Header */}
                <header className="bg-white border-b border-gray-200 p-4 lg:p-6 flex justify-between items-center shadow-sm z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl lg:text-2xl font-black text-gray-800 tracking-tight truncate">
                            {getPageTitle()}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Today's Date
                            </span>
                            <span className="text-xs lg:text-sm font-bold text-gray-700">
                                {curDate.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
