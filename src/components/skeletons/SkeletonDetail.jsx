export default function SkeletonDetail() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto my-10 animate-pulse">
            <div className="space-y-4">
                <div className="border-gray-100 border-2 rounded-2xl bg-gray-50 flex items-center justify-center aspect-square shadow-sm">
                    <div className="w-[90%] h-[80%] bg-gray-200 rounded-xl"></div>
                </div>
                <div className="flex gap-3">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            <div className="space-y-6 py-4">
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded-full w-32"></div>
                    <div className="h-12 md:h-16 bg-gray-200 rounded-xl w-3/4"></div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                    <div className="h-6 w-px bg-gray-100"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>

                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                <div className="pt-4">
                    <div className="h-14 bg-gray-200 rounded-xl w-48"></div>
                </div>
            </div>
        </div>
    );
}
