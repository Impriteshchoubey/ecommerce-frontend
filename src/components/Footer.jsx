import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text */}
        <p className="text-center md:text-left text-sm md:text-base">
          © {new Date().getFullYear()} eBazaar. All rights reserved. <br className="md:hidden" />
          Designed & Developed by <span className="text-indigo-500 font-semibold">Pritesh Chaturvedi</span>
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/impriteshchoubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/impriteshchoubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://instagram.com/impriteshchoubey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-500 transition-colors duration-200"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="bg-gray-800 h-[1px] w-full mt-4"></div>
    </footer>
  );
};

export default Footer;
