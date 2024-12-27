"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICharacterID } from "@/app/_types/ICharacterID";

export interface ICharacter {
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
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        alert("You must be logged in to view character details.");
        setLoading(false);
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/character/fetch", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(characterId),
        });

        if (response.status === 401) {
          router.push("/login");
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch character.");
        }

        const data: ICharacter = await response.json();
        setCharacter(data);
        setError(null);
      } catch (err: any) {
        if (err.message !== "Unauthorized") {
          setError(err.message);
        }
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (character) {
      const { name, value } = e.target;
      setCharacter({
        ...character,
        [name]: name === "level" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!character) return;

    setUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to update character details.");
      setUpdating(false);
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/character/update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(character),
      });

      if (response.status === 401) {
        router.push("/login");
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update character.");
      }

      const updatedData: ICharacter = await response.json();
      setCharacter(updatedData);
      setUpdateSuccess("Character updated successfully.");
    } catch (err: any) {
      if (err.message !== "Unauthorized") {
        setUpdateError(err.message);
      }
    } finally {
      setUpdating(false);
    }
  };

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
      className="relative w-full h-full max-w-4xl mx-auto p-2 border-2
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
                   bg-transparent p-8  m-20"
        onSubmit={handleSubmit}
      >
        {/* Form Content */}
        <div className="z-10 flex flex-row justify-center items-center bg-white bg-opacity-70 p-4 rounded mb-4 w-full">
          <div className="w-1/3 flex justify-center items-center">
            <div className="rounded-full border border-slate-900 p-6 text-slate-950 bg-slate-50 bg-opacity-50">
              <img
                src="/character-image.png"
                alt="Character"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mb-4 w-2/3 p-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={character.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100
                         "
            />
          </div>
          <div className="mb-4 w-1/3 p-4 flex flex-col justify-center items-center">
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
            <input
              type="number"
              id="level"
              name="level"
              max={9}
              min={1}
              value={character.level}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="border w-full flex flex-row p-4 mb-4">
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

        {/* Submit Button and Feedback */}
        <div className="w-full flex justify-end">
          {updateError && <div className="text-red-500 mr-4">{updateError}</div>}
          {updateSuccess && <div className="text-green-500 mr-4">{updateSuccess}</div>}
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-yellow-900 text-white rounded-full hover:bg-yellow-600 disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Character"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterSheet;
