import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = (props) => {


  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true
      });

      if (res.data.success) {
        setUserData(res.data.userData);
        setIsLoggedin(true);
      } else {
        console.log('Server response:', res.data.message);
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", {
        message: error.message,
        response: error.response?.data
      });
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth', {
        withCredentials: true
      });
      if (data.success) {
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
      console.error("Auth check failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    loading
  };

  return (
    <AppContent.Provider value={value}>
      {!loading && props.children}
    </AppContent.Provider>
  );
};