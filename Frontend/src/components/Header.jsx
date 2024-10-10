import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-screen h-16 flex items-center justify-between px-5 pr-0 bg-slate-200">
      {/* Logo */}
      <div className="logo">
        <Link to='/' className="font-bold text-3xl uppercase font-mono">
          Eco<span className="font-mono font-thin text-2xl">Emission</span>
        </Link>
      </div>

      {/* Full navigation for larger screens */}
      <div id="navlinks" className="hidden md:flex w-2/6 justify-evenly items-center text-lg">
        <Link to="/about" className="">About Us</Link>
        <Link to="/check" className="">CO2 Emission</Link>
        <Link to="/guide" className="">Guidelines</Link>
        <Link to="/user" className="bg-[url('/images/user.png')] bg-cover border-[1px] border-black rounded-full w-12 h-12"></Link>
      </div>

      {/* Hamburger icon for mobile screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (hamburger) */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-200 flex flex-col px-5 space-y-4 py-4 z-50 md:hidden">
          <Link to="/about" className="text-lg w-full" onClick={toggleMenu}>About Us</Link>
          <Link to="/check" className="text-lg w-full" onClick={toggleMenu}>CO2 Emission</Link>
          <Link to="/guide" className="text-lg w-full" onClick={toggleMenu}>Guidelines</Link>
          <Link to="/user" className="w-full" onClick={toggleMenu}>
            <div className="bg-[url('/images/user.png')] bg-cover w-12 h-12 rounded-full border-[1px] border-black"></div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
