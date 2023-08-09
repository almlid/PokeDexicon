import { ISearchResult } from "../interfaces/ISearchResult";
import PokeApiService from "../services/PokeApiService";
import { useState, useEffect } from "react";

const SearchResult = ({ name, url }: ISearchResult) => {
  const [data, setData] = useState<any>();
  const getItemData = async () => {
    await PokeApiService.getDataByUrl(url).then(res => setData(res));
  };
  useEffect(() => {
    getItemData();
  }, []);

  return (
    <div>
      <p>{data && `no.${data.id}`}</p>
      {data ? (
        <img src={data.sprites.front_default} alt={`${name} sprite`} />
      ) : (
        <div>loading</div>
      )}
      <p>{name}</p>
    </div>
  );
};

export default SearchResult;
