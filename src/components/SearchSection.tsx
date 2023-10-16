import { Dispatch, SetStateAction, useState } from "react";
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

const pageSize = 20;

const SearchSection = ({
  setCurrentPokemon,
}: {
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUrl, setCurrentUrl] = useState("");

  const {
    response: pokemonPage,
    // TODO: Handle error and loading states
    error,
    loading,
  } = useAxios<IPokemonPage>(
    currentUrl || `${baseUrl}pokemon?limit=${pageSize}`,
    [currentUrl]
  );

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const { count: numberOfResults } = pokemonPage!;
  const totalAmountOfPages = Math.ceil(numberOfResults / pageSize);

  const navigateNextPage = () => {
    if (!pokemonPage?.next) return;
    setCurrentUrl(pokemonPage!.next);
    setCurrentPage(currentPage + 1);
  };

  const navigatePreviousPage = () => {
    if (!pokemonPage?.previous) return;
    setCurrentUrl(pokemonPage!.previous);
    setCurrentPage(currentPage - 1);
  };

  const jumpToPage = (pageNumber: number) => {
    const offset = pageNumber * pageSize - pageSize;
    setCurrentUrl(`${baseUrl}pokemon?offset=${offset}&limit=${pageSize}`);
    setCurrentPage(pageNumber);
  };

  const renderPageNumberButtons = () => {
    const buttons = [];
    if (currentPage - 2 > 2)
      buttons.push(
        <button
          key={currentPage - 2}
          onClick={() => jumpToPage(currentPage - 2)}
        >
          {currentPage - 2}
        </button>
      );
    if (currentPage - 1 > 1)
      buttons.push(
        <button
          key={currentPage - 1}
          onClick={() => jumpToPage(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      );
    buttons.push(
      <span className="active" key={currentPage}>
        {currentPage}
      </span>
    );
    if (currentPage + 1 <= totalAmountOfPages - 1)
      buttons.push(
        <button
          key={currentPage + 1}
          onClick={() => jumpToPage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      );
    if (currentPage + 2 <= totalAmountOfPages - 2)
      buttons.push(
        <button
          key={currentPage + 2}
          onClick={() => jumpToPage(currentPage + 2)}
        >
          {currentPage + 2}
        </button>
      );

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
        Pages: {totalAmountOfPages} -- Current page: {currentPage}
      </p>
      <PokemonPreviews
        entries={pokemonPage!.results}
        setCurrentPokemon={setCurrentPokemon}
      ></PokemonPreviews>
      <PageNavWrapper>
        <button onClick={navigatePreviousPage}>←</button>

        {currentPage > 1 && (
          <button key={1} onClick={() => jumpToPage(1)}>
            {1}
          </button>
        )}

        {currentPage > 4 && (
          <select
            onChange={e => {
              e.target.value = "...";
            }}
            defaultValue={"..."}
          >
            {renderPageNumberSelectOptions(2, currentPage - 3)}
          </select>
        )}

        {renderPageNumberButtons()}

        {currentPage < totalAmountOfPages - 3 && (
          <select
            onChange={e => {
              e.target.value = "...";
            }}
            defaultValue={"..."}
          >
            {renderPageNumberSelectOptions(
              currentPage + 3,
              totalAmountOfPages - 1
            )}
          </select>
        )}

        {currentPage < totalAmountOfPages && (
          <button
            key={totalAmountOfPages}
            onClick={() => jumpToPage(totalAmountOfPages)}
          >
            {totalAmountOfPages}
          </button>
        )}

        <button onClick={navigateNextPage}>→</button>
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
