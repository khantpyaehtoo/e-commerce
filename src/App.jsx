import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContexts";

import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./pages/LoginForm";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ProductsPage from "./pages/dashboard/ProductsPage";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import CartModal from "./components/CartModal";
import SkeletonCard from "./components/skeletons/SkeletonCard";

function App() {
    const { user, authReady } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const adminPath = import.meta.env.VITE_ADMIN_PATH;

    if (!authReady) {
        return <SkeletonCard />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="marketItems/:id" element={<ItemDetail />} />

                <Route path="checkout" element={<Checkout />} />

                <Route
                    path={`/${adminPath}`}
                    element={isAuthenticated ? <AdminPanel /> : <LoginForm />}
                >
                    <Route index element={<DashboardHome />} />
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route path="order" element={<OrdersPage />} />
                    <Route path="product" element={<ProductsPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <CartModal />
        </BrowserRouter>
    );
}

export default App;
