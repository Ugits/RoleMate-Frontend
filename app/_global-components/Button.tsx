"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IUsername } from "../_types/IUsername";

interface ButtonProps {
  title: string;
  color: string;
  pushPath?: string;
  username?: string;
}

export const Button = ({ title, pushPath, color, username }: ButtonProps) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const token = sessionStorage.getItem("accessToken");

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
      const confirmed = window.confirm(
        "Are you sure you want to delete this account?"
      );

      if (!confirmed) {
        return;
      }

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
        })
        .catch((error) => {
          throw new Error("An error occurred while deleting the user.", error);
        });
      return;
    }

    if (!pushPath) return;
    router.push(`${pushPath}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: color }}
      className={`m-3 text-white px-4 py-2 rounded text-shadow-lg hover:opacity-80`}
    >
      {title}
    </button>
  );
};
