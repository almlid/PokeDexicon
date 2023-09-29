import { IPokemon } from "../interfaces/IPokemon";
import { SetStateAction, Dispatch } from "react";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";
import { useAxios } from "../hooks/useAxios";

export interface IPokemonPreview {
  name: string;
  url: string;
  setCurrentPokemon: Dispatch<SetStateAction<IPokemon>>;
  size?: number;
}

const PokemonPreview = ({
  name,
  url,
  setCurrentPokemon,
  size,
}: IPokemonPreview) => {
  const standardSize = "size-1";

  const clickHandler = () => {
    setCurrentPokemon(pokemon!);
    console.log("clicked", name);
  };

  const pokemon = useAxios(url, []) as IPokemon;

  return (
    <PokemonPreviewWrapper
      onClick={() => (pokemon ? clickHandler() : "")}
      className={`${size ? `size-${size}` : standardSize}`}
    >
      <p className={`pokemon-name ${size ? `size-${size}` : standardSize}`}>
        {name}
      </p>

      {pokemon && (
        <p className={`pokemon-id ${size ? `size-${size}` : standardSize}`}>
          #{"0000".slice(pokemon.id.toString().length)}
          {pokemon.id}
        </p>
      )}
      {pokemon && (
        <div
          className={`pokemon-types ${size ? `size-${size}` : standardSize}`}
        >
          {pokemon.types.map(t => (
            <PokemonType key={t.type.url} typeName={t.type.name} />
          ))}
        </div>
      )}
      <div className={`img-wrapper ${size ? `size-${size}` : standardSize}`}>
        {pokemon ? (
          <img src={pokemon.sprites.front_default} alt={`${name} sprite`} />
        ) : (
          <div>loading</div>
        )}
      </div>
    </PokemonPreviewWrapper>
  );
};

export default PokemonPreview;

const PokemonPreviewWrapper = styled.div`
  background-color: #fff;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 0.1em;
  transition: all 0.15s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 0 0.2em 0em rgba(0, 0, 0, 0.12);

  &.size {
    &-1 {
      width: 148px;
      height: 148px;
      display: grid;
      grid-template-areas:
        "id"
        "img"
        "name"
        "types";
      grid-template-rows: 0 auto auto auto;
    }

    &-2 {
      display: grid;
      grid-template-areas:
        "id img"
        "name img"
        "types img";
      height: 80px;
      width: 220px;
      min-width: 220px;
      flex-grow: 1;
      grid-template-rows: 0.4fr auto 1fr;
    }

    &-3 {
      display: grid;
      grid-template-areas: "name id types img";
      padding: 0;
      padding-left: 0.5em;
      width: 100%;
      grid-template-columns: 8em 3em 2fr 1fr;
      grid-gap: 1em;
    }
  }

  & .pokemon-id {
    font-size: 0.8em;
    color: #696969;
    font-family: "Barlow-Italic";
    grid-area: id;

    &.size {
      &-1,
      &-2 {
        text-align: left;
      }
      &-3 {
        margin: auto;
      }
    }
  }

  & .pokemon-name {
    text-transform: capitalize;
    grid-area: name;

    &.size {
      &-2 {
        margin: auto auto 0 0.1em;
      }
      &-3 {
        margin: auto;
      }
    }
  }

  & .pokemon-types {
    margin-top: 0.4em;
    grid-area: types;

    &.size {
      &-2,
      &-3 {
        margin-top: initial;
        margin-block: auto;
        text-align: left;
        white-space: nowrap;
      }
      &-3 {
        margin: auto;
      }
    }
  }

  & .img-wrapper {
    width: 100%;
    height: 100%;
    grid-area: img;

    &.size {
      &-2 {
        & > img {
          margin: auto;
          margin-right: 0;
          height: 90%;
        }
      }
      &-2,
      &-3 {
        margin: auto;
        display: flex;
      }
      &-3 {
        & > img {
          height: 80%;
          margin: auto;
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    box-shadow: 0 0 1em 0.3em rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: scale(1);
    background-color: #fbfbfb;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.12);
  }
`;
