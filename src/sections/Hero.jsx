import { useEffect, useRef, useState } from "react";
import HeroText from "../components/HeroText";
import Projects from "../sections/Projects";
import { Particles } from "../components/Particles";

const DEFAULT_MIRROR_GIF = `${import.meta.env.BASE_URL}assets/jakemirror1.gif`;
const ALT_MIRROR_GIF = `${import.meta.env.BASE_URL}assets/jakemirror2.gif`;
const ALT_GIF_DURATION = 500; // in ms

const Hero = () => {
    // Tracks whether the laughing gif is currently playing
    const [showAltGif, setShowAltGif] = useState(false);

    // Bumped on every click so the image remounts and the gif restarts
    const [playKey, setPlayKey] = useState(0);

    const revertTimeoutRef = useRef(null);

    // Clean up the pending revert timer if the page changes mid-animation
    useEffect(() => { return () => clearTimeout(revertTimeoutRef.current); }, []);

    const handleMirrorClick = () => {
        setShowAltGif(true);
        setPlayKey((k) => k + 1);

        clearTimeout(revertTimeoutRef.current);
        revertTimeoutRef.current = setTimeout(() => { setShowAltGif(false); }, ALT_GIF_DURATION);
    };

    return (
        <section className="relative flex items-start justify-center md:justify-start min-h-screen overflow-hidden c-space">
            {/* Background particles */}
            <Particles
                className="absolute inset-0 -z-50 pointer-events-none"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />

            {/* HeroText of Projects*/}
            <div className="relative z-10 flex flex-col gap-10 sm:gap-16">
                <HeroText />

                <div className="mt-8 sm:mt-12">
                    <h2 className="text-heading">
                        Projects
                    </h2>

                    <Projects />
                </div>
            </div>

            {/* JAKE MIRROR  */}
            <button
                type="button"
                onClick={handleMirrorClick}
                aria-label="Play a fun animation"
                className="hidden cursor-pointer border-none bg-transparent p-0 sm:block absolute z-10 pointer-events-auto right-4 top-20 w-32 sm:right-6 sm:w-48 md:right-8 md:w-72 lg:right-10 lg:top-24 lg:w-112.5"
            >
                <img
                    key={showAltGif ? `alt-${playKey}` : "default"}
                    src={showAltGif ? ALT_MIRROR_GIF : DEFAULT_MIRROR_GIF}
                    alt="Jake Mirror"
                    className="h-auto w-full object-contain"
                />
            </button>
        </section>
    );
};

export default Hero;