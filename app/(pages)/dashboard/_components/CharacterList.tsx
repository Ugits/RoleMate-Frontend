"use client";

import { useEffect, useState } from "react";
import { CharacterCardMini } from "./CharacterCardMini";
import { ICharacter } from "@/app/_types/ICharacter";
import { ICharacterID } from "@/app/_types/ICharacterID";


interface CharacterListProps {
    refresh: boolean;
    onCharacterSelect: (characterId: ICharacterID) => void;
  }

  export const CharacterList = ({ refresh, onCharacterSelect }: CharacterListProps) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, [refresh]);


  const fetchCharacters = () => {
    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to view your characters.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/character/fetch-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.message || "Failed to fetch characters.");
          });
        }

        return response.json();
      })
      .then((data: ICharacter[]) => {
        setCharacters(data);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setError(error.message);
        alert(error.message || "An error occurred while fetching characters.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Characters</h1>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading characters...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* No Characters Message */}
      {!loading && !error && characters.length === 0 && (
        <p className="text-center">No characters found.</p>
      )}

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-6">
        {characters.map((character) => (
          <CharacterCardMini 
          key={character.id} 
          character={character} 
          onSelect={() => onCharacterSelect({ id: character.id })}
          fetchCharacters={fetchCharacters}/>
        ))}
      </div>
    </div>
  );
};
