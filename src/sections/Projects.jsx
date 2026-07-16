import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Project from "../components/Project";
import { myProjects } from "../constants";

const Projects = () => {
  // Stores the currently selected project preview.
  const [preview, setPreview] = useState(null);

  // Controls whether all projects are shown or only the initial set.
  const [showAll, setShowAll] = useState(false);

  // Detect if the screen is mobile-sized.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  // Listen for window resizing so the number of displayed
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Display every project when expanded.
  // Mobile: show first 2 projects.
  // Desktop/Tablet: show first 3 projects.
  const displayedProjects = showAll ? myProject : myProjects.slice(0, isMobile ? 2 : 3);

  return (
    <section id="projects" className="pt-8 pb-16 scroll-mt-20">
      {/* Centers the content and limits the maximum width */}
      <div className="mx-auto w-full max-w-[1800px] px-4">

        {/* Responsive project grid */}
        <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
          {displayedProjects.map((project) => (
            <Project
              key={project.id}
              {...project}
              setPreview={setPreview}
            />
          ))}
        </div>

        {/* Only show the toggle button if there are more than the default number of desktop projects available. */}
        {myProjects.length > 3 && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 font-medium text-white grid-special-color rounded-lg shadow-lg cursor-pointer"

              // Default animation state
              animate={{
                rotate: 0,
                scale: 1,
              }}

              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}

              // Playful hover animation
              whileHover={{
                scale: 1.08,
                rotate: [0, -2, 2, -2, 2, 0],
                transition: {
                  scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 12,
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 0.55,
                    ease: "easeInOut",
                  },
                },
              }}

              // Small press animation for click feedback
              whileTap={{
                scale: 0.94,
                rotate: [0, -5, 5, -4, 4, 0],
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
            >
              {showAll ? "View Less Projects" : "View More Projects"}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;