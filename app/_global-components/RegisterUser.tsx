"use client";

import { ISignupRequest } from "@/app/_types/IRegisterRequest";
import { ISignupResponse } from "@/app/_types/ISignupResponse";
import { BASE_URL } from "@/variable.env";
import { useEffect, useState } from "react";

interface RegisterUserProps {
  onRegisterUserSuccess?: () => void;
  role: string;
}

export const RegisterUser = ({
  onRegisterUserSuccess,
  role,
}: RegisterUserProps) => {
  const [user, setUser] = useState<ISignupRequest>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const dynamicRole = role;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    {
      if (dynamicRole === "admin") {
        fetch(`${BASE_URL}/${dynamicRole}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errData) => {
                setError(errData.message || "Signup failed. Please try again.");
                throw new Error(errData.message);
              });
            }
            return response.json();
          })
          .then((data: ISignupResponse) => {
            alert("Account created successfully!");
            if (onRegisterUserSuccess) onRegisterUserSuccess();
          })
          .catch((err) => {
            setError(err.message || "An error occurred. Please try again.");
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        fetch(`${BASE_URL}/${dynamicRole}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errData) => {
                setError(errData.message || "Signup failed. Please try again.");
                throw new Error(errData.message);
              });
            }
            return response.json();
          })
          .then((data: ISignupResponse) => {
            alert("Account created successfully!");
            if (onRegisterUserSuccess) onRegisterUserSuccess();
          })
          .catch((err) => {
            setError(err.message || "An error occurred. Please try again.");
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 shadow-xl rounded-lg  border-rose-950 border-2 text-shadow-lg">
      <p className="mb-3">Create {role}</p>
      <form onSubmit={handleSignup}>
        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-2" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        {/* Username Field */}
        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, username: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, password: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading
              ? "bg-gray-400 text-shadow-lg"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold text-shadow-lg`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
