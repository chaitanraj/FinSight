"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AuthContext } from "@/context/AuthContext";

const page = () => {
  const [activeItem, setactiveItem] = useState('');
  const navItems = ["About", "Contact", "DashBoard"];
  const navRef = useRef(null);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, username, login, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const handleLogout=()=>{

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setactiveItem("");
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div>
      <div className='flex justify-center'>
        <div className='border-b text-md font-normal border-emerald-700/30 bg-zinc-800/60 backdrop-blur-sm mt-[5vh] h-[8vh] w-[150vh] rounded-3xl shadow-lg shadow-emerald-500/5 transition-all duration-300 hover:shadow-emerald-500/10'>
          <div className="flex items-center h-full justify-between text-white px-6">
            <div className='flex items-center h-full'>
              <Link href="/" className='cursor-pointer'>
                <img
                  src={"/logo.png"}
                  alt="FinSight Logo"
                  className='h-25 w-auto object-contain transition-transform duration-300 hover:scale-105'
                  width={120}
                  height={70}
                />
              </Link>
            </div>
            <div className="flex gap-4">
              {navItems.map((item, index) => (
                <Link
                  href={`/${item}`}
                  key={index}
                  ref={navRef}
                  onClick={(e) => {
                    setactiveItem(item);
                  }}
                  className={`relative overflow-hidden group transition-all duration-300 ${activeItem === item
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 rounded-2xl px-4 py-2.5 border border-gray-700/50 shadow-xl shadow-emerald-500/20"
                    : "text-white px-4 py-2.5 hover:text-emerald-400"
                    }`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeItem !== item && (
                    <span className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                  {activeItem === item && (
                    <>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 animate-pulse"></span>
                      <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl animate-pulse"></span>
                    </>
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center h-full">
              {!isLoggedIn ? (
                <button className="relative px-6 py-2.5 bg-gradient-to-r cursor-pointer from-emerald-600 to-emerald-700 rounded-xl font-medium overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95">
                  <Link href="/Signup" className='cursor-pointer'>
                    <span className="relative z-10">Login/Signup</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Link>
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105"
                  >
                    <span>{username}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition-colors duration-200 text-gray-700 hover:text-emerald-700"
                      >
                        <Compass className="w-4 h-4" />
                        <span className="font-medium">Explore</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-600 border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
