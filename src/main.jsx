import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextsProvider } from "./contexts/AuthContexts";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextsProvider>
            <App />
        </AuthContextsProvider>
    </StrictMode>,
);
