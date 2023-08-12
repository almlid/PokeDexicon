import { styled } from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { IPokemonPreview } from "./PokemonPreview";
import { IPokemon } from "../interfaces/IPokemon";
import PokemonPreview from "./PokemonPreview";

export interface IPokedexEntries {
  results: IPokemonPreview[];
  setSelectedEntry: Dispatch<SetStateAction<IPokemon>>;
}

const PokedexEntries = ({ results, setSelectedEntry }: IPokedexEntries) => {
  return (
    <PokedexEntriesWrapper>
      {results.map(result => (
        <PokemonPreview
          setSelectedEntry={setSelectedEntry}
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
  grid-area: searchResults;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;

  /* margin: 1em; */
`;
