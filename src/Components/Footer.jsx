import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Blog<span className="text-orange-500">Hub</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Discover insightful articles, trending stories, and expert
              opinions from writers around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer">
                Technology
              </li>
              <li className="hover:text-orange-400 cursor-pointer">
                Lifestyle
              </li>
              <li className="hover:text-orange-400 cursor-pointer">Travel</li>
              <li className="hover:text-orange-400 cursor-pointer">Business</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer">Home</li>
              <li className="hover:text-orange-400 cursor-pointer">Blogs</li>
              <li className="hover:text-orange-400 cursor-pointer">Authors</li>
              <li className="hover:text-orange-400 cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>

            <p className="text-gray-400 mb-4">
              Get the latest articles delivered to your inbox.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-l-lg bg-gray-800 outline-none"
              />
              <button className="bg-orange-500 px-4 rounded-r-lg hover:bg-orange-600 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2026 BlogHub. All Rights Reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
