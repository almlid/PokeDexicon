import { ISearchResult } from "../interfaces/ISearchResult";

const SearchResult = ({ name, url }: ISearchResult) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default SearchResult;
