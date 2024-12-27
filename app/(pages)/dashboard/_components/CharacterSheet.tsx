"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICharacterID } from "@/app/_types/ICharacterID";
import { NumericCharacterField } from "@/app/_types/ICreateCharacter";

export interface ICharacter {
  id: number;
  name: string;
  level: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
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
        console.log("Fetched Character Data:", data); // Debugging
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
      const numericFields = [
        "level",
        "strength",
        "dexterity",
        "constitution",
        "intelligence",
        "wisdom",
        "charisma",
      ];

      setCharacter({
        ...character,
        [name]: numericFields.includes(name) ? Number(value) : value,
      });
    }
  };

  const validateForm = () => {
    if (!character?.name.trim()) {
      setUpdateError("Name is required.");
      return false;
    }

    const attributes: NumericCharacterField[] = [
      "level",
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ];
    for (let attr of attributes) {
      if (character[attr] < 0) {
        setUpdateError(
          `${attr.charAt(0).toUpperCase() + attr.slice(1)} cannot be negative.`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!character) return;

    if (!validateForm()) return;

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
      console.log("Submitting Updated Character Data:", character); // Debugging

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
      console.log("Updated Character Data:", updatedData); // Debugging
      setCharacter(updatedData);
      setUpdateSuccess("Character updated successfully.");
    } catch (err: any) {
      if (err.message !== "Unauthorized") {
        setUpdateError(err.message);
      }
      // Optionally, you can keep the character state as is or revert changes
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
      className="relative w-full h-full max-w-4xl mx-auto p-2 
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
                   bg-transparent p-8 overflow-auto
                   m-20"
        onSubmit={handleSubmit}
      >
        {/* Form Content */}
        <div className="z-10 flex flex-row justify-center items-center mb-4 w-full">
          <div className="w-1/3 flex justify-center items-center">
            <div className="rounded-full border border-slate-300 p-6 text-slate-950 bg-slate-50 bg-opacity-50">
              <img
                src="/character-image.png"
                alt="image"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mb-4 w-2/3 p-4 flex flex-col items-center">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={character.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-slate-50 bg-opacity-50"
              required
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
              value={character.level}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-slate-50 bg-opacity-50"
              max={9}
              min={1}
            />
          </div>
        </div>

        {/* Fields */}
        <div className="w-full h-full flex flex-row justify-evenly p-4 mb-4">
          {/* Left Column */}
          <div className="flex flex-col p-4 w-1/3">
            {/* Strength */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="strength"
                className="block text-sm font-medium text-gray-700"
              >
                Strength
              </label>
              <input
                type="number"
                id="strength"
                name="strength"
                value={character.strength}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>

            {/* Dexterity */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="dexterity"
                className="block text-sm font-medium text-gray-700"
              >
                Dexterity
              </label>
              <input
                type="number"
                id="dexterity"
                name="dexterity"
                value={character.dexterity}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>

            {/* Constitution */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="constitution"
                className="block text-sm font-medium text-gray-700"
              >
                Constitution
              </label>
              <input
                type="number"
                id="constitution"
                name="constitution"
                value={character.constitution}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col p-4 w-1/3">
            {/* Intelligence */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="intelligence"
                className="block text-sm font-medium text-gray-700"
              >
                Intelligence
              </label>
              <input
                type="number"
                id="intelligence"
                name="intelligence"
                value={character.intelligence}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>

            {/* Wisdom */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="wisdom"
                className="block text-sm font-medium text-gray-700"
              >
                Wisdom
              </label>
              <input
                type="number"
                id="wisdom"
                name="wisdom"
                value={character.wisdom}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>

            {/* Charisma */}
            <div className="mb-4 flex flex-col items-center">
              <label
                htmlFor="charisma"
                className="block text-sm font-medium text-gray-700"
              >
                Charisma
              </label>
              <input
                type="number"
                id="charisma"
                name="charisma"
                value={character.charisma}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                           text-gray-950 text-center bg-slate-50 bg-opacity-50"
                max={20}
                min={1}
              />
            </div>
          </div>
        </div>

        {/* Additional Fields (if any) */}
        {/* 
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
        */}

        {/* Submit Button and Feedback */}
        <div className="w-full flex flex-col items-center">
          {updateError && (
            <div className="text-red-500 mr-4">{updateError}</div>
          )}
          {updateSuccess && (
            <div className="text-green-500 mr-4">{updateSuccess}</div>
          )}
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
