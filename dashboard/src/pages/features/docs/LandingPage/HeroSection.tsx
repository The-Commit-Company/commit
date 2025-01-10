
import { Button } from "@/components/ui/button";
import ManDoodle from "../../../../assets/man_doodle.png";

const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen items-center justify-center px-4 sm:px-6 lg:px-6 ">
            <div className="w-full md:w-1/2 p-4 md:p-8 text-center md:text-left">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-title_font tracking-tighter mb-6">
                    Documentation is now Lemon Sqeezy
                </div>
                <div className="font-title_font tracking-tight text-base sm:text-lg md:text-xl mb-8">
                    Meet <span className="font-bold">Commit Docs</span>, built with Frappe Framework, it is the modern standard for public-facing documentation. Beautiful out of the box, easy to maintain, and <span className="text-gray-500">Open Source ✨</span>.
                </div>
                <div className="flex justify-center md:justify-start">
                    <Button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300 z-30 relative">
                        Get Started &rarr;
                    </Button>
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-8">
                    <img
                        src={ManDoodle}
                        alt="ManDoodle."
                        className="w-full h-auto max-h-96 object-contain"
                />
            </div>
        </div>
    )
}

export default HeroSection