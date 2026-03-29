import React from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ShoppingItems from "../components/ShoppingItem";

export default function Home() {
    return (
        <>
            <HeroSection />
            <main>
                <ShoppingItems />
            </main>

            <Footer />
        </>
    );
}
