import { Link } from "react-router-dom";
import backgroundImageURL from "../assets/backgroundPNG.jpg";

export default function HeroSection() {
    return (
        <section
            className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImageURL})`,
            }}
        >
            <div className="container max-w-4xl mx-auto text-center border-1 border-white py-6 rounded-lg backdrop-blur-sm">
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
                        Don't <span className="text-blue-500">OVERWATER</span>{" "}
                        your Plants!
                    </h1>

                    <Link
                        to={"#"}
                        className="inline-block rounded-lg px-4 py-2.5 text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white transition-colors"
                    >
                        <span>Contact Me On Telegram</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
