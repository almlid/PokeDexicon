import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";
import PokemonStats from "./PokemonStats";
import { useEffect, useState } from "react";
import HeightDisplay from "./HeightDisplay";
import WeightDisplay from "./WeightDisplay";

const Pokemon = ({
  name,
  id,
  types,
  height,
  stats,
  weight,
  abilities,
  ...rest
}: IPokemon) => {
  return (
    <PokemonWrapper>
      {name && (
        <>
          <div>
            <p className="pokemon-id">
              #{"0000".slice(id.toString().length)}
              {id}
            </p>

            <div className="img-wrapper">
              <img
                src={rest.sprites.other["official-artwork"].front_default}
                alt={name}
              />

              {/* <img
                src={
                  rest.sprites.versions["generation-vi"][
                    "omegaruby-alphasapphire"
                  ].front_default
                }
                alt={name}
              />
              <img
                src={
                  rest.sprites.versions["generation-v"]["black-white"].animated
                    .front_default
                }
                alt={name}
              /> */}
            </div>
            <p className="pokemon-name">{name}</p>
            <div>
              {types.map(t => (
                <PokemonType key={t.type.url} typeName={t.type.name} />
              ))}
            </div>
          </div>

          <section>
            <p className="heading">Stats</p>
            <div className="stats-table">
              <PokemonStats stats={stats} />
            </div>
          </section>

          <HeightDisplay
            height={height}
            sprite={rest.sprites.other["official-artwork"].front_default}
            name={name}
          />

          <WeightDisplay
            weight={weight}
            sprite={
              rest.sprites.versions["generation-viii"].icons.front_default
            }
            name={name}
          />

          {/* <div>
            <p>Abilities:</p>
            {abilities.map(a => (
              <p key={a.ability.url}>{a.ability.name}</p>
            ))}
          </div> */}
        </>
      )}
    </PokemonWrapper>
  );
};

const PokemonWrapper = styled.section`
  min-width: 300px;
  background: linear-gradient(to bottom, #f0f0f0 30%, #454545);
  grid-area: pokemon;
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid #d3d3d3;

  & .pokemon-id {
    padding: 0.8em;
    font-size: 1.1em;
    text-align: left;
    font-family: "Barlow-MediumItalic", sans-serif;
    color: #3b3b3b;
    position: absolute;
  }
  & .pokemon-name {
    font-size: 1.2em;
    text-transform: capitalize;
    margin: 0.5em;
  }

  & > section {
    border: 1px solid #d3d3d3;
    border-radius: 0.5em;
    margin: 0.2em;
    padding: 0.5em;
    background-color: #ffffff;

    & > .heading {
      padding: 0.6em;
      margin-bottom: 0.4em;
      font-weight: 400;
    }
  }

  & .img-wrapper {
    display: flex;
    justify-content: center;
    height: 15em;
    & > img {
      padding: 1em;
    }
  }
`;

export default Pokemon;
