import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import AdminPanel from "./pages/AdminPanel";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="marketItems/:id" element={<ItemDetail />} />
                    <Route
                        path={import.meta.env.VITE_ADMIN_PATH}
                        element={<AdminPanel />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
