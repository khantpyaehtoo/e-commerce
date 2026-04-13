import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { cn } from "../lib/utils";

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
        <form
            className="bg-white shadow-2xl rounded-2xl px-6 py-6 w-full max-w-lg relative max-h-[95vh] overflow-y-auto no-scrollbar"
            onSubmit={handleConfirmOrder}
        >
            <button
                onClick={onClose}
                type="button"
                className="absolute top-3 right-5 text-2xl font-bold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                aria-label="Close"
            >
                ×
            </button>

            <div className="mb-4">
                <h1 className="text-2xl font-black text-gray-900 uppercase">
                    Buy Now
                </h1>
                <p className="text-gray-500 text-xs mt-0.5">
                    Complete your order to join the syndicate.
                </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-5 border-l-4 border-purple-500 relative">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Kpay Account
                        </span>
                        <p className="text-lg font-bold text-gray-800">
                            09699xxxxxx
                        </p>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Wave Money
                        </span>
                        <p className="text-lg font-bold text-gray-800">
                            09699xxxxxx
                        </p>
                    </div>
                </div>

                <a
                    href="https://t.me/pyxis_xi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "mt-3 bg-sky-500 text-white font-bold py-2 px-4 w-full flex items-center justify-center gap-2 rounded-lg text-xs uppercase",
                        "hover:bg-sky-400 transition-colors",
                    )}
                >
                    <span>➤</span> Chat on Telegram
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-1.5"
                        htmlFor="grid-first-name"
                    >
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={cn(
                            "appearance-none block w-full bg-gray-50 border border-gray-100 text-gray-700 rounded-lg py-2.5 px-4 leading-tight",
                            "focus:outline-none focus:bg-white focus:border-purple-500 transition-all",
                        )}
                        id="grid-first-name"
                        type="text"
                        placeholder="Jane"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>

                {/* Phone */}
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-1.5"
                        htmlFor="grid-phone-number"
                    >
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-100 rounded-lg py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all"
                        id="grid-phone-number"
                        type="text"
                        placeholder="09 xxxxxxxxx"
                        onChange={handleChange}
                        value={formData.phone}
                    />
                </div>
            </div>

            <div className="mb-4">
                {/* address */}
                <label
                    className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-1.5"
                    htmlFor="grid-address"
                >
                    Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                    className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-100 rounded-lg py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all"
                    id="grid-address"
                    rows="2"
                    placeholder="Enter Your Full Address"
                    onChange={handleChange}
                    value={formData.address}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Payment */}
                <div>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-1.5"
                        htmlFor="grid-payment"
                    >
                        Payment <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-gray-50 border border-gray-100 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all"
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

                <div className="md:col-span-2">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-[10px] font-bold mb-1.5"
                        htmlFor="grid-zip"
                    >
                        Last 5 Digit of Payslip Id{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-100 rounded-lg py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-all"
                        id="grid-last-digit"
                        type="text"
                        placeholder="xxxxx"
                        onChange={handleChange}
                        value={formData.last5Digits}
                        required
                    />
                </div>
            </div>

            <div className="w-full">
                <button
                    type="submit"
                    className={`shadow focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded-xl w-full transition-all cursor-pointer active:scale-[0.98] ${
                        isFormInvalid || isLoading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200"
                    }`}
                    disabled={isFormInvalid || isLoading}
                >
                    {isLoading ? "Sending..." : "Confirm Payment & Order"}
                </button>
            </div>
        </form>
    );
}
