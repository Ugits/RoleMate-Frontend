"use client";

import { ICharacter } from "@/app/_types/ICharacter";
import { ICharacterID } from "@/app/_types/ICharacterID";
import { TrashIcon } from "@heroicons/react/24/outline"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DeleteCharacterProps {
  character: ICharacter;
  fetchCharacters: () => void
}

export const DeleteCharacter = ({ character, fetchCharacters }: DeleteCharacterProps) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("accessToken"));
    }
  }, []);

  const handleDeletion = async () => {

    if (!token) {
      alert("You must be logged in to delete a character.");
      return;
    }


    if (!character.id) {
      alert("Character ID is missing.");
      return;
    }


    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${character.name}"?`
    );
    if (!confirmDelete) {
      return;
    }

    const charToBeDeleted: ICharacterID = {id: character.id}


    fetch(`http://localhost:8080/character/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(charToBeDeleted),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errData) => {
              throw new Error(errData.message || "Failed to delete the character.");
            });
          }
          
          alert(`Character "${character.name}" has been deleted successfully.`);
          fetchCharacters()
        })
        .catch((error) => {
          console.error("Error deleting character:", error);
          alert(error.message || "An error occurred while deleting the character.");
        });
    };

  return (
    <div>
      <button
        onClick={handleDeletion}
        className="p-1 hover:bg-red-100 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        style={{ width: 28, height: 28 }}
        aria-label={`Delete ${character.name}`}
      >
        <TrashIcon
          className={`text-red-500`}
          style={{ width: 20, height: 20 }}
        />
      </button>
    </div>
  );
};
