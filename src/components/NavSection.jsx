const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

export default function NavSection() {
    return (
        <nav>
            <div className="grid grid-cols-3 gap-2 mx-2 my-2 ">
                <select
                    className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-payment"
                >
                    <option defaultValue>Select</option>
                    <option>Low to High</option>
                    <option>High to Low</option>
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
    );
}
