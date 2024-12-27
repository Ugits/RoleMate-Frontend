"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICharacterID } from "@/app/_types/ICharacterID";

interface ICharacter {
  id: number;
  name: string;
  level: number;
}

interface CharacterSheetProps {
  characterId: ICharacterID;
}

const CharacterSheet = ({ characterId }: CharacterSheetProps) => {
  const router = useRouter();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        alert("You must be logged in to view character details.");
        setLoading(false);
        router.push("/login");
        return;
      }

      fetch("http://localhost:8080/character/fetch", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(characterId),
      })
        .then((response) => {
          if (response.status === 401) {
            router.push("/login");
            throw new Error("Unauthorized");
          }
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(
                errorData.message || "Failed to fetch character."
              );
            });
          }
          return response.json();
        })
        .then((data: ICharacter) => {
          setCharacter(data);
          setError(null);
        })
        .catch((err: Error) => {
          if (err.message !== "Unauthorized") {
            setError(err.message);
          }
          setCharacter(null);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCharacter();
  }, [characterId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="ml-2">Loading character...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!character) {
    return <div className="text-center mt-8">Character not found.</div>;
  }

  return (
    <div
      className="relative h-full w-full max-w-4xl mx-auto p-2 border-2
                 bg-character-sheet 
                 bg-cover 
                 bg-center
                 bg-no-repeat
                 flex items-center justify-center"
      style={{
        aspectRatio: "16 / 9", 
      }}
    >
      {/* Overlay Form */}
      <form
        className="absolute inset-0 flex flex-col justify-start items-center
                   bg-transparent p-8
                   m-20"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Form Content */}
        <div className="z-10 flex flex-row justify-center items-center bg-white bg-opacity-70 p-4 rounded">
          <div className="w-1/3 flex justify-center items-center">
            <div className="rounded-full border border-slate-900 p-6 text-slate-950 bg-slate-50 bg-opacity-50">
              <img
                src="/character-image.png"
                alt="img"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mb-4 w-2/3 p-4">
          
           
            <input
              type="text"
              id="name"
              name="name"
              contentEditable={true}
              value={character.name}
              className="mt-4 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100
                         "
            />
          </div>
          <div className="mb-4 w-1/3 p-4 flex flex-col justify-center items-center">
            <input
              type="number"
              id="level"
              name="level"
              value={character.level}
              className="mt-9 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
            />
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
          </div>
        </div>
        <div className="border w-full flex flex-row p-4">
          <div className="border w-full border-green-500 flex flex-col">
            <div>a</div>
            <div>b</div>
            <div>c</div>
            <div>d</div>
          </div>
          <div className="border w-full border-red-600 flex flex-col">
            <div>a</div>
            <div>b</div>
            <div>c</div>
            <div>d</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CharacterSheet;
