import { useState, useEffect } from "react";
import { ICharacterLevel } from "@/app/_types/ICharacterLevel";
import { ISpell } from "@/app/_types/ISpell";
import SpellCard from "./SpellCard";
import { BASE_URL } from "@/variable.env";

interface SpellListProps {
  characterLevel: ICharacterLevel;
}

export const SpellList = ({ characterLevel }: SpellListProps) => {
  const [spells, setSpells] = useState<ISpell[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger fetch when component mounts or characterLevel changes
  useEffect(() => {
    fetchSpells();
  }, [characterLevel]);

  const fetchSpells = () => {
    setLoading(true);
    setError(null);
    setSpells([]);

    fetch(`${BASE_URL}/api/spell/level`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterLevel),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Failed to fetch spells.");
          });
        }
        return response.json();
      })
      .then((data: ISpell[]) => {
        setSpells(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="spell-list-container">
      {loading && <div className="loading">Loading spells...</div>}
      {error && <div className="error text-red-500">{error}</div>}
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {spells.map((spell: ISpell, index) => (
          <div
            key={index}
            className="
              -my-6
              -mx-3
              hover:shadow-2xl scale-75 transform hover:scale-105 transition duration-500"
          >
            <SpellCard
              key={index}
              imageSrc={`spell-images/${spell.index}.jpg`}
              name={spell.name}
              level={spell.level}
              type={"type"}
              description={spell.description}
              flavorText={"flavor text"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellList;
