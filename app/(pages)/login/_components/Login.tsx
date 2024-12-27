"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "../../../_types/IUser";
import { IAuthResponse } from "../../../_types/IAuthResponse";

const Login = () => {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errData) => {
            setError("Invalid username or password.");
            throw new Error(errData.message);
          });
        }
        
        return response.json();
      })
      .then((data: IAuthResponse) => {
        const { token, role } = data;

        if (!token) {
          setError("No token received from server.");
          return;
        }

        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("role", role);

        const event = new Event("authChange")
        window.dispatchEvent(event)

        role.match("USER") && router.push("/user");
        role.match("ADMIN") && router.push("/admin");


      })
      .catch((error) => {
        console.log(error);
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again. ABORT");
        } else {
          setError(error.message || "An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col items-center p-4 bg-slate-900 shadow-xl rounded-lg  border-rose-950 border-2 text-shadow-lg">

      <form onSubmit={handleSubmit} className="w-full max-w-sm text-shadow-lg">
        <div className="flex flex-col space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Enter your username"
              aria-label="Username"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Enter your password"
              aria-label="Password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring text-sky-950"
            />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-6">
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${loading
                ? "bg-gray-400 cursor-not-allowed text-shadow-lg"
                : "bg-blue-500 hover:bg-blue-600 text-white text-shadow-lg"
              }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login
