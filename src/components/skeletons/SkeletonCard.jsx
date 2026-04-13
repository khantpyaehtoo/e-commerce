export default function SkeletonCard() {
    return (
        <div className="animate-pulse">
            {/* Mobile Layout: Horizontal */}
            <div className="grid grid-cols-2 gap-2 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden h-[220px] md:hidden shadow-sm">
                <div className="w-full h-full bg-gray-200"></div>
                <div className="px-6 py-4 flex flex-col h-full">
                    <div className="flex-grow">
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full mb-2"></div>
                </div>
            </div>

            {/* Desktop Layout: Vertical */}
            <div className="hidden md:flex flex-col bg-gray-50 border border-gray-100 rounded-lg overflow-hidden h-[380px] shadow-sm">
                <div className="w-full h-[220px] bg-gray-200"></div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full mt-3"></div>
                </div>
            </div>
        </div>
    );
}
