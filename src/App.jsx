import { useState } from "react";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        paymentType: "",
        last5Digits: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "grid-first-name") setFormData({ ...formData, name: value });
        if (id === "grid-phone-number")
            setFormData({ ...formData, phone: value });
        if (id === "grid-address") setFormData({ ...formData, address: value });
        if (id === "grid-payment")
            setFormData({ ...formData, paymentType: value });
        if (id === "grid-last-digit")
            setFormData({ ...formData, last5Digits: value });
    };

    const sendOrderNotification = async (orderInfo) => {
        if (!orderInfo.name || !orderInfo.phone || !orderInfo.address)
            return alert("Please fill all info");
        setIsLoading(true);

        const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        const message = `
          📦 **Order အသစ်တက်လာပါပြီ!**
          -------------------------
        👤 အမည်: ${orderInfo.name}
        📞 ဖုန်း: ${orderInfo.phone}
        📍 လိပ်စာ: ${orderInfo.address}
        💰 ငွေလွှဲ: ${orderInfo.paymentType} (${orderInfo.last5Digits})
    `;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: "Markdown",
                    }),
                },
            );

            if (response.ok) {
                console.log("Telegram notification sent!");
            }
        } catch (error) {
            console.error("Telegram Error:", error);
            alert("ပို့လို့မရပါဘူး၊ ခဏနေမှ ပြန်စမ်းကြည့်ပါ");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    {/* Name */}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Full Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 borde rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    {/* Phone */}
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-phone-number"
                        >
                            Phone Number
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-phone-number"
                            type="text"
                            placeholder="09 xxxxxxxxx"
                            onChange={handleChange}
                            value={formData.phone}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    {/* address */}
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-address"
                        >
                            Delivery Address
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-address"
                            placeholder="Enter Your Full Address"
                            onChange={handleChange}
                            value={formData.address}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    {/* Payment */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-payment"
                        >
                            Payment
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-payment"
                                onChange={handleChange}
                                value={formData.paymentType}
                            >
                                <option selected>Select</option>
                                <option>Kpay</option>
                                <option>Wave</option>
                                <option>AYA</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-zip"
                        >
                            Last 5 Digit of Payslip Id
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-digit"
                            type="text"
                            placeholder="90210"
                            onChange={handleChange}
                            value={formData.last5Digits}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center my-4 items-center">
                    <div className="w-full">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                            type="button"
                            onClick={() => sendOrderNotification(formData)}
                        >
                            {isLoading
                                ? "Sending..."
                                : "Confirm Payment & Order"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
