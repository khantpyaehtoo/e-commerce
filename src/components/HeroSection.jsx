import { Link } from "react-router-dom";
import backgroundImageURL from "../assets/backgroundPNG.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    return (
        <section
            className="sticky top-0 -z-10 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${backgroundImageURL})`,
            }}
        >
            <motion.div
                className="container max-w-4xl mx-auto text-center py-6 rounded-lg backdrop-blur-sm"
                style={{ y: y1 }}
            >
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
                        Don't <span className="text-blue-500">OVERWATER</span>{" "}
                        your Plants!
                    </h1>

                    <Link
                        to={"#"}
                        className="inline-block  rounded-lg px-4 py-2.5 text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white transition-colors "
                    >
                        <span className="cursor-pointer">
                            Contact Me On Telegram
                        </span>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
