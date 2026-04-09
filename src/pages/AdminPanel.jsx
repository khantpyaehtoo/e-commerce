import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function AdminPanel() {
    const curDate = new Date();

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden ">
                {/*Main Content Header */}
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        Dashboard Overview
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {curDate.getFullYear()} / {curDate.getMonth() + 1} /{" "}
                            {curDate.getDate()}
                        </span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 space-y-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
