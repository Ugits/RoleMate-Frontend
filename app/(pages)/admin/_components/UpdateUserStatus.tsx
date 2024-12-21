"use client";

import { Button } from "@/app/_global-components/Button";
import { IUpdateUserStatus } from "@/app/_types/IUpdateUserStatus";
import { IUsername } from "@/app/_types/IUsername";
import { useEffect, useState } from "react";

export const UpdateUserStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<IUpdateUserStatus>({
    username: "",
    isEnabled: "",
  });
  const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setToken(sessionStorage.getItem("accessToken"));
      }
    }, []);

  const handleUpdate = () => {
    
    if (!token) {
        window.alert("Not Authenticated. Please Login");
        return;
      }
    
    if (!inputData.username.trim()) {
      alert("Please enter a username.");
      return;
    }

    if (!inputData.isEnabled.trim()) {
      alert("Please pick an action.");
      return;
    }

    // if enable === false // you want to deactivate??
    if (inputData.isEnabled === "false") {
      if (
        !window.confirm(
          `Are you sure you want to Deactivate "${inputData.username}"?`
        )
      ) {
        return;
      }
    } else {
      // if enable === true // you want to activate

      if (
        !window.confirm(
          `Are you sure you want to Activate "${inputData.username}"?`
        )
      ) {
        return;
      }
    }

    setLoading(true);

    fetch(`http://localhost:8080/admin/user/status`, {
      method: "PATCH",
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
        if (inputData.isEnabled === "false") {
          alert(`User ${data.username} was successfully Deactivated`);
        } else {
          alert(`User ${data.username} was successfully Activated`);
        }
      })
      .catch((error) => {
        console.log(
          `An error occurred while changing the status of user ${inputData.username}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 shadow-xl rounded-lg  border-rose-950 border-2 text-shadow-lg">
      <p className="mb-3">Update User Status</p>

      {/* Username Field */}
      <div className="mb-4">
        <input
          type="text"
          id="username"
          value={inputData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputData({ ...inputData, username: e.target.value })
          }
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
        />

{/* Radio Buttons for Activate/Deactivate */}
<div className="mb-4 w-full flex items-center gap-4">
        <label className="inline-flex items-center text-white">
          <input
            type="radio"
            name="enableStatus"
            value="true"
            className="form-radio"
            checked={inputData.isEnabled === "true"}
            onChange={(e) =>
              setInputData((prev) => ({
                ...prev,
                isEnabled: e.target.value,
              }))
            }
          />
          <span className="ml-2">Activate</span>
        </label>
        <label className="inline-flex items-center text-white">
          <input
            type="radio"
            name="enableStatus"
            value="false"
            className="form-radio"
            checked={inputData.isEnabled === "false"}
            onChange={(e) =>
              setInputData((prev) => ({
                ...prev,
                isEnabled: e.target.value,
              }))
            }
          />
          <span className="ml-2">Deactivate</span>
        </label>
      </div>

      </div>
      {inputData.isEnabled === "" ? (
        <Button title="Update" color="crimson" loading={loading} onClick={handleUpdate} />
      ) : inputData.isEnabled === "true" ? (
        <Button title="Activate" color="crimson" loading={loading} onClick={handleUpdate} />
      ) : (
        <Button title="Deactivate" color="crimson" loading={loading} onClick={handleUpdate} />
      )}
    </div>

  );
};
