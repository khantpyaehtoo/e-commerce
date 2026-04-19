const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

export default function MenuSection({ setSortBy, sortBy }) {
    return (
        <section className="w-full">
            {/* Mobile View section */}
            <div className="md:hidden flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div className="relative flex-1 min-w-[120px]">
                    <select
                        className="w-full appearance-none bg-[#2d3748] border border-white/20 text-white py-2 px-3 pr-8 rounded-md text-sm leading-tight focus:outline-none"
                        id="grid-payment"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>

                {/* Nav Items (Market, Blogs) */}
                <div className="flex gap-2">
                    {navItems.map((item, key) => (
                        <a
                            href={item.href}
                            key={key}
                            className="py-2 px-4 bg-charocal-blue text-white hover:bg-dusk-blue focus:bg-white focus:text-gray-800 rounded-md text-sm text-center font-medium transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Desktop View section */}
            <div className="hidden md:flex justify-between items-center px-10 py-5">
                <div className="flex gap-6">
                    {navItems.map((item, key) => (
                        <a
                            href={item.href}
                            key={key}
                            className="text-charocal-blue hover:text-dusk-blue font-bold transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="relative">
                    <select
                        className="appearance-none bg-charocal-blue border border-white/20 text-white py-2 px-4 pr-10 rounded-lg focus:outline-none focus:border-dusk-blue"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="low-to-high">Sort: Low to High</option>
                        <option value="high-to-low">Sort: High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
