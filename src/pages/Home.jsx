import HeroSection from "../components/HeroSection";
import ShoppingItems from "../components/ShoppingItem";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <main className="flex-grow">
                <ShoppingItems />
            </main>
        </div>
    );
}
