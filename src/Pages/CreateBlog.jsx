import React, { useState } from "react";
import { MyBlog } from "../Context/BlogContext";
import { MyAuth } from "../Context/UserContext";
import { Link } from "react-router-dom";

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
  const [selectCategory, setSelectCategory] = useState("ALL");

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

  const categories = ["ALL", ...new Set(blogs.map((blog) => blog.category))];

  const filteredBlogs =
    selectCategory === "ALL"
      ? blogs
      : blogs.filter((blog) => blog.category === selectCategory);

  return (
    <div className="p-10 bg-gradient-to-r from-slate-900 via-gray-900 to-black text-white">
      <div className="relative overflow-hidden rounded-[32px] mb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />

        <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/10">
          <div>
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-blue-300 mb-4">
              🚀 Welcome Back
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Manage Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Blog Empire
              </span>
            </h1>

            <p className="mt-5 text-slate-300 max-w-2xl text-lg">
              Create, publish and manage your articles from one beautiful
              dashboard. Track your content and grow your audience effortlessly.
            </p>

            <div className="flex gap-6 mt-8">
              <div>
                <h3 className="text-2xl font-bold">{blogs.length}</h3>
                <p className="text-gray-400 text-sm">Total Blogs</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  {new Set(blogs.map((blog) => blog.category)).size}
                </h3>
                <p className="text-gray-400 text-sm">Categories</p>
              </div>
            </div>
          </div>
          {user && (
            <button
              onClick={() => setShowModal(true)}
              className="group bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition duration-300"
            >
              <span className="group-hover:mr-2 transition-all">+</span>
              Create Blog
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-3xl" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl mb-5">
              📝
            </div>

            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Total Blogs
            </p>

            <h2 className="text-5xl font-bold mt-3">{blogs.length}</h2>

            <p className="text-blue-400 mt-2 text-sm">All published articles</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-green-500 transition-all duration-300 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/20 blur-3xl" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl mb-5">
              🚀
            </div>

            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Published
            </p>

            <h2 className="text-5xl font-bold mt-3">{blogs.length}</h2>

            <p className="text-green-400 mt-2 text-sm">Live on the platform</p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 blur-3xl" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-3xl mb-5">
              📂
            </div>

            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Categories
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {new Set(blogs.map((blog) => blog.category)).size}
            </h2>

            <p className="text-purple-400 mt-2 text-sm">Content collections</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold">Categories</h2>

            <p className="text-gray-400 mt-2">Explore blogs by category</p>
          </div>
          <div className="mt-4 md:mt-0 px-5 py-2 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-blue-400 font-semibold">{blogs.length}</span>{" "}
            Categories
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => {
            const count =
              category === "ALL"
                ? blogs.length
                : blogs.filter((blog) => blog.category === category).length;

            return (
              <div
                key={category}
                onClick={() => setSelectCategory(category)}
                className={`
          group
          cursor-pointer
          relative
          overflow-hidden
          rounded-3xl
          border
          p-6
          transition-all
          duration-300
          ${
            selectCategory === category
              ? "bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20"
              : "bg-white/5 border-white/10 hover:border-blue-500 hover:-translate-y-2"
          }
        `}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full" />

                <div
                  className={`
            w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5
            ${
              selectCategory === category
                ? "bg-white/20"
                : "bg-white/10 group-hover:bg-blue-500/20"
            }
          `}
                >
                  📚
                </div>

                <h3 className="font-semibold text-lg capitalize">{category}</h3>

                <p className="text-sm text-gray-300 mt-2">{count} Blogs</p>

                <div
                  className={`
            mt-4 h-1 rounded-full transition-all
            ${
              selectCategory === category
                ? "bg-white"
                : "bg-blue-500/30 group-hover:bg-blue-500"
            }
          `}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              {selectCategory === "All"
                ? "Latest Blogs"
                : `${selectCategory} Blogs`}
            </h2>

            <p className="text-gray-400 mt-2">
              {filteredBlogs.length} Blogs Found
            </p>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        hover:border-blue-500
        hover:-translate-y-3
        transition-all
        duration-500
      "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.images?.[0]?.url}
                    alt={blog.title}
                    className="
            w-full
            h-64
            object-cover
            group-hover:scale-110
            transition-transform
            duration-700
          "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 bg-blue-500/90 text-white px-4 py-1 rounded-full text-xs font-medium backdrop-blur-xl">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                      {blog.author?.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-medium">{blog.author?.name}</p>

                      <p className="text-xs text-gray-400">Blog Author</p>
                    </div>
                  </div>

                  <Link to={`/blogDetails/${blog._id}`}>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-gray-400 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <Link
                      to={`/blogDetails/${blog._id}`}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Read More →
                    </Link>

                    {user?._id === blog.author?._id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditBlog(blog);
                            setShowUpdateModal(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-sm transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl py-20 text-center">
            <h3 className="text-3xl font-bold">No Blogs Found</h3>

            <p className="text-gray-400 mt-3">
              No blogs available in this category.
            </p>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 backdrop-blur-xl text-white w-full max-w-4xl rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-3xl font-bold">Create Blog</h2>

              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto hide-scrollbar p-6">
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-6"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={blogData.title}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  value={blogData.author}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={blogData.category}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <input
                  type="text"
                  name="tags"
                  placeholder="React, Node, MongoDB"
                  value={blogData.tags}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <div className="md:col-span-2">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full bg-white/10 border border-dashed border-gray-600 rounded-xl p-4"
                  />
                </div>

                <div className="md:col-span-2">
                  <textarea
                    rows="8"
                    name="description"
                    placeholder="Write your blog content..."
                    value={blogData.description}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-gray-600 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
                  >
                    Publish Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 backdrop-blur-xl text-white w-full max-w-4xl rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-3xl font-bold">Update Blog</h2>

              <button
                onClick={() => setShowUpdateModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto hide-scrollbar p-6">
              <form
                onSubmit={handleUpdateSubmit}
                className="grid md:grid-cols-2 gap-6"
              >
                <input
                  type="text"
                  name="title"
                  value={editBlog.title || ""}
                  onChange={handleUpdateChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <input
                  type="text"
                  name="category"
                  value={editBlog.category || ""}
                  onChange={handleUpdateChange}
                  className="w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                <input
                  type="text"
                  name="tags"
                  value={editBlog.tags || ""}
                  onChange={handleUpdateChange}
                  className="md:col-span-2 w-full bg-white/10 border border-gray-700 rounded-xl p-4"
                />

                {editBlog.images?.[0]?.url && (
                  <div className="md:col-span-2">
                    <img
                      src={editBlog.images[0].url}
                      alt={editBlog.title}
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full bg-white/10 border border-dashed border-gray-600 rounded-xl p-4"
                  />
                </div>

                <div className="md:col-span-2">
                  <textarea
                    rows="8"
                    name="description"
                    value={editBlog.description || ""}
                    onChange={handleUpdateChange}
                    className="w-full bg-white/10 border border-gray-700 rounded-xl p-4 resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="px-6 py-3 border border-gray-600 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold"
                  >
                    Update Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
