import React from "react";
import { FaSearch, FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";
import { MyBlog } from "../Context/BlogContext";

const Hero = () => {
  const { blogs } = MyBlog();

  const featuredBlog = blogs?.[0];

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center">
      {/* Background */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm">
            🚀 Modern Blogging Platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 leading-tight">
            Read, Learn &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Share Ideas
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Discover insightful articles on technology, business, design,
            travel, and personal growth from creators worldwide.
          </p>

          {/* Search */}
          <div className="mt-8 flex bg-white rounded-2xl overflow-hidden shadow-2xl max-w-xl">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-5 py-4 outline-none"
            />
            <button className="bg-indigo-600 px-6 text-white hover:bg-indigo-700">
              <FaSearch />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <h3 className="text-3xl font-bold text-white">{blogs.length}+</h3>
              <p className="text-gray-400">Articles</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {featuredBlog && (
          <div className="relative">
            {/* Floating Badge */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={featuredBlog.images?.[0]?.url}
                alt={featuredBlog.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-6">
                <span className="text-indigo-300 text-sm font-medium">
                  {featuredBlog.category}
                </span>

                <h2 className="text-3xl font-bold text-white mt-3">
                  {featuredBlog.title}
                </h2>

                <p className="text-gray-400 mt-4">
                  {featuredBlog.description.slice(0, 150)}...
                </p>

                <button className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white transition">
                  Read Article
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
