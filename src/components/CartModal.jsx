import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { ShoppingCart, X, Trash2, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

export default function CartModal() {
    const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 flex justify-center">
            <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 w-full max-w-md ${isOpen ? 'mb-0' : 'mb-0'}`}>
                {/* Header/Toggle Bar */}
                <div 
                    className="bg-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        </div>
                        <span className="font-bold">Your Cart</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-bold">{totalPrice.toLocaleString()} mmk</span>
                        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </div>
                </div>

                {/* Cart Items List */}
                {isOpen && (
                    <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-purple-600 font-bold text-sm">{item.price.toLocaleString()} mmk</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Bar (Check Out Button) */}
                {isOpen && (
                    <div className="p-4 border-t border-gray-100">
                        <button className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                            Check Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
