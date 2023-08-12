import { IPokemon } from "../interfaces/IPokemon";
import PokeApiService from "../services/PokeApiService";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";

export interface IPokemonPreview {
  name: string;
  url: string;
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
}

const PokemonPreview = ({ name, url, setCurrentPokemon }: IPokemonPreview) => {
  const [data, setData] = useState<IPokemon>();
  const getItemData = async () => {
    await PokeApiService.getDataByUrl(url).then(res => setData(res));
  };
  useEffect(() => {
    getItemData();
  }, []);

  const clickHandler = () => {
    setCurrentPokemon(data!);
    console.log("clicked", name);
    console.log(data);
  };

  return (
    <PokemonPreviewWrapper onClick={() => (data ? clickHandler() : "")}>
      <p>{data && `no.${data.id}`}</p>
      {data ? (
        <img src={data.sprites.front_default} alt={`${name} sprite`} />
      ) : (
        <div>loading</div>
      )}
      <p className="name">{name}</p>

      {data && (
        <div>
          {data.types.map(t => (
            <PokemonType key={t.type.url} typeName={t.type.name} />
          ))}
        </div>
      )}
    </PokemonPreviewWrapper>
  );
};

export default PokemonPreview;

const PokemonPreviewWrapper = styled.div`
  /* border: 1px solid black; */

  & .name {
    text-transform: capitalize;
  }

  & > * {
    /* border: 1px solid black; */
  }
  &:hover {
    cursor: pointer;
  }
`;
