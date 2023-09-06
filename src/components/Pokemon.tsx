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
  const trainerWeight = 60;
  const trainerSprite = "images/Spr_FRLG_Brock.png";
  const trainerSpriteOverworld = "images/Brock_IV_OD.png";

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
              src={trainerSprite}
              alt="trainer sprite"
              style={{
                height: `${height < 17.3 ? 100 : (17.3 / height) * 100}%`,
              }}
            />
          </div>

          <p>Weight: {weight}</p>

          <div className="weight-display">
            <div className="weighing-scale">
              <div className="top-part">
                <div className="left-bowl">
                  <div className="sprite-wrapper">
                    <div>
                      <img
                        src={
                          rest.sprites.versions["generation-viii"].icons
                            .front_default
                        }
                        alt={name + " icon sprite"}
                      />
                    </div>
                  </div>
                </div>
                <div className="balance-bar"></div>
                <div className="right-bowl">
                  <div className="sprite-wrapper">
                    <div>
                      <img
                        src={trainerSpriteOverworld}
                        alt="trainer overworld sprite"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-part">
                <div className="fulcrum"></div>
              </div>
            </div>
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

  & .weight-display {
    height: 8em;
    display: flex;
    align-items: end;
    justify-content: center;

    & .weighing-scale {
      bottom: 0;
      width: 90%;
      height: 2em;
      & .top-part {
        display: flex;
        position: relative;
        width: 80%;
        margin: 0 auto;
        /* transform: rotate(-12deg); */

        & .left-bowl,
        & .right-bowl {
          /* transform: rotate(12deg); */
          width: 20%;
          height: 0.3em;
          background-color: #6b6b6b;
          border-radius: 0.5em 0.5em 50% 50%;
          position: absolute;
          bottom: 80%;

          & .sprite-wrapper {
            display: flex;
            justify-content: center;
            position: relative;
          }
        }

        & .right-bowl {
          right: -8%;
          & .sprite-wrapper {
            bottom: 600%;
          }
        }

        & .left-bowl {
          left: -8%;
          & .sprite-wrapper {
            bottom: 1050%;
          }
        }
      }

      & .balance-bar {
        width: 100%;
        height: 0.2em;
        background-color: #d3d3d3;
        margin: 0 auto;
        border-radius: 2em;
      }

      & .bottom-part {
        border: 1px solid #d3d;
      }
      & .fulcrum {
        width: 1em;
        height: 1em;
        background-color: #d3d3d3;
        margin: 0 auto;
        border-radius: 50% 50% 10% 10%;
      }
    }
  }
`;

export default Pokemon;
