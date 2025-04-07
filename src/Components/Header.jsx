import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navVisibility, setNavVisibility] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 645) {
        setNavVisibility(false);
      } else {
        setNavVisibility(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LinkClass = ({ isActive }) =>
    isActive
      ? "text-green-400 font-serif sm:text-lg lg:text-2xl px-4 py-3 rounded-md"
      : "text-white font-serif sm:text-lg lg:text-2xl";

  return (
    <nav
      className={`bg-black bg-opacity-50 p-2 fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        navVisibility ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-green-400 font-serif sm:text-2xl lg:text-3xl">
        <NavLink to ="/">Cryptotracker</NavLink>
        </div>

        <button
          className="text-white text-3xl lg:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`space-x-4 ${isOpen ? "flex" : "hidden"} 
          absolute top-full right-0 w-[180px] bg-gray-900 flex-col items-center 
          p-[10px] transition-all ease-out duration-[550ms] lg:flex lg:static lg:w-auto 
          lg:bg-transparent lg:flex-row lg:p-0`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => `${LinkClass({ isActive })} hover:text-green-400`}
          >
            Home
          </NavLink>

          <NavLink
            to="/losers"
            className={({ isActive }) => `${LinkClass({ isActive })} hover:text-green-400`}
          >
            Losers
          </NavLink>

          <NavLink
            to="/market-trends"
            className={({ isActive }) => `${LinkClass({ isActive })} hover:text-green-400`}
          >
            Gainers
          </NavLink>

          <NavLink
            to="/trendingcoins"
            className={({ isActive }) => `${LinkClass({ isActive })} hover:text-green-400`}
          >
            Trending Coins
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
