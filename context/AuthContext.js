"use client";

import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currency, setCurrencyState] = useState("INR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredCurrency");
    if (saved) setCurrencyState(saved);
  }, []);

  // Make verifyAuth a reusable function
  const verifyAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy", {
        method: "GET",
        credentials: "include",
      });
      
      if (res.status === 401) {
        setUser(null);
        setIsLoggedIn(false);
        console.log("❌ User not authenticated (401)");
        return false;
      }
      
      if (res.ok) {
        const data = await res.json();
        if (data.loggedIn) {
          setUser({ id: data.id, name: data.name });
          setIsLoggedIn(true);
          console.log("✅ User authenticated:", data.name);
          return true;
        } else {
          setUser(null);
          setIsLoggedIn(false);
          console.log("❌ User not authenticated");
          return false;
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        console.log("❌ Auth check failed:", res.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Auth verification error:", error);
      setUser(null);
      setIsLoggedIn(false);
      return false;
    } finally {
      setIsAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    console.log(" User logged in:", userData.name);
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("✅ User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const setCurrency = (newCurrency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const getCurrencySymbol = () =>
    currencies.find((c) => c.code === currency)?.symbol || "₹";

  const getCurrencyData = () =>
    currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAuthChecking,
        login,
        logout,
        verifyAuth,
        currency,
        setCurrency,
        getCurrencySymbol,
        getCurrencyData,
        currencies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
