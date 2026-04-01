export default function SkeletonCard() {
    return (
        <div className="bg-gray-200 rounded-lg h-[380px] animate-pulse">
            <div className="w-full h-[220px] bg-gray-300"></div>
            <div className="p-5 flex flex-col justify-between h-[160px]">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
            </div>
        </div>
    );
}
