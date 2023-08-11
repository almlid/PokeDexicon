import { IPokemon } from "../interfaces/IPokemon";
import { ISearchResult } from "../interfaces/ISearchResult";
import PokeApiService from "../services/PokeApiService";
import { useState, useEffect } from "react";

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
    <div onClick={() => (data ? clickHandler() : "")}>
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
