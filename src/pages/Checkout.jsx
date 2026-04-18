import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import DetailNavSection from '../components/DetailNavSection';

export default function Checkout() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DetailNavSection />
                <div className="flex flex-col items-center justify-center h-[70vh] px-4">
                    <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
                        <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="text-purple-600" size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <DetailNavSection />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to shopping</span>
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-purple-600 font-bold mb-3">{item.price.toLocaleString()} mmk</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-purple-600 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-purple-600 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm text-gray-400">Subtotal</p>
                                    <p className="font-bold text-gray-800">{(item.price * item.quantity).toLocaleString()} mmk</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{totalPrice.toLocaleString()} mmk</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-green-500 font-medium">Calculated later</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="text-2xl font-bold text-purple-600">{totalPrice.toLocaleString()} mmk</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    alert('Order placed successfully!');
                                    clearCart();
                                    navigate('/');
                                }}
                                className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-[0.98]"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
