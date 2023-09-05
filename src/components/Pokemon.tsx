import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";
import PokemonStat from "./PokemonStat";
import PokemonStats from "./PokemonStats";

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

          <div>
            <p>Types:</p>
            {types.map(t => (
              <PokemonType key={t.type.url} typeName={t.type.name} />
            ))}
          </div>

          <div>
            <p>Stats</p>
            <div className="stats-table">
              <PokemonStats stats={stats} />
            </div>
          </div>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>

          <div className="height-display">
            <img
              className="pokemon-sprite"
              src={rest.sprites.other["official-artwork"].front_default}
              alt={name}
              style={{
                height: `${height < 17.3 ? (height / 17.3) * 100 : 100}%`,
              }}
            />
            <img
              className="trainer-sprite"
              src="images/Spr_FRLG_Brock.png"
              alt="trainer sprite"
              style={{
                height: `${height < 17.3 ? 100 : (17.3 / height) * 100}%`,
              }}
            />
          </div>
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

  & .height-display {
    height: 6em;

    & > img {
      filter: brightness(0);
      transition: all 0.5s;
    }
  }
`;

export default Pokemon;
