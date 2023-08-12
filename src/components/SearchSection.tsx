import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPokemonPreview } from "./PokemonPreview";
import PokeApiService from "../services/PokeApiService";
import PokedexEntries from "./PokedexEntries";
import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";

const SearchSection = ({
  setCurrentPokemon,
}: {
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}) => {
  const [resultCount, setResultCount] = useState(0);
  const [fetchLimit, setFetchLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const maxOffset = resultCount - fetchLimit;

  const [currentEntries, setCurrentEntries] = useState<IPokemonPreview[]>();

  const getPokemon = async (offset?: number) => {
    return await PokeApiService.getData(
      `pokemon${offset ? `?offset=${offset}` : ""}`
    ).then(res => {
      setCurrentEntries(res.results);
      setResultCount(res.count);
    });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    getPokemon(offset);
  }, [offset]);

  const getNext = () => {
    const newOffset = offset + fetchLimit;
    setOffset(newOffset >= maxOffset ? maxOffset : newOffset);
  };

  const getPrevious = () => {
    const newOffset = offset - fetchLimit;
    setOffset(newOffset <= 0 ? 0 : newOffset);
  };

  return (
    <SearchSectionWrapper>
      <p>Results: {resultCount}</p>
      <button onClick={getPrevious}>Previous {fetchLimit} </button>
      {currentEntries && (
        <PokedexEntries
          entries={currentEntries}
          setCurrentPokemon={setCurrentPokemon}
        ></PokedexEntries>
      )}
      <button onClick={getNext}>Next {fetchLimit} </button>
    </SearchSectionWrapper>
  );
};

export default SearchSection;

const SearchSectionWrapper = styled.section`
  grid-area: searchSection;
`;
