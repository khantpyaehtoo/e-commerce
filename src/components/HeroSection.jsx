export default function HeroSection() {
    return (
        <section className="relative min-h-[80%] flex flex-col items-center justify-center px-4 ">
            <div className="container max-w-4xl mx-auto text-center z-10 border-2 border-amber-500 py-8 my-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        <p>Welcome to ONIMUSHA</p>
                    </h1>

                    <a
                        href=""
                        className="bg-blue-400 text-white rounded-lg px-4 py-4 font-bold hover:bg-amber-300"
                    >
                        Contact Me On Telegram
                    </a>
                </div>
            </div>
        </section>
    );
}
