import { mySocials } from "../constants";

const Footer = () => {
  return (
    // Footer 
    <footer className="flex flex-wrap items-center justify-between gap-5 pt-0 pb-3 px-5 md:px-10 text-sm text-neutral-400">
      <div className="w-full h-px mb-2 bg-linear-to-r from-transparent via-neutral-700 to-transparent" />

      {/* Text that dont do anything */}
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      {/* Icons */}
      <div className="flex gap-3">
        {mySocials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={social.icon}
              alt={social.name}
              className="w-5 h-5"
            />
          </a>
        ))}
      </div>
      
      {/* I made up some copyright stuff */}
      <p>© 2026 Jake DeRoma. All rights reserved.</p>
    </footer>
  );
};

export default Footer;