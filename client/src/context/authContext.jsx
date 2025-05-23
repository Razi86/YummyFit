import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../config";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successLoggedIn, setSuccessLoggedIn] = useState(false);
  const [successRegistered, setSuccessRegistered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    localStorage.setItem("popupClosed", "true");
  };

  const handleChange = (e) => {
    setUser(prevUser => ({
      ...(prevUser || {}), 
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ORIGIN_URL}/users/register`, {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        image: user.image,
      });
      setError(null);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${ORIGIN_URL}/users/login`,
        {
          email: user.email,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setSuccessLoggedIn(true);
      setError(null);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${ORIGIN_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setSuccessLoggedIn(false);
      setError(null);
      localStorage.removeItem("popupClosed");
      navigate("/login");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

useEffect(() => {
  const checkSession = async () => {
      try {
        const res = await axios.get(`${ORIGIN_URL}/users/check-session`, {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          setUser(res.data.user);
          setSuccessLoggedIn(true);
        } else {
          setUser(null);
          setSuccessLoggedIn(false);
        }
        setSessionLoading(false);
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
        setSessionLoading(false);
      }
    };
  checkSession();
}, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          sessionLoading,
          error,
          setError,
          handleChange,
          handleLogin,
          handleLogout,
          handleRegister,
          successLoggedIn,
          setSuccessLoggedIn,
          successRegistered,
          setSuccessRegistered,
          navigate,
          handleClosePopup,
          isPopupOpen,
          setIsPopupOpen,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthContextProvider;
