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
      <p className="pokemon-id">{data && `#${data.id}`}</p>
      <div className="img-wrapper">
        {data ? (
          <img src={data.sprites.front_default} alt={`${name} sprite`} />
        ) : (
          <div>loading</div>
        )}
      </div>
      <p className="pokemon-name">{name}</p>

      {data && (
        <div className="pokemon-types">
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
  /* border: 1px solid #d3d3d3; */
  border-radius: 0.5em;
  padding: 0.5em;
  width: 144px;
  height: 144px;
  display: flex;
  flex-direction: column;
  transition: all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 0 0.2em 0em rgba(0, 0, 0, 0.12);
  /* background-color: #fff; */

  & .pokemon-id {
    position: absolute;
    font-size: 0.8em;
    color: #696969;
  }
  & .pokemon-name {
    text-transform: capitalize;
  }

  & .pokemon-types {
    margin-top: 0.4em;
  }

  & .img-wrapper {
    width: 100%;
    height: 100%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    box-shadow: 0 0 1em 0.3em rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(1);
    background-color: #fbfbfb;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.12);
  }
`;
