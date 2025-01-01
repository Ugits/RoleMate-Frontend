"use client";

import { Button } from "@/app/_global-components/Button";
import { IUsername } from "@/app/_types/IUsername";
import { BASE_URL } from "@/variable.env";
import { useEffect, useState } from "react";

export const DeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setFormData] = useState<IUsername>({ username: "" });
   const [token, setToken] = useState<string | null>(null);
   
     useEffect(() => {
       if (typeof window !== "undefined") {
         setToken(sessionStorage.getItem("accessToken"));
       }
     }, []);

  const handleDeletion = () => {
    
    if (!token) {
      window.alert("Not Authenticated. Please Login");
      return;
    }
    
    if (!inputData.username.trim()) {
      alert("Please enter a username.");
      return;
    }

    if (
      !window.confirm(`Are you sure you want to delete "${inputData.username}"?`)
    ) {
      return;
    }

    setLoading(true);

    fetch(`${BASE_URL}/admin/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
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
        alert(`User ${data.username} was successfully deleted`);
      })
      .catch((error) => {
        console.log("An error occurred while deleting the user.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 shadow-xl rounded-lg  border-rose-950 border-2 text-shadow-lg">
      <p className="mb-3">Delete User</p>

      {/* Username Field */}
      <div className="mb-4">
        <input
          type="text"
          id="username"
          value={inputData.username}
          onChange={(e) => setFormData({ username: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
        />
      </div>
      <Button title="Delete" color="crimson" loading={loading} onClick={handleDeletion} />
    </div>
  );
};
