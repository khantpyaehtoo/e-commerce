import { useGSAP } from "@gsap/react";
import backgroundImageURL from "../assets/backgroundPNG.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);

    useGSAP(() => {
        const titleSplit = SplitText.create(".hero-title", {
            type: "words",
        });
        const tl = gsap.timeline({
            delay: 1,
        });

        tl.to(".hero-content", {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
        }).from(
            titleSplit.words,
            {
                yPercent: 200,
                stagger: 0.06,
                ease: "power2.out",
            },
            "-=0.2",
        );
    });

    return (
        <section
            className="sticky top-0 min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat transition-all duration-300"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImageURL})`,
            }}
        >
            <motion.div
                className="container max-w-4xl mx-auto text-center py-8 px-6 rounded-2xl backdrop-blur-[2px]"
                style={{ y: y1 }}
            >
                <div className="space-y-6 ">
                    <div className="hero-content opacity-0">
                        <div className="overflow-hidden">
                            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight tracking-tight hero-title">
                                Don't{" "}
                                <span className="text-blue-400 drop-shadow-sm">
                                    OVERWATER
                                </span>{" "}
                                your Plants!
                            </h1>
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
                        Keep your green friends healthy with our expert care
                        tips and curated collection of plant essentials.
                    </p>

                    <div className="pt-4">
                        <a
                            href="https://t.me/BurmesePython000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-full px-8 py-3.5 text-base font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="flex items-center gap-2">
                                Contact Me On Telegram
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
