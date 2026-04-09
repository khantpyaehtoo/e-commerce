import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";

export default function DetailNavSection() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between items-center p-3">
            <button
                onClick={() => navigate("/")}
                className="text-gray-600 cursor-pointer"
            >
                <Undo2 />
            </button>
            <h4
                className="font-bold text-md cursor-pointer md:text-xl"
                onClick={() => navigate("/")}
            >
                Burmese_Python
            </h4>
        </div>
    );
}
