import { useState } from "react";
import { Link } from "react-router-dom";

const marketItems = [
    { id: 1, name: "SISBURMA", price: 75000, image: "./asset/hero.png" },
    { id: 2, name: "SISBURMA", price: 65000, image: "./asset/hero.png" },
    { id: 3, name: "SISBURMA", price: 45000, image: "./asset/hero.png" },
];

const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

export default function ShoppingItems() {
    const [sortBy, setSortBy] = useState("low-to-high");

    const filterAndSort = () => {
        let filtered = [...marketItems];

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "low-to-high":
                    return a.price - b.price;
                case "high-to-low":
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        return filtered;
    };
    return (
        <>
            <nav>
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
                            className="py-3 px-4 bg-blue-400 text-white hover:bg-amber-300 focus:bg-white rounded-md"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
            {/* mobile view */}
            {!!marketItems && (
                <div className="md:hidden p-10">
                    {filterAndSort().map((item, key) => (
                        <Link to={`/marketItems/${item.id}`} key={item.id}>
                            <div className="grid grid-cols-2 gap-2 bg-gray-600 p-2 rounded-lg overflow-hidden h-[220px] my-5">
                                <div className="w-full h-full">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover bg-amber-200 shadow-2xl rounded-l-md"
                                    />
                                </div>

                                <div className="px-6 py-4 flex flex-col h-full">
                                    <div className="flex-grow">
                                        <h2 className="py-1 font-bold text-2xl text-white">
                                            {item.name}
                                        </h2>
                                        <p className="py-2 text-gray-200">
                                            {item.price.toLocaleString()} mmk
                                        </p>
                                    </div>

                                    <div className="flex flex-row-reverse gap-2 justify-end items-center mb-2">
                                        <div className="bg-red-600 text-white px-6 py-2 w-full text-center rounded-lg">
                                            Info
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
