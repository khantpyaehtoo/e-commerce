import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextsProvider } from "./contexts/AuthContexts";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextsProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthContextsProvider>
    </StrictMode>,
);
