"use client";
import { useState } from "react";
import { Button } from "@/app/_global-components/Button";
import { RegisterUser } from "./_global-components/RegisterUser";

const page = () => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const handleToggleSignupForm = () => {
    setShowRegisterForm((prev) => !prev);
  };

  const handleSignupSuccess = () => {
    setShowRegisterForm(false);
  };

  return (
    <main className="flex flex-col items-center justify-center pt-20 ">
      <div className="bg-black rounded-md p-4 bg-opacity-50">
        <div className="text-center text-shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to RoleMate</h1>
          <p className="text-base mb-4">
            Please log in to access your account details.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="">No Account...?</p>
          {/* Create New Account Button */}
          <div onClick={handleToggleSignupForm}>
            {showRegisterForm ? (
              <Button title="Hide Register Form" color="darkolivegreen" />
            ) : (
              <Button title="Create New Account" color="darkolivegreen" />
            )}
          </div>
        </div>
      </div>
      <div>
        {/* Signup Form */}
        {showRegisterForm && (
          <div className="mt-6 w-full max-w-md">
            <RegisterUser
              onRegisterUserSuccess={handleSignupSuccess}
              role="user"
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
