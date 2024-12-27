"use client";

import { Button } from "@/app/_global-components/Button";
import { ICreateCharacter } from "@/app/_types/ICreateCharacter";
import { useEffect, useState } from "react";

interface CreateCharacterProps {
  onCharacterCreated: () => void;
}

export const CreateCharacter = ({ onCharacterCreated }: CreateCharacterProps) => {
  const [inputData, setInputData] = useState<ICreateCharacter>({
    name: "",
    level: 1,
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  const handleCreate = async () => {
    if (!inputData.name.trim()) {
      alert("Please enter a character name.");
      return;
    }

    if (inputData.level < 1 || inputData.level > 9) {
      alert("Level must be in range 1-9.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/character/create", {
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
      setInputData({ name: "", level: 1 });
      
      onCharacterCreated();
    } catch (error) {
      console.error("Error creating character:", error);
    } finally {
      setLoading(false);
    }
    
    
  };

  return (
    <div className="p-4 bg-slate-950 text-white rounded shadow-md">
      <h2 className="text-xl mb-2">Create a New Character</h2>
      {/* Character name Field */}
      <div className="mb-4">
        <label htmlFor="charName" className="block mb-1">
          Character Name
        </label>
        <input
          type="text"
          id="name"
          value={inputData.name}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          required
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sky-950"
          placeholder="Enter character name"
        />
      </div>
      {/* Character Level Field */}
      <div className="mb-5 w-full">
        <label htmlFor="level" className="block text-white mb-2">
          Character Level
        </label>
        <input
          type="number"
          id="level"
          min={1}
          max={9}
          value={inputData.level}
          onChange={(e) =>
            setInputData((prev) => ({
              ...prev,
              level: Number(e.target.value),
            }))
          }
          className="w-full px-4 py-3 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sky-950"
        />
      </div>
      {/* Submit Button */}
      <Button
        title={"Create Character"}
        color="crimson"
        onClick={handleCreate}
        loading={loading}
      />
    </div>
  );
};
