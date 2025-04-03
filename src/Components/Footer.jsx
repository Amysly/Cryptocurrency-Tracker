import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center lg:text-left">
        {/* Brand Name - Larger Grid */}
        <div className="lg:col-span-3">
          <h1 className="font-bold text-green-400  sm:text-xl lg:text-3xl  cursor-pointer">
            Cryptotracker
          </h1>
        </div>

        {/* Company Section */}
        <div className="cursor-pointer">
          <h3 className="font-bold text-green-400 mt-3 mb-3 lg:text-xl sm:text-xs">Company</h3>
          <p className="text-gray-500 font-bold mb-2">Amysly</p>
          <p className="text-gray-500 font-bold mb-2">Terms and Conditions</p>
          <p className="text-gray-500 font-bold mb-2">About us</p>
          <p className="text-gray-500 font-bold mb-2">Disclaimer</p>
        </div>

        {/* Products Section */}
        <div className="cursor-pointer">
          <h3 className="font-bold text-green-400 mt-3 mb-3 lg:text-xl sm:text-xs">Products</h3>
          <p className="text-gray-500 font-bold mb-2">
            <a href='https://amyslyportfolio.netlify.app/' target="_blank" rel="noopener noreferrer">Portfolio</a>
          </p>
          <p className="text-gray-500 font-bold mb-2">Academy</p>
          <p className="text-gray-500 font-bold mb-2">
          <a href='https://github.com/Amysly' target="_blank" rel="noopener noreferrer">Github</a>
          </p>
          <p className="text-gray-500 font-bold mb-2">Cryptocoin</p>
        </div>

        {/* Social Section */}
        <div className="cursor-pointer">
          <h3 className="font-bold text-green-400 mt-3 mb-3 lg:text-xl sm:text-xs">Social</h3>
          <p className="text-gray-500 font-bold mb-2">X(Twitter)</p>
          <p className="text-gray-500 font-bold mb-2">Instagram</p>
          <p className="text-gray-500 font-bold mb-2">Facebook</p>
          <p className="text-gray-500 font-bold mb-2">
            <a href=''target="_blank" rel="noopener noreferrer">Linkedin</a>
          </p>
          
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-5">
        <h2 className="text-gray-500 font-bold">2025 Cryptotracker. All rights reserved.</h2>
      </div>
    </footer>
  );
};

export default Footer;
