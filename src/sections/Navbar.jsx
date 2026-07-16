import { useState } from "react";
import { motion } from "motion/react";

/**
 * Navigation links shared between the desktop and mobile navigation menus
 */
function Navigation({ openContact }) {
  return (
    <ul className="nav-ul">
      {/* Projects Section */}
      <li className="nav-li">
        <a className="nav-link" href="#projects">
          Projects
        </a>
      </li>

      {/* About Section */}
      <li className="nav-li">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>

      {/* Opens resume PDF in a new browser tab */}
      <li className="nav-li">
        <a
          className="nav-link"
          href="/Jake_DeRoma_Resume.pdf"
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

  /**
   * Smoothly scrolls the page back to the top when the site title is clicked.
   * Also closes the mobile menu if it is open
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  /**
   * Opens the contact pop up supplied by the parent component and closes the mobile navigation
   */
  const handleOpenContact = () => {
    openContact();
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
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>

          {/* Desktop navigation hidden on small screens. */}
          <nav className="hidden sm:flex">
            <Navigation openContact={handleOpenContact} />
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
            <Navigation openContact={handleOpenContact} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;