import { IPokemon } from "../interfaces/IPokemon";
import { ISearchResult } from "../interfaces/ISearchResult";
import PokeApiService from "../services/PokeApiService";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

const SearchResult = ({ name, url, setSelectedEntry }: ISearchResult) => {
  const [data, setData] = useState<IPokemon>();
  const getItemData = async () => {
    await PokeApiService.getDataByUrl(url).then(res => setData(res));
  };
  useEffect(() => {
    getItemData();
  }, []);

  const clickHandler = () => {
    setSelectedEntry(data!);
    console.log("clicked", name);
    console.log(data);
  };

  return (
    <SearchResultEntryWrapper onClick={() => (data ? clickHandler() : "")}>
      <p>{data && `no.${data.id}`}</p>
      {data ? (
        <img src={data.sprites.front_default} alt={`${name} sprite`} />
      ) : (
        <div>loading</div>
      )}
      <p className="name">{name}</p>
    </SearchResultEntryWrapper>
  );
};

export default SearchResult;

const SearchResultEntryWrapper = styled.div`
  /* border: 1px solid black; */

  & > * {
    /* border: 1px solid black; */
  }
  &:hover {
    cursor: pointer;
  }
`;
