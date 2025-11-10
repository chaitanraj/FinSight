"use client";

import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-user`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
          setUsername(data.name);
        }
      } catch (error) {
        console.error("AuthContext Error:", error);
      }
    };

    verifyLogin();
  }, []);

  const login = (userData) => {
    setUsername(userData.name);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        console.log("Logout successful");
      } else {
        console.log("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// optional custom hook
// export const useAuth = () => useContext(AuthContext);
