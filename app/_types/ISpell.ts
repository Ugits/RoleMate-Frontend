
export interface ISpell {
  index: string;
  name: string;
  classes: ICharClassDTO[];
  description: ISpellDescriptionDTO[];
  level: number;
  range: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
}

export interface ISpellDescription {
  id: number;
  description: string;
}

export interface ICharClassDTO {
  id: number;
  index: string;
  name: string;
}

export interface ISpellDescriptionDTO {
  id: number;
  description: string;
}

