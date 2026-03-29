const marketItems = [
    { name: "SISBURMA", price: "75,000 mmk", image: "./asset/hero.png" },
    { name: "SISBURMA", price: "65,000 mmk", image: "./asset/hero.png" },
    { name: "SISBURMA", price: "45,000 mmk", image: "./asset/hero.png" },
];

export default function ShoppingItems() {
    return (
        <div className="p-10">
            {marketItems.map((item, key) => (
                <div
                    key={key}
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
                            <p className="py-2 text-gray-200">{item.price}</p>
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
    );
}
