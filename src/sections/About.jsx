import CopyEmailButton from "../components/CopyEmailButton";

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden c-space pt-28 pb-10 scroll-mt-24"
    >
      <div className="relative z-10">
        <h2 className="text-heading">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-8">
          {/* Main Card */}
          <div className="relative md:col-span-6 grid-black-color rounded-2xl overflow-hidden">
            <div className="relative z-10 p-6">
              <p className="headtext">Hello! I’m Jake DeRoma</p>

              <p className="subtext text-base md:text-lg leading-relaxed font-bold">
                <br />

                I specialize in{" "}
                <span className="text-yellow-400">
                  Technical Game Design
                </span>{" "}
                and enjoy rapidly developing{" "}
                <span className="text-yellow-400">
                  memorable game mechanics
                </span>{" "}
                and
                {" "}
                <span className="text-yellow-400">
                  systems
                </span>{" "}

                for players to enjoy.

                <br />
                <br />

                I'm currently studying{" "}
                <span className="text-yellow-400">
                  Computer Science
                </span>{" "}
                with a minor in{" "}
                <span className="text-yellow-400">
                  Game Design
                </span>{" "}
                at Wentworth Institute of Technology, where I maintain a{" "}
                <span className="text-yellow-400">
                  4.0 GPA
                </span>
                .

                <br />
                <br />

                During{" "}
                <span className="text-yellow-400">
                  Summer 2026
                </span>
                , I interned at{" "}
                <span className="text-yellow-400">
                  MassDiGI
                </span>
                , where I helped ship{" "}
                <span className="text-yellow-400">
                  Drop Off Dragon
                </span>{" "}
                as a{" "}
                <span className="text-yellow-400">
                  Programmer
                </span>{" "}
                and{" "}
                <span className="text-yellow-400">
                  Build Master
                </span>
                .

                <br />
                <br />

                In my free time, I solo developed{" "}
                <span className="text-yellow-400">
                  Fobia Fights
                </span>
                , a{" "}
                <span className="text-yellow-400">
                  Multiplayer PvP game
                </span>{" "}
                available on{" "}
                <span className="text-yellow-400">
                  Steam
                </span>
                .

                <br />
                <br />

                My mission is to create games that bring players together through{" "}
                <span className="text-yellow-400">
                  fun, memorable game experiences
                </span>
                .
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-blue-500/30 to-transparent pointer-events-none" />
          </div>

          {/* Contact Card */}
          <div className="md:col-span-6 flex justify-center">
            <div className="grid-black-color w-full max-w-sm rounded-2xl px-6 py-5">
              <div className="flex flex-col items-center gap-3">
                <p className="headtext text-center">
                  Looking to contact me?
                </p>

                <CopyEmailButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;