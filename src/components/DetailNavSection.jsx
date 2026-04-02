import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";

export default function DetailNavSection() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between items-center bg-gray-200 p-3 shadow-sm shadow-gray-500 ">
            <button
                onClick={() => navigate("/")}
                className="text-gray-600 cursor-pointer"
            >
                <Undo2 />
            </button>
            <h4
                className="font-bold text-2xl cursor-pointer"
                onClick={() => navigate("/")}
            >
                Burmese_Python
            </h4>
        </div>
    );
}
