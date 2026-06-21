import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyAuth } from "../../Context/UserContext";

const Login = () => {
  const { login, userLogin, setUserLogin, setUser } = MyAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(userLogin);

      console.log("LOGIN_USER", response);

      if (response.success) {
        setUser(response.user);

        setUserLogin({
          email: "",
          password: "",
        });
        navigate("/")
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Blog<span className="text-blue-500">Hub</span>
          </h1>
          <p className="text-gray-300 mt-2">
            Sign in to continue reading and publishing blogs
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userLogin.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#" className="text-blue-400 hover:text-blue-300">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button className="w-full border border-gray-600 text-white py-3 rounded-xl hover:bg-white/10 transition">
            Continue with Google
          </button>

          <button className="w-full border border-gray-600 text-white py-3 rounded-xl hover:bg-white/10 transition">
            Continue with GitHub
          </button>
        </div>

        {/* Register */}
        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-blue-400 cursor-pointer hover:text-blue-300">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
