import HeroText from "../components/HeroText";
import Projects from "../sections/Projects";
import { Particles } from "../components/Particles";

const Hero = () => {
    return (
        <section className="relative flex items-start justify-center md:justify-start min-h-screen overflow-hidden c-space">
            {/* Background particles */}
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />

            {/* HeroText with all the projects */}
            <div className="relative z-10 flex flex-col gap-16">
                <HeroText />

                <div className="mt-12">
                    <h2 className="text-heading">
                        Projects
                    </h2>

                    <Projects />
                </div>
            </div>

            {/* JAKE MIRROR */}
            <img
                src="/assets/jakemirror1.gif"
                alt="Jake Mirror"
                className="absolute right-10 top-24 w-112.5 h-auto object-contain"
            />
        </section>
    );
};

export default Hero;