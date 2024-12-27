import { ISpellDescription } from "@/app/_types/ISpell";
import "./SpellCard.css"; 


interface SpellCardProps {
  imageSrc: string;
  name: string; 
  level: number;
  type: string; 
  description: ISpellDescription[]; 
  flavorText?: string; 
}

const SpellCard = (props: SpellCardProps) => {
  return (
    
    <div className="spell-card w-1/2">
      <div className="spell-card-inner-border">
        <div className="spell-header">
          <h2 className="spell-name">{props.name}</h2>
          <span className="spell-level">Level {props.level}</span>
        </div>

        <img
          src={props.imageSrc}
          alt={`${props.name} spell`}
          className="spell-image"
        />

        <div className="spell-type">{props.type}</div>

        <div className="spell-description">
          {props.description.map((desc: ISpellDescription, index) => (
            <p key={index}>{desc.description}</p>
          ))}
        </div>

        {props.flavorText && (
          <div className="spell-flavor-text">
            <em>{props.flavorText}</em>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpellCard;
