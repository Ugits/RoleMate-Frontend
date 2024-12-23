"use client";
import { CreateCharacter } from "./CreateCharacter";
import { CharacterList } from "./CharacterList";
import { useState } from "react";

export const Dashboard = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>
      <CreateCharacter onCharacterCreated={handleRefresh} />
      <CharacterList refresh={refresh} />
    </div>
  );
};
