import React, { useState } from "react";
import { MyBlog } from "../Context/BlogContext";
import { MyAuth } from "../Context/UserContext";

const CreateBlog = () => {
  const { blogs, postBlog, updateBlog, deleteBlog, allBlogs } = MyBlog();
  const { user } = MyAuth();
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    category: "",
    tags: "",
    description: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [editBlog, setEditBlog] = useState({});

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Image Size:", image?.size / 1024 / 1024, "MB");
    console.time("BLOG_UPLOAD");

    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("author", blogData.author);
    formData.append("category", blogData.category);
    formData.append("tags", blogData.tags);
    formData.append("description", blogData.description);
    formData.append("images", image);

    const response = await postBlog(formData);

    console.timeEnd("BLOG_UPLOAD");

    if (response) {
      setShowModal(false);
      setBlogData({
        title: "",
        author: "",
        category: "",
        tags: "",
        description: "",
      });
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditBlog({
      ...editBlog,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", editBlog.title);
    formData.append("category", editBlog.category);
    formData.append("tags", editBlog.tags);
    formData.append("description", editBlog.description);
    if (image) {
      formData.append("images", image);
    }

    const response = await updateBlog(editBlog._id, formData);
    if (response) {
      await allBlogs();
      setShowUpdateModal(false);
      setEditBlog({
        title: "",
        author: "",
        category: "",
        tags: "",
        description: "",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete the blog ?",
    );

    if (!confirmDelete) return;

    const response = await deleteBlog(id);

    if (response.success) {
      alert("Blog delete successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold">
              Blog <span className="text-blue-500">Dashboard</span>
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your blogs and create new content
            </p>
          </div>

          {user&& (
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              + Create Blog
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <p className="text-gray-400">Total Blogs</p>
            <h2 className="text-4xl font-bold mt-2">{blogs.length}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <p className="text-gray-400">Published</p>
            <h2 className="text-4xl font-bold mt-2">{blogs.length}</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <p className="text-gray-400">Categories</p>
            <h2 className="text-4xl font-bold mt-2">
              {new Set(blogs.map((blog) => blog.category)).size}
            </h2>
          </div>
        </div>

        {/* Blog Grid */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Your Blogs</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden hover:scale-105 transition duration-300"
              >
                <img
                  src={blog.images?.[0]?.url}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                    {blog.category}
                  </span>

                  <h3 className="text-xl font-bold mt-3">{blog.title}</h3>

                  <p className="text-gray-400 text-sm mt-2">
                    By {blog.author?.name}
                  </p>

                  <p className="text-gray-300 mt-4 line-clamp-3">
                    {blog.description}
                  </p>

                  {user?._id === blog.author?._id && (
                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => {
                          setEditBlog(blog);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-xl font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-xl font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 backdrop-blur-xl text-white w-full h-full max-w-4xl rounded-3xl shadow-2xl overflow-y-auto hide-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 p-6">
              <div>
                <h2 className="text-3xl font-bold">Update Blog</h2>

                <p className="text-gray-400 mt-1">
                  Edit and update your blog content
                </p>
              </div>

              <button
                onClick={() => setShowUpdateModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition duration-300"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateSubmit}
              className="grid md:grid-cols-2 gap-6 p-6"
            >
              {/* Title */}
              <input
                type="text"
                name="title"
                value={editBlog.title || ""}
                onChange={handleUpdateChange}
                placeholder="Blog Title"
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* Author */}
              <input
                type="text"
                name="author"
                value={editBlog.author.name || ""}
                onChange={handleUpdateChange}
                placeholder="Author Name"
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* Category */}
              <input
                type="text"
                name="category"
                value={editBlog.category || ""}
                onChange={handleUpdateChange}
                placeholder="Category"
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* Tags */}
              <input
                type="text"
                name="tags"
                value={editBlog.tags || ""}
                onChange={handleUpdateChange}
                placeholder="React, Node, MongoDB"
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* Current Image Preview */}
              {editBlog.images?.[0]?.url && (
                <div className="md:col-span-2">
                  <label className="block mb-3 text-gray-300">
                    Current Cover Image
                  </label>

                  <img
                    src={editBlog.images[0].url}
                    alt={editBlog.title}
                    className="w-full h-56 object-cover rounded-2xl border border-white/20"
                  />
                </div>
              )}

              {/* Upload New Image */}
              <div className="md:col-span-2">
                <label className="block mb-3 text-gray-300">
                  Upload New Cover Image
                </label>

                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg-white/10 border border-dashed border-gray-600 rounded-xl p-4 text-gray-400"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <textarea
                  rows="6"
                  name="description"
                  value={editBlog.description || ""}
                  onChange={handleUpdateChange}
                  placeholder="Update your blog description..."
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Footer */}
              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-white/10 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold transition"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 backdrop-blur-xl text-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 p-6">
              <div>
                <h2 className="text-3xl font-bold">Create New Blog</h2>
                <p className="text-gray-400 mt-1">
                  Share your thoughts with the world
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6 p-6"
            >
              <input
                type="text"
                name="title"
                placeholder="Blog Title"
                value={blogData.title}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={blogData.author.name}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={blogData.category}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="tags"
                placeholder="React, Node, MongoDB"
                value={blogData.tags}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">
                  Upload Cover Image
                </label>

                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full bg-white/10 border border-dashed border-gray-600 rounded-xl p-4 text-gray-400"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <textarea
                  rows="6"
                  name="description"
                  placeholder="Write your blog description..."
                  value={blogData.description}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Footer Buttons */}
              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border border-gray-600 hover:bg-white/10 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
