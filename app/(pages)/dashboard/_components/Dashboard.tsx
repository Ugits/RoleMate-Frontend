"use client";
import { CreateCharacter } from "./CreateCharacter";
import { CharacterList } from "./CharacterList";
import { useState } from "react";

export const Dashboard = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [characterSelected, setCharacterSelected] = useState<boolean>(true);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-screen">
      <div className="flex flex-row min-h-screen ">
        {characterSelected ? (
          <div className="border-2 w-3/4"></div>
        ) : (
          <div className="flex w-3/4">
            <div className="w-1/3">
              <CreateCharacter onCharacterCreated={handleRefresh} />
            </div>

            <div className="w-2/3">
              <CharacterList refresh={refresh} />
            </div>
          </div>
        )}
      <div className="w-1/4 border-2"></div>
      </div>

    </div>
  );
};
