"use client";
import { useState } from "react";
import { CreateCharacter } from "./CreateCharacter";
import { CharacterList } from "./CharacterList";
import { ICharacterID } from "@/app/_types/ICharacterID";
import CharacterSheet from "./CharacterSheet";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const [characterSelected, setCharacterSelected] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] =
    useState<ICharacterID | null>(null);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleCharacterSelect = (characterId: ICharacterID) => {
    setSelectedCharacterId(characterId);
    setCharacterSelected(true);
  };

  const handleBackToList = () => {
    setCharacterSelected(false);
    setSelectedCharacterId(null);
  };

  return (
    <div className="h-full p-4 flex flex-row space-y-4 md:space-y-0 md:space-x-4">
      {characterSelected && selectedCharacterId ? (
       <div className="flex flex-row w-3/4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-1/3 p-4 bg-white bg-opacity-50 rounded-lg "></div>
          <div className="flex flex-col w-3/4 p-4 rounded-lg border">
            <div>
              <button
                onClick={handleBackToList}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-20"
              >
                Back
              </button>
            </div>
            <CharacterSheet characterId={selectedCharacterId} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row w-3/4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-1/3 p-4 bg-white bg-opacity-50 rounded-lg ">
            <CreateCharacter onCharacterCreated={handleRefresh} />
          </div>

          <div className="w-2/3 p-4 bg-white bg-opacity-50 rounded-lg ">
            <CharacterList
              refresh={refresh}
              onCharacterSelect={handleCharacterSelect}
            />
          </div>
        </div>
      )}
      <div className="w-1/4 p-4 bg-white bg-opacity-50 rounded-lg ">
        {/* Sidebar Content */}
        <p className="text-center">Sidebar Content Goes Here</p>
      </div>
    </div>
  );
};

export default Dashboard;
