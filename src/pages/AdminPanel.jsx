import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function AdminPanel() {
    const curDate = new Date();
    const location = useLocation();

    // Determine the page title based on the current path
    const getPageTitle = () => {
        const path = location.pathname.split("/").pop();
        const adminPath = import.meta.env.VITE_ADMIN_PATH;

        if (path === adminPath || path === "dashboard" || path === "") {
            return "Dashboard Overview";
        }

        // Capitalize first letter
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden ">
                {/*Main Content Header */}
                <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center shadow-sm z-10">
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">
                        {getPageTitle()}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Today's Date
                            </span>
                            <span className="text-sm font-bold text-gray-700">
                                {curDate.toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
