import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Footer from "./sections/Footer";
import ProjectPage from "./ProjectPage";
import { Particles } from "./components/Particles";
import Contact from "./sections/Contact";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to effect
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    const timeout = setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      // Clear the scroll target so it doesn't re-fire on future visits
      navigate(location.pathname, { replace: true, state: {} });
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      {/* Background Particles */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      <Hero />
      <About />
    </>
  );
}

const App = () => {
  // Controls the Contact pop up, opened from the Navbar's Contact button
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    // flex-col + min-h-screen here together with flex-1 below is what pins the Footer to the bottom of the screen on every page
    <div className="relative flex min-h-screen flex-col">
      <div className="container mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <Navbar openContact={() => setIsContactOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;