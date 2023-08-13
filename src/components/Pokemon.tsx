import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";
import PokemonStat from "./PokemonStat";

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
            <p>no.{id}</p>
            <div className="img-wrapper">
              {/* <img src={rest.sprites.front_default} alt={name} /> */}
              {/* <img src={rest.sprites.other.home.front_default} alt={name} /> */}
              <img
                src={rest.sprites.other["official-artwork"].front_default}
                alt={name}
              />

              {/* <img
            src={rest.sprites.versions["generation-viii"].icons.front_default}
            alt={name}
          />
          <img
            src={
              rest.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                .front_default
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
            <p>{name}</p>
          </div>

          {/* <p>Height: {height}</p>
          <p>Weight: {weight}</p> */}

          {/* <div>
            <p>Abilities:</p>
            {abilities.map(a => (
              <p key={a.ability.url}>{a.ability.name}</p>
            ))}
          </div> */}

          <div>
            <p>Types:</p>
            {types.map(t => (
              <PokemonType key={t.type.url} typeName={t.type.name} />
            ))}
          </div>

          <div>
            <p>Base stats | lvl 100 Min-Max</p>
            <div className="stats-table">
              {stats.map(s => (
                <PokemonStat key={s.stat.url} {...s}></PokemonStat>
              ))}
            </div>
          </div>
        </>
      )}
    </PokemonWrapper>
  );
};

const PokemonWrapper = styled.section`
  grid-area: pokemon;
  display: flex;
  flex-flow: column nowrap;

  & > div {
    border: 1px solid red;
  }

  & .img-wrapper {
    display: flex;
    justify-content: center;
    height: 15em;
  }

  & .stats-table {
    display: flex;
    flex-flow: column nowrap;

    & > * {
      margin-block: 0.1em;
    }
  }
`;

export default Pokemon;
