import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartModal() {
    const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    if (totalItems === 0) return null;

    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/checkout');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Expanded Cart View */}
            {isOpen && (
                <div className="mb-4 bg-white rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={20} />
                            <span className="font-bold">Your Cart</span>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-purple-700 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="max-h-[350px] overflow-y-auto p-4 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 items-center">
                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                                    <p className="text-purple-600 font-bold text-xs">{item.price.toLocaleString()} mmk</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600 text-sm">Total:</span>
                            <span className="font-bold text-purple-600 text-lg">{totalPrice.toLocaleString()} mmk</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all shadow-md active:scale-[0.98]"
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 active:scale-90 flex items-center justify-center ${isOpen ? 'rotate-90' : 'rotate-0'}`}
            >
                {isOpen ? <X size={28} /> : <ShoppingCart size={28} />}
                
                {/* Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>
    );
}
