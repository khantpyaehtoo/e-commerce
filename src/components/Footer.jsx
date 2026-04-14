import { Copy, Copyright } from "lucide-react";
import React from "react";

export default function Footer() {
    const curDate = new Date();
    return (
        <footer className="w-full flex-wrap bg-gray-600 p-2">
            <div className="flex justify-evenly items-center text-sm text-white">
                <p>Burmese_Python.co. </p>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
