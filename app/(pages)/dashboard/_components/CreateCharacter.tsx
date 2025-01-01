"use client";

import { Button } from "@/app/_global-components/Button";
import {
  ICreateCharacter,
  NumericCharacterField,
} from "@/app/_types/ICreateCharacter";
import { BASE_URL } from "@/variable.env";
import { useEffect, useState } from "react";

interface CreateCharacterProps {
  onCharacterCreated: () => void;
}

export const CreateCharacter = ({
  onCharacterCreated,
}: CreateCharacterProps) => {
  const [inputData, setInputData] = useState<ICreateCharacter>({
    name: "",
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setInputData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const validateForm = () => {
    if (!inputData.name.trim()) {
      alert("Please enter a character name.");
      return false;
    }

    if (inputData.level < 1 || inputData.level > 9) {
      alert("Level must be in range 1-9.");
      return false;
    }

    const attributes: NumericCharacterField[] = [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ];
    for (let attr of attributes) {
      if (inputData[attr] < 1 || inputData[attr] > 20) {
        alert(`${capitalize(attr)} must be between 1 and 20.`);
        return false;
      }
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/character/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(errData.message || "Failed to create character.");
        throw new Error(errData.message);
      }

      const data = await response.json();
      alert(`Character "${data.name}" was created successfully!`);
      setInputData({
        name: "",
        level: 1,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      });

      onCharacterCreated();
    } catch (error) {
      console.error("Error creating character:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-950 text-white rounded shadow-md">
      <h2 className="text-xl mb-4">Create a New Character</h2>

      {/* Character Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Character Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sky-950"
          placeholder="Enter character name"
        />
      </div>

      {/* Character Level Field */}
      <div className="mb-5">
        <label htmlFor="level" className="block text-white mb-2">
          Character Level
        </label>
        <input
          type="number"
          id="level"
          name="level"
          min={1}
          max={9}
          value={inputData.level}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sky-950"
        />
      </div>

      {/* Additional Attributes */}
      <div className="w-full flex flex-col sm:flex-row p-4 mb-4">
        {/* Left Column */}
        <div className="flex-1 flex flex-col p-2">
          {/* Strength */}
          <div className="mb-4">
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
              value={inputData.strength}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>

          {/* Dexterity */}
          <div className="mb-4">
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
              value={inputData.dexterity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>

          {/* Constitution */}
          <div className="mb-4">
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
              value={inputData.constitution}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="  flex-1 flex flex-col p-2">
          {/* Intelligence */}
          <div className="mb-4">
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
              value={inputData.intelligence}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>

          {/* Wisdom */}
          <div className="mb-4">
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
              value={inputData.wisdom}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>

          {/* Charisma */}
          <div className="mb-4">
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
              value={inputData.charisma}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-full
                         text-gray-950 text-center bg-gray-100"
              min="1"
              max="20"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col justify-center items-center w-full">
        <div>
          <Button
            title={"Create Character"}
            color="green"
            onClick={handleCreate}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
