import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavSection from "./components/NavSection";
import ShoppingItems from "./components/ShoppingItem";

function App() {
    return (
        <>
            <HeroSection />
            <NavSection />

            <main>
                <ShoppingItems />
            </main>

            <Footer />
        </>
    );
}

export default App;
