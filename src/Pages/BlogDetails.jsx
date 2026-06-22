import React, { useEffect } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MyBlog } from "../Context/BlogContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, allBlogs } = MyBlog();

  const blog = blogs.find((item) => item._id === id);

  useEffect(() => {
    allBlogs();
  }, []);

  if (!blog) {
    return (
      <p className="h-screen flex items-center justify-center">Loading....</p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={blog.images[0]?.url}
          alt="Blog"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-5xl mx-auto px-6">
            <span className="bg-indigo-600 px-4 py-1 rounded-full text-sm">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-300">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{blog.author?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl">
          <img
            src={blog.images[0].url}
            alt={blog.category}
            className="w-full rounded-2xl my-8"
          />
          {blog.description
            ?.replace(/\\n/g, "\n")
            .split("\n\n")
            .map((item, index) => {
              if (item.startsWith("# ")) {
                return (
                  <h2
                    key={index}
                    className="text-4xl font-bold text-white my-6"
                  >
                    {item.replace("# ", "")}
                  </h2>
                );
              }

              if (item.startsWith("## ")) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-semibold text-blue-400 my-4"
                  >
                    {item.replace("## ", "")}
                  </h3>
                );
              }

              return (
                <p key={index} className="text-lg text-gray-300 leading-8 mb-4">
                  {item}
                </p>
              );
            })}
        </div>
      </section>

      {/* Author Section */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              Author: <span className="font-normal">{blog.author.name}</span>
            </h3>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>{" "}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
