import { ICharacter } from "@/app/_types/ICharacter";
import { CharacterCardMini } from "./CharacterCardMini";
import { CreateCharacter } from "./CreateCharacter";

export const Dashboard = () => {
    const mockCharacter: ICharacter = {id:23, name:"Robel", level:7}
  return (
    <div>
      <div>Dashboard</div>
      <CreateCharacter />
      // call List // call Charactercardmini inside
      <CharacterCardMini character={mockCharacter}/>
    </div>
  );
};
