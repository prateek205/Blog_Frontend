import React, { useEffect, useState } from "react";
import { MyAuth } from "../../Context/UserContext";
import { MyBlog } from "../../Context/BlogContext";

const Profile = () => {
  const { user, handleLogout, updateProfile } = MyAuth();
  const { myBlogs, getMyBlogs } = MyBlog();

  const [showEditModal, setShowEditModal] = useState(false);

  const [editProfile, setEditProfile] = useState({
    username: "",
    email: "",
    bio: "",
    profilePic: "",
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const response = await updateProfile({
      name: editProfile.username,
      email: editProfile.email,
      bio: editProfile.bio,
    });

    if (response?.success) {
      setShowEditModal(false);
    }
  };

  const openEditModal = () => {
    setEditProfile({
      username: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      profilePic: user?.profilePic || "",
    });

    setShowEditModal(true);
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=200`}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white">{user?.name}</h1>

              <p className="text-blue-400 text-lg mt-2">MERN Stack Developer</p>

              <p className="text-gray-300 mt-4 max-w-2xl">{user?.bio}</p>

              <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
                  React.js
                </span>

                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Node.js
                </span>

                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                  MongoDB
                </span>

                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm">
                  Tailwind CSS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center">
            <h2 className="text-3xl font-bold text-white">{myBlogs.length}</h2>
            <p className="text-gray-300 mt-2">Blogs Published</p>
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Blogs</h2>

          <div className="space-y-4">
            {myBlogs?.length > 0 ? (
              myBlogs?.slice(0, 3).map((blog) => (
                <div key={blog._id} className="bg-white/5 p-4 rounded-xl">
                  <h3 className="text-white font-semibold">{blog.title}</h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Published on{" "}
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <h3 className="text-2xl font-semibold text-white">
                  No Blogs Yet
                </h3>

                <p className="text-gray-400 mt-2">
                  You haven't published any blogs yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={openEditModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Edit Profile
            </h2>

            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img
                  src={
                    editProfile.profilePic ||
                    `https://ui-avatars.com/api/?name=${editProfile.username}`
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
                />

                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                  📷
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleProfileUpdate}>
              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={editProfile.username}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      username: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Bio</label>
                <textarea
                  rows="4"
                  value={editProfile.bio}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      bio: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
