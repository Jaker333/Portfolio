import { useState } from "react";
import { motion } from "framer-motion";
import Project from "../components/Project";
import { myProjects } from "../constants";

// PC project count displayed initially
const INITIAL_PROJECT_COUNT = 3;

const Projects = () => {
  // Stores the currently selected project preview.
  const [preview, setPreview] = useState(null);

  // Controls whether all projects are shown or only the initial set.
  const [showAll, setShowAll] = useState(false);

  // Shows displayed projects
  const displayedProjects = showAll ? myProjects : myProjects.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <section id="projects" className="pt-8 pb-16 scroll-mt-20">
      {/* Centers the content and limits the maximum width */}
      <div className="mx-auto w-full max-w-[1800px] px-4">

        {/* Responsive project grid - single column on mobile, 3 on tablet, 3 on desktop. */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 xl:grid-cols-3">
          {displayedProjects.map((project) => (
            <Project
              key={project.id}
              {...project}
              setPreview={setPreview}
            />
          ))}
        </div>

        {/* Only show the toggle button if there are more than the default number of projects available. */}
        {myProjects.length > INITIAL_PROJECT_COUNT && (
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