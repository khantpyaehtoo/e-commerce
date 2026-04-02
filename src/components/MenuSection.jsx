const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

export default function MenuSection({ setSortBy, sortBy }) {
    return (
        <section>
            {/* Mobile View section */}
            <div className="md:hidden grid grid-cols-3 gap-2 mx-2 my-2 ">
                <select
                    className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-payment"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>

                {navItems.map((item, key) => (
                    <a
                        href={item.href}
                        key={key}
                        className="py-3 px-4 bg-blue-400 text-white hover:bg-amber-300 focus:bg-white rounded-md text-center"
                    >
                        {item.name}
                    </a>
                ))}
            </div>

            {/* Desktop View section */}
            <div className="hidden md:flex justify-between items-center px-10 py-5">
                <div className="flex gap-4">
                    {navItems.map((item, key) => (
                        <a
                            href={item.href}
                            key={key}
                            className="text-gray-700 hover:text-blue-500 font-bold"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <select
                    className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="low-to-high">Sort: Low to High</option>
                    <option value="high-to-low">Sort: High to Low</option>
                </select>
            </div>
        </section>
    );
}
