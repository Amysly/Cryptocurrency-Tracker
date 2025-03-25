import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; 

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button 
      onClick={scrollToTop} 
      className={`scroll-up-button bg-green-400 hover:bg-green-300 ${isVisible ? "show" : ""}`}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollUpButton;
