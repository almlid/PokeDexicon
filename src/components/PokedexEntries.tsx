import { styled } from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { IPokemonPreview } from "./PokemonPreview";
import { IPokemon } from "../interfaces/IPokemon";
import PokemonPreview from "./PokemonPreview";

export interface IPokedexEntries {
  entries: IPokemonPreview[];
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}

const PokedexEntries = ({ entries, setCurrentPokemon }: IPokedexEntries) => {
  return (
    <PokedexEntriesWrapper>
      {entries.map(result => (
        <PokemonPreview
          setCurrentPokemon={setCurrentPokemon}
          key={result.url}
          name={result.name}
          url={result.url}
        ></PokemonPreview>
      ))}
    </PokedexEntriesWrapper>
  );
};

export default PokedexEntries;
const PokedexEntriesWrapper = styled.section`
  grid-area: pokedexEntries;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;

  /* margin: 1em; */
`;
