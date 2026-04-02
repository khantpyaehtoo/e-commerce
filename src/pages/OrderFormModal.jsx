import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function OrderFormModal({ productName, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        paymentType: "",
        last5Digits: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const isFormInvalid =
        !formData.name.trim() ||
        !formData.phone.trim() ||
        !formData.address.trim() ||
        formData.paymentType === "" ||
        !formData.last5Digits.trim();

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

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (isFormInvalid) return;

        setIsLoading(true);

        const { data, error } = await supabase.from("data").insert([
            {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                payment: formData.paymentType,
                receipt_digits: formData.last5Digits,
                product_name: productName,
            },
        ]);

        if (!error) {
            await sendOrderNotification(formData);
            alert("အော်ဒါတင်ခြင်း အောင်မြင်ပါတယ်!");
            onClose();
        } else {
            alert("Database သိမ်းရာမှာ အမှားအယွင်းရှိပါတယ်");
        }
        setIsLoading(false);
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
        📦 ပစ္စည်း: ${productName}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
            <form
                className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto no-scrollbar"
                onSubmit={handleConfirmOrder}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2xl font-bold text-gray-500 cursor-pointer hover:text-gray-800"
                >
                    ×
                </button>

                <div className="mb-4">
                    <h1 className="text-3xl font-black text-gray-900 uppercase">
                        Buy Now
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Complete your order to join the syndicate.
                    </p>
                </div>

                <div className="bg-gray-100 p-5 rounded-md mb-6 border-l-4 border-green-500 relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Kpay Account
                            </span>
                            <p className="text-xl font-bold text-gray-800 mt-1">
                                09699xxxxxx
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Wave Money
                            </span>
                            <p className="text-xl font-bold text-gray-800 mt-1">
                                09699xxxxxx
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://t.me/pyxis_xi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-4 w-full flex items-center justify-center gap-2 rounded text-sm uppercase"
                    >
                        <span>➤</span> Chat on Telegram
                    </a>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    {/* Name */}
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Full Name <span className="text-red-500">*</span>
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
                            Phone Number <span className="text-red-500">*</span>
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
                            Delivery Address{" "}
                            <span className="text-red-500">*</span>
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
                            Payment <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-payment"
                                onChange={handleChange}
                                value={formData.paymentType}
                            >
                                <option value="">Select</option>
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
                            Last 5 Digit of Payslip Id{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-digit"
                            type="text"
                            placeholder="xxxxx"
                            onChange={handleChange}
                            value={formData.last5Digits}
                            required
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center my-4 items-center">
                    <div className="w-full">
                        <button
                            type="submit"
                            className={`shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full transition-colors cursor-pointer ${
                                isFormInvalid || isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-purple-500 hover:bg-purple-400"
                            }`}
                            disabled={isFormInvalid || isLoading}
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
