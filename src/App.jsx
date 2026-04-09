import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContexts";

import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./pages/LoginForm";
import DashboardHome from "./pages/DashboardHome";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
    const { user, authReady } = useContext(AuthContext);
    const isAuthenticated = !!user;

    if (!authReady) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="marketItems/:id" element={<ItemDetail />} />

                <Route
                    path={`/${import.meta.env.VITE_ADMIN_PATH}`}
                    element={isAuthenticated ? <AdminPanel /> : <LoginForm />}
                >
                    <Route index element={<DashboardHome />} />
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route path="order" element={<OrdersPage />} />
                    <Route path="product" element={<ProductsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
