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
              <p className="headtext">Hi, I'm Jake DeRoma</p>

              <p className="subtext text-base md:text-lg leading-relaxed font-bold">
                I specialize in{" "}
                <span className="text-yellow-400">
                  technical game design
                </span>{" "}
                and{" "}
                <span className="text-yellow-400">
                  game engineering
                </span>
                <br />
                with a focus on building video games and working in{" "}
                <span className="text-yellow-400">
                  collaborative teams
                </span>{" "}
                using <span className="text-yellow-400">Unity</span>.
                <br />
                My most recent projects include{" "}
                <span className="text-yellow-400">
                  Drop Off Dragon
                </span>
                , developed at{" "}
                <span className="text-yellow-400">
                  MassDiGI
                </span>
                ,
                <br />
                as well as my solo project{" "}
                <span className="text-yellow-400">
                  Fobia Fights
                </span>
                ,
                <br />
                which is set to release on{" "}
                <span className="text-yellow-400">Steam</span> on August 7th,
                2026!
                <br />
                <br />
                (ADD MORE HERE)
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