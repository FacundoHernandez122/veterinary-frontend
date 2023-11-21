import { useState, useEffect, createContext } from "react";
import axiosURL from "../config/axios";
import { redirect } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosURL("/vets/profile", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLoading(false);
    };
    authenticateUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
  };

  const updateProfile = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/vets/profile/${datos._id}`;
      const { data } = await axiosURL.put(url, datos, config);
      return {
        msg: "Saved Succefully",
      };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };

  const savePassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/vets/change-password";
      const { data } = await axiosURL.put(url, datos, config);
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, logOut, updateProfile, savePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
