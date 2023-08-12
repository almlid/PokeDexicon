import { ISearchResults } from "../interfaces/ISearchResults";
import { ISearchResult } from "../interfaces/ISearchResult";
import SearchResult from "./SearchResult";
import { styled } from "styled-components";

const SearchResults = ({
  results,
  setSelectedEntry,
}: ISearchResults<ISearchResult>) => {
  return (
    <SearchSection>
      {results.map(result => (
        <SearchResult
          setSelectedEntry={setSelectedEntry}
          key={result.url}
          name={result.name}
          url={result.url}
        ></SearchResult>
      ))}
    </SearchSection>
  );
};

export default SearchResults;
const SearchSection = styled.section`
  grid-area: searchResults;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;

  /* margin: 1em; */
`;
