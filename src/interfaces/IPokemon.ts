export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;

  types: IType[];
  abilities: IAbility[];
  stats: IStat[];

  species: { name: string; url: string };

  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;

    other: {
      home: { front_default: string };
      "official-artwork": { front_default: string };
    };
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: string;
            back_shiny: string;
            back_shiny_female: string;
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
          };
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: string;
        };
      };
    };
  };
}

export interface IType {
  type: {
    name: string;
    url: string;
  };
}

export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface IStat {
  stat: {
    name: string;
    url: string;
  };
  base_stat: number;
  effort: number;
}
