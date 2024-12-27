"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./Button";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleAuthChange = () => {
      const token = sessionStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleTitleOnClick = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };


  return (
    <header className="bg-slate-950 text-gray-100 shadow-2xl">
      <div className="flex items-center py-4 px-6">
        {/* Left Spacer */}
        <div className="w-1/4"></div>
  
        {/* Title Centered */}
        <div className="w-2/4 flex justify-center">
          <h1
            className="text-4xl font-bold m-4 cursor-pointer hover:text-slate-600 text-shadow-lg"
            onClick={handleTitleOnClick}
          >
            RoleMate
          </h1>
        </div>
  
        {/* Buttons on the Right */}
        <div className="w-1/4 flex justify-end items-end space-x-4">
          {isLoggedIn ? (
            <div className="flex flex-row items-end">
              <Button title="Dashboard" pushPath="/dashboard" color="indigo"/>
              <Button title="Logout" pushPath="/" color="crimson"/>
            </div>
          ) : (
            <Button title="Login" pushPath="/login" color="darkolivegreen"/>
          )}
        </div>
      </div>
    </header>
  );
}

