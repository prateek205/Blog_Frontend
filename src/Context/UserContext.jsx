import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_USER_URL;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);

  const signUp = async (userData) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, userData);

      setUserData(data);

      console.log("USER:", data);

      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const login = async (userLogin) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, userLogin, {
        withCredentials: true,
      });

      setUserLogin(data.user);
      await getProfile();
      console.log("USER:", data.user);

      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    console.log("GET PROFILE RUNNING");
    try {
      const { data } = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      console.log("PROFILE SUCCESS", data);
      setUser(data.user);
    } catch (error) {
      console.log("PROFILE ERROR:", error.response?.status);
      if (error.response?.status === 401) {
        setUser(null);
        return;
      }
      console.error(error);
    } finally {
      setLoading(false); // Done checking
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/updateUser`, profileData, {
        withCredentials: true,
      });
      if (data.success) {
        console.log("UPDATED USER:", data.user);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div>Loading session...</div>; // Or a nice spinner
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        signUp,
        login,
        userLogin,
        setUserLogin,
        handleLogout,
        user,
        setUser,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const MyAuth = () => useContext(AuthContext);
