"use client";

import { Button } from "@/app/_global-components/Button";
import { IUsername } from "@/app/_types/IUsername";
import { useState } from "react";

export const DeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldData, setFormData] = useState<IUsername>({ username: "" });
    const token = sessionStorage.getItem("accessToken")

  const handleDeletion = () => {
    if (!fieldData.username.trim()) {
      alert("Please enter a username.");
      return;
    }

    if (
      !window.confirm(`Are you sure you want to delete "${fieldData.username}"?`)
    ) {
      return;
    }

    setLoading(true);

    fetch(`http://localhost:8080/admin/user/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fieldData),
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
          value={fieldData.username}
          onChange={(e) => setFormData({ username: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
        />
      </div>
      <Button title="Delete" color="crimson" onClick={handleDeletion} />
    </div>
  );
};
