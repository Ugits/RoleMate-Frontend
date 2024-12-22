"use client";

import { useRouter } from "next/navigation";
import { IUsername } from "../_types/IUsername";
import { useEffect, useState } from "react";

interface ButtonProps {
  title: string;
  color: string;
  loading?: boolean 
  pushPath?: string;
  username?: string;
  onClick?: () => void;
}

export const Button = ({ title, pushPath, color, username, onClick }: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  const handleClick = () => {
    if (title === "Logout") {
      sessionStorage.clear();
      const event = new Event("authChange");
      window.dispatchEvent(event);
    }

    if (title === "Delete Me") {
      // logged in?
      if (!token) {
        window.alert("Not Authenticated. Please Login");
        return;
      }
      //are u sure
      if (!window.confirm("Are you sure you want to delete this account?")) {
        return;
      }
  
      setLoading(true)

      //fetch
      fetch(`http://localhost:8080/user/delete-me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errData) => {
              alert(errData.message);
              throw new Error(errData.message);
            });
          }
          return response.json();
        })
        .then((data: IUsername) => {
          //alert user
          alert(`User ${data.username} was successfully deleted`);

          //clear storage
          sessionStorage.clear();

          //event signal
          const event = new Event("authChange");
          window.dispatchEvent(event);

          router.push("/home")
        })
        .catch((error) => {
          throw new Error("An error occurred while deleting the user.", error);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    
    if (["Delete", "Update", "Activate", "Deactivate"].includes(title)) {
      if (onClick) {
        onClick()
      }
    }
    
    if (!pushPath) return;
    router.push(`${pushPath}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{ backgroundColor: color }}
      className={`m-3 text-white px-4 py-2 rounded text-shadow-lg hover:opacity-80 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Loading..." : title}
    </button>
  );
};
