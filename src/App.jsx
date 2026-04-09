import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContexts";

import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./pages/LoginForm";

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
                    path={import.meta.env.VITE_ADMIN_PATH}
                    element={isAuthenticated ? <AdminPanel /> : <LoginForm />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
