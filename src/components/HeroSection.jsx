import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="relative min-h-[80%] flex flex-col items-center justify-center px-4 ">
            <div className="container max-w-4xl mx-auto text-center z-10 border-2 border-amber-500 py-8 my-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        <p>Welcome to Burmese_Python</p>
                    </h1>

                    <Link
                        to={"#"}
                        className="rounded-lg px-2 py-2 font-bold bg-sky-500 hover:bg-sky-400 text-white"
                    >
                        <span>Contact Me On Telegram</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
