"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currency, setCurrencyState] = useState('INR');
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [expenses,setExpenses]=useState([])
 
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
          setUser(data);
          setIsLoggedIn(true);
          fetchExpensesForUser(data.id);
        }
      } catch (error) {
        console.error("AuthContext Error:", error);
      } finally {
        setIsAuthChecking(false);
      }
    };

    verifyLogin();
  }, []);

  // ADD this new function BEFORE getexpense():
  async function fetchExpensesForUser(userId) {
    if (!userId) {
      setExpenses([]);
      return [];
    }

    try {
      const res = await fetch(`/api/get-expense?userId=${userId}`);
      if (!res.ok) return null;
      const data = await res.json();
      setExpenses(data);
      return data;
    } catch (err) {
      console.log("Error fetching expenses:", err);
      return null;
    }
  }

  async function getexpense() {
    if (!user?.id || !isLoggedIn) {
      console.log("No user logged in");
      setExpenses([]);
      return [];
    }

    return fetchExpensesForUser(user.id);
  }

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);

    if (userData.id) {
      fetchExpensesForUser(userData.id);
    }
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
      setUser(null);
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
        login, 
        logout,
        user,
        currency,
        setCurrency,
        getCurrencySymbol,
        getCurrencyData,
        currencies,
        expenses,
        getexpense,
        isAuthChecking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

