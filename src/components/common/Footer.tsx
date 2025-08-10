import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto px-4 flex justify-end py-4 border-t border-dashed">
      <p className="font-heading text-white/70">{currentYear} @ elixirlabs</p>
    </footer>
  );
};

export default Footer;
