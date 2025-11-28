"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [currency, setCurrencyState] = useState('INR');

 
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/proxy`, {
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

  const setCurrency = (newCurrency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  const getCurrencySymbol = () => {
    return currencies.find(c => c.code === currency)?.symbol || '₹';
  };

  const getCurrencyData = () => {
    return currencies.find(c => c.code === currency) || currencies[0];
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        username, 
        login, 
        logout,
        currency,
        setCurrency,
        getCurrencySymbol,
        getCurrencyData,
        currencies
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

