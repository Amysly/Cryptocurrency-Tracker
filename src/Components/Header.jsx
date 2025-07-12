import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 
import React, { useState, useEffect } from "react";

const getLinkClass = ({ isActive }) => 
  isActive
    ? "text-green-400 font-serif sm:text-lg lg:text-2xl px-4 py-3 rounded-md"
    : "text-white font-serif sm:text-lg lg:text-2xl";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navVisibility, setNavVisibility] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavVisibility(window.scrollY <= 645);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-black bg-opacity-50 p-2 fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        navVisibility ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-400 font-serif text-lg sm:text-2xl lg:text-3xl">
          <NavLink to="/">Cryptotracker</NavLink>
        </div>

        <button
          className="text-white text-3xl lg:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`${isOpen ? "flex opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"} 
          absolute top-full left-0 w-full bg-gray-900 flex-col items-center space-y-2
          p-4 transition-all duration-300 ease-in-out lg:flex lg:opacity-100 lg:translate-y-0 
          lg:static lg:w-auto lg:bg-transparent lg:flex-row lg:space-y-0 lg:space-x-4 lg:p-0`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => `${getLinkClass({ isActive })} hover:text-green-400 w-full text-center pb-2 border-b border-white border-opacity-20 lg:border-b-0 lg:w-auto`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/losers"
            className={({ isActive }) => `${getLinkClass({ isActive })} hover:text-green-400 w-full text-center pb-2 border-b border-white border-opacity-20 lg:border-b-0 lg:w-auto`}
            onClick={() => setIsOpen(false)}
          >
            Losers
          </NavLink>

          <NavLink
            to="/gainers"
            className={({ isActive }) => `${getLinkClass({ isActive })} hover:text-green-400 w-full text-center pb-2 border-b border-white border-opacity-20 lg:border-b-0 lg:w-auto`}
            onClick={() => setIsOpen(false)}
          >
            Gainers
          </NavLink>

          <NavLink
            to="/trendingcoins"
            className={({ isActive }) => `${getLinkClass({ isActive })} hover:text-green-400 w-full text-center pb-2 lg:border-b-0 lg:w-auto`}
            onClick={() => setIsOpen(false)}
          >
            Trending Coins
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;