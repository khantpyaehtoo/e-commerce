import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
            <form className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto no-scrollbar">
                <button
                    className="absolute top-4 right-6 text-2xl font-bold text-gray-500 cursor-pointer
                        hover:text-gray-800"
                    onClick={() => navigate("/")}
                >
                    ×
                </button>

                <div className="mb-4">
                    <h1 className="text-3xl font-black text-gray-900 uppercase">
                        Login
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        <span className="text-red-600">*</span> means required.
                    </p>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    {/* Email */}
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-email"
                        >
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight
                                focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="email"
                            placeholder="...@gmail.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder="xxxxxxxxx"
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center my-4 items-center">
                    <div className="w-full">
                        <button
                            type="submit"
                            className="shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full transition-colors cursor-pointer bg-gray-400"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
