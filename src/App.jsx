import React, { useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { Particles } from "./components/Particles";

const App = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background Particles */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      {/* Main Page */}
      <div className="container mx-auto max-w-7xl">
        <Navbar openContact={() => setContactOpen(true)} />
        <Hero />
        <About />
        <Contact
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;