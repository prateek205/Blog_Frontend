import React from "react";
import { FaSearch, FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";
import { MyBlog } from "../Context/BlogContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = MyBlog();

  const featuredBlog = blogs?.[0];

  return (
    <>
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
                <h3 className="text-3xl font-bold text-white">
                  {blogs.length}+
                </h3>
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
                  <Link to={`/blogDetails/${featuredBlog._id}`}>
                    <button className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white transition">
                      Read Article
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white">Recent Blogs</h2>
              <p className="text-gray-400 mt-2">
                Explore the latest articles from our community
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 6).map((blog) => (
              <div
                key={blog._id}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={blog.images?.[0]?.url}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium">
                    {blog.category}
                  </span>

                  <p className="text-lg font-bold text-white py-3">
                    Author:{" "}
                    <span className="text-lg font-normal">
                      {blog.author.name}
                    </span>
                  </p>

                  <h3 className="text-xl font-bold text-white mt-4 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 mt-3 line-clamp-3">
                    {blog.description}
                  </p>

                  <Link to={`/blogDetails/${blog._id}`}>
                    <button className="mt-5 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium">
                      Read More
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {blogs.length > 6 && (
            <div className="text-center mt-12">
              <Link to="/blogs">
                <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-white font-medium">
                  View All Blogs
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Hero;
