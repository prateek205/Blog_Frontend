import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { MyAuth } from "../Context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const {user, handleLogout } = MyAuth();

  return (
    <section className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
            B
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-black">
            Blog<span className="text-orange-500">Hub</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link to="/">
            <li className="hover:text-indigo-600 transition-all duration-300">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="hover:text-indigo-600 transition-all duration-300">
              About
            </li>
          </Link>

          <Link to="/blog">
            <li className="hover:text-indigo-600 transition-all duration-300">
              Blog
            </li>
          </Link>

          <Link to="/contact">
            <li className="hover:text-indigo-600 transition-all duration-300">
              Contact
            </li>
          </Link>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <Link to="/profile">
              <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 transition-all duration-300">
                Profile
              </button>
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 text-gray-700 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <li>Home</li>
          </Link>

          <Link to="/about" onClick={() => setIsOpen(false)}>
            <li>About</li>
          </Link>

          <Link to="/blog" onClick={() => setIsOpen(false)}>
            <li>Blog</li>
          </Link>

          <Link to="/contact" onClick={() => setIsOpen(false)}>
            <li>Contact</li>
          </Link>
        </ul>

        <div className="flex flex-col gap-3 px-6 mt-5">
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <button className="w-full py-2 rounded-full border border-indigo-600 text-indigo-600">
              Login
            </button>
          </Link>

          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <button className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
