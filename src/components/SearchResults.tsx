import { ISearchResults } from "../interfaces/ISearchResults";
import { ISearchResult } from "../interfaces/ISearchResult";
import SearchResult from "./SearchResult";

const SearchResults = ({ results }: ISearchResults<ISearchResult>) => {
  return (
    <div>
      SearchResults
      {results.map(result => (
        <SearchResult
          key={result.url}
          name={result.name}
          url={result.url}
        ></SearchResult>
      ))}
    </div>
  );
};

export default SearchResults;
