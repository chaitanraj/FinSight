"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currency, setCurrencyState] = useState("INR");

  useEffect(() => {
    const saved = localStorage.getItem("preferredCurrency");
    if (saved) setCurrencyState(saved);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
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
        login,
        logout,
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
