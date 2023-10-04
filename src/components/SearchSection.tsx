import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPokemonPreview } from "./PokemonPreview";
import { baseUrl } from "../config/apiRoutes";
import PokemonPreviews from "./PokemonPreviews";
import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import { useAxios } from "../hooks/useAxios";

export interface IPokemonPage {
  count: number;
  next: string;
  previous: string;
  results: IPokemonPreview[];
}

const SearchSection = ({
  setCurrentPokemon,
}: {
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}) => {
  const [resultCount, setResultCount] = useState(0);
  const [fetchLimit, setFetchLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const maxOffset = resultCount - fetchLimit;
  const pages = Math.ceil(resultCount / fetchLimit);
  const currentPage = Math.ceil(offset / fetchLimit + 1);

  const {
    response: pokemonPage,
    error,
    loading,
  } = useAxios<IPokemonPage>(
    `${baseUrl}pokemon${offset ? `?offset=${offset}` : ""}`,
    [offset]
  );

  useEffect(() => {
    pokemonPage && setResultCount(pokemonPage.count);
  }, [pokemonPage]);

  const getNext = () => {
    const newOffset = offset + fetchLimit;
    setOffset(newOffset >= maxOffset ? maxOffset : newOffset);
  };

  const getPrevious = () => {
    const newOffset = offset - fetchLimit;
    setOffset(newOffset <= 0 ? 0 : newOffset);
  };

  const jumpToPage = (page: number) => {
    setOffset((page - 1) * fetchLimit);
  };

  const renderPageNumberButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pages; i++) {
      if (i === currentPage) {
        buttons.push(
          <span className="active" key={i}>
            {i}
          </span>
        );
      } else if (
        i !== 1 &&
        i !== pages &&
        i >= currentPage - 2 &&
        i <= currentPage + 2
      ) {
        buttons.push(
          <button key={i} onClick={() => jumpToPage(i)}>
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  const renderPageNumberSelectOptions = (
    firstPage: number,
    lastPage: number
  ) => {
    const options = [
      <option key={0} disabled>
        ...
      </option>,
    ];
    for (let i = firstPage; i <= lastPage; i++) {
      options.push(
        <option key={i} value={i - 1}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <SearchSectionWrapper>
      <p>
        Results: {resultCount} -- Current results: {offset + 1}-
        {offset + fetchLimit}
      </p>
      <p>
        Pages: {pages} -- Current page: {currentPage}
      </p>
      {pokemonPage && (
        <PokemonPreviews
          entries={pokemonPage.results}
          setCurrentPokemon={setCurrentPokemon}
        ></PokemonPreviews>
      )}
      <PageNavWrapper>
        <button onClick={getPrevious}>←</button>

        {currentPage > 1 && (
          <button key={1} onClick={() => jumpToPage(1)}>
            {1}
          </button>
        )}

        {currentPage > 4 && (
          <select
            onChange={e => {
              setOffset(+e.target.value * fetchLimit);
              e.target.value = "...";
            }}
            defaultValue={"..."}
          >
            {renderPageNumberSelectOptions(2, currentPage - 3)}
          </select>
        )}

        {renderPageNumberButtons()}

        {currentPage < pages - 3 && (
          <select
            onChange={e => {
              setOffset(+e.target.value * fetchLimit);
              e.target.value = "...";
            }}
            defaultValue={"..."}
          >
            {renderPageNumberSelectOptions(currentPage + 3, pages - 1)}
          </select>
        )}

        {currentPage < pages && (
          <button key={pages} onClick={() => jumpToPage(pages)}>
            {pages}
          </button>
        )}

        <button onClick={getNext}>→</button>
      </PageNavWrapper>
    </SearchSectionWrapper>
  );
};

export default SearchSection;

const SearchSectionWrapper = styled.section`
  grid-area: searchSection;
`;

const PageNavWrapper = styled.nav`
  margin: 1em;
  display: flex;
  justify-content: center;

  & > * {
    cursor: pointer;
    border: none;
    background-color: transparent;
    width: 2em;
    &:first-child {
      margin-right: 1em;
    }
    &:last-child {
      margin-left: 1em;
    }
    &.active {
      font-weight: bold;
    }
    &:not(.active) {
      color: #696969;
    }
    &:not(.active):hover {
      color: #000;
    }
  }
`;
