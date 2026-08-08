import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation({ openContact, goToSection }) {
  return (
    <ul className="nav-ul">
      {/* Projects Section — scrolls to #projects on the home page*/}
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => goToSection("projects")}
        >
          Projects
        </button>
      </li>

      {/* About Section*/}
      <li className="nav-li">
        <button
          className="nav-link cursor-pointer"
          onClick={() => goToSection("about")}
        >
          About
        </button>
      </li>

      {/* Opens resume PDF in a new browser tab */}
      <li className="nav-li">
        <a
          className="nav-link"
          href={`${import.meta.env.BASE_URL}Jake_DeRoma_Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </li>

      {/* Opens the contact pop up*/}
      <li className="nav-li">
        <button
          onClick={openContact}
          className="nav-link cursor-pointer"
        >
          Contact
        </button>
      </li>
    </ul>
  );
}

const Navbar = ({ openContact }) => {
  // Tracks whether the mobile navigation menu is open
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Scrolls to a section id on the home page
   */
  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    setIsOpen(false);
  };

  /**
   * Clicking the site title returns to the top of the home page.
   */
  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  /**
   * Opens the contact pop up supplied by the parent component and closes the mobile navigation
   */
  const handleOpenContact = () => {
    if (openContact) {
      openContact();
    }

    setIsOpen(false);
  };

  return (
    // Fixed pos navigation bar that stays visible while scrolling.
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">

          {/* Website title in top left*/}
          <a
            className="text-l font-bold transition-colors text-neutral-400 hover:text-white cursor-pointer"
            onClick={scrollToTop}
          >
            Jake DeRoma • Technical Game Designer
          </a>

          {/* Mobile menu toggle button, hidden on screens larger than the 'sm' breakpoint */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={
                isOpen ? `${import.meta.env.BASE_URL}assets/close.svg` : `${import.meta.env.BASE_URL}assets/menu.svg`
              }
              className="w-6 h-6"
              alt="toggle"
            />
          </button>

          {/* Desktop navigation hidden on small screens. */}
          <nav className="hidden sm:flex">
            <Navigation openContact={handleOpenContact} goToSection={goToSection} />
          </nav>
        </div>
      </div>

      {/* Mobile navigation menu, only renders when the menu has been opened */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"

          // Slide and fade into view.
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}

          // Prevent clipping for taller menus.
          style={{ maxHeight: "100vh" }}

          // Animation timing.
          transition={{ duration: 0.3 }}
        >
          <nav className="pb-5">
            <Navigation openContact={handleOpenContact} goToSection={goToSection} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;