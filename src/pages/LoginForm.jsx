import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsPending(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsPending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto no-scrollbar"
            >
                <button
                    type="button"
                    className="absolute top-4 right-6 text-2xl font-bold text-gray-500 cursor-pointer hover:text-gray-800"
                    onClick={() => navigate("/")}
                >
                    ×
                </button>

                <div className="mb-4">
                    <h1 className="text-3xl font-black text-gray-900 uppercase">
                        Login
                    </h1>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Email
                        </label>
                        <input
                            required
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="...@gmail.com"
                        />
                    </div>

                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Password
                        </label>
                        <input
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="xxxxxxxxx"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <button
                        disabled={isPending}
                        type="submit"
                        className={`shadow text-white font-bold py-2 px-4 rounded w-full transition-colors cursor-pointer ${isPending ? "bg-gray-400" : "bg-black"}`}
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
        </div>
    );
}
