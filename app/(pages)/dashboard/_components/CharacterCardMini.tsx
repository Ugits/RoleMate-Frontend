"use client";

import { ICharacter } from "@/app/_types/ICharacter";
import { DeleteCharacter } from "./DeleteCharacter";

interface CharacterCardMiniProps {
  character: ICharacter;
  onSelect: () => void
  fetchCharacters: () => void
}

export const CharacterCardMini = ({character, fetchCharacters, onSelect}: CharacterCardMiniProps) => {
  return (
    <div 
    onClick={onSelect}
    className="flex flex-row justify-between p-4 bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Character Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {character.name}
        </h3>
        <p className="text-sm text-gray-500">Level: {character.level}</p>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <DeleteCharacter character={character} fetchCharacters={fetchCharacters}/>
      </div>
    </div>
  );
};
