import React from "react";
import github from "../assets/github.png"
import email from "../assets/email.png";
const Footer = () => {
  return (
    <>
      <footer id="contact" className="bg-blue-800 text-white py-12">
        <div className="container mx-auto text-center px-4">
          <p className="mb-6">Developed by [Your Name]</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-75 transition"
            >
              <img
                src={github}
                alt="GitHub Icon"
                className="w-[6vh] rounded-full"
              />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="hover:opacity-75 transition"
            >
              <img src={email} alt="Email Icon" className="w-[6vh] " />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
