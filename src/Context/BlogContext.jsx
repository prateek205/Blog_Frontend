import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { toast } from "react-toastify";

export const MyBlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BLOG_URL;

  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);

  //   GET ALL BLOGS
  const allBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/getAllBlogs`);
      setBlogs(data.blogs);
      console.log("ALL_BLOGS", data.blogs);
    } catch (error) {
      console.log(error.response || error.message);
    }
  };

  useEffect(() => {
    allBlogs();
  }, []);

  const getMyBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/myBlogs`, {
        withCredentials: true,
      });

      setMyBlogs(data.blogs);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  //   CREATE BLOG
  const postBlog = async (newBlog) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/createBlog`, newBlog, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBlogs((prev) => [data.blog, ...prev]);

      console.log("BLOG:", data);
      toast.success("Blog Post Successfully!!!",data)
      return data;
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // UPDATE BLOG
  const updateBlog = async (id, newBlog) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/updateBlog/${id}`,
        newBlog,
        {
          withCredentials: true,
        },
      );

      toast.success("Blog Updated!!!",data)
      return data;
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  //   DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/delBlog/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }

      toast.success("Blog Deleted Successfully!!!",data)
      return data;
      console.log("DATA_REMOVED", data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <MyBlogContext.Provider
      value={{
        blogs,
        setBlogs,
        allBlogs,
        postBlog,
        updateBlog,
        deleteBlog,
        myBlogs,
        getMyBlogs,
      }}
    >
      {children}
    </MyBlogContext.Provider>
  );
};

export const MyBlog = () => useContext(MyBlogContext);
