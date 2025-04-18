import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 border-t border-gray-300">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} | Designed & Developed By{" "}
          <a
            href="#"
            className="text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
          >
            Deepak Kumar Yadav
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
