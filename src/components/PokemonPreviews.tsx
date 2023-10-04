import { styled } from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { IPokemonPreview } from "./PokemonPreview";
import { IPokemon } from "../interfaces/IPokemon";
import PokemonPreview from "./PokemonPreview";

export interface IPokemonPreviews {
  entries: IPokemonPreview[];
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}

const PokemonPreviews = ({ entries, setCurrentPokemon }: IPokemonPreviews) => {
  return (
    <PokemonPreviewsWrapper>
      {entries.map(result => (
        <PokemonPreview
          setCurrentPokemon={setCurrentPokemon}
          key={result.url}
          name={result.name}
          url={result.url}
        ></PokemonPreview>
      ))}
    </PokemonPreviewsWrapper>
  );
};

export default PokemonPreviews;

const PokemonPreviewsWrapper = styled.section`
  grid-area: PokemonPreviews;
  display: flex;
  flex-flow: row wrap;
`;
