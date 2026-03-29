import { ShoppingCart } from "lucide-react";

const navItems = [
    { name: "Market", href: "#market" },
    { name: "Blogs", href: "#blogs" },
];

const marketItems = [
    { name: "SISBURMA", price: "75,000 mmk", image: "./asset/hero.png" },
    { name: "SISBURMA", price: "75,000 mmk", image: "./asset/hero.png" },
    { name: "SISBURMA", price: "75,000 mmk", image: "./asset/hero.png" },
];

function App() {
    return (
        <div>
            <section className="relative min-h-[80%] flex flex-col items-center justify-center px-4 ">
                <div className="container max-w-4xl mx-auto text-center z-10 border-2 border-amber-500 py-8 my-10">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            <p>Welcome to ONIMUSHA</p>
                        </h1>

                        <a
                            href=""
                            className="bg-blue-400 text-white rounded-lg px-4 py-4 font-bold hover:bg-amber-300"
                        >
                            Contact Me On Telegram
                        </a>
                    </div>
                </div>
            </section>

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

            <main>
                <div className="p-10">
                    {marketItems.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-2 gap-2 bg-gray-600 p-2 rounded-lg overflow-hidden h-[220px] my-5"
                        >
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
                                        {item.price}
                                    </p>
                                </div>

                                <div className="flex flex-row-reverse gap-2 justify-end items-center mb-2">
                                    <a
                                        href="#"
                                        className="bg-red-600 text-white px-6 py-2 w-full text-center rounded-lg"
                                    >
                                        Info
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="w-full h-8 bg-gray-600 p-2">
                <div className="flex justify-evenly items-center text-sm text-white">
                    <p>Onimusha</p>
                    <span>Copyright Term</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
