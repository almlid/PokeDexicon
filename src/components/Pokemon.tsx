import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";
import PokemonStats from "./PokemonStats";
import { useEffect, useState } from "react";

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
  const trainerWeight = 620;
  const trainerHeight = 17.3;
  const trainerSprite = "images/Spr_FRLG_Brock.png";
  const trainerSpriteOverworld = "images/Brock_IV_OD.png";
  const maxRotation = 12;
  const gravity = 0.1;
  const impactFactor = 2;
  const largestHeightRoundedUp = Math.ceil(
    (height > trainerHeight ? height : trainerHeight) / 10
  );

  const [rotation, setRotation] = useState(0);
  const [prevRotation, setPrevRotation] = useState(0);
  const [bounce, setBounce] = useState(0);

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const newRotation = calculateRotation();
      const rotationDifference = Math.abs(newRotation - rotation);

      if (Math.abs(newRotation - rotation) > impactFactor) {
        setPrevRotation(rotation);
        setRotation(newRotation);
        setBounce(rotationDifference);

        setTimeout(() => {
          setBounce(0);
        }, 200);
      } else {
        setRotation(
          prevRotation => prevRotation + (newRotation - prevRotation) * 0.1
        );
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [weight, trainerWeight, rotation]);

  const calculateRotation = () => {
    const rotation = ((trainerWeight - weight) / trainerWeight) * maxRotation;
    return Math.min(Math.max(-maxRotation, rotation), maxRotation);
  };
  const calculateCounterRotation = () => {
    const rotation = ((weight - trainerWeight) / trainerWeight) * maxRotation;
    return Math.min(Math.max(-maxRotation, rotation), maxRotation);
  };

  const getBounceAnimationYValue = (weight: number) => {
    const distance = bounce * 20;
    const yValue = (gravity * weight * distance) / (0.5 * weight);
    return -yValue;
  };

  const renderHeightReference = () => {
    const numberOfRefLines = Math.ceil(
      (height > trainerHeight ? height : trainerHeight) / 10
    );
    const lines = [];
    for (let i = 0; i <= numberOfRefLines; i++) {
      lines.push(
        <div className="height-line" key={`height-line-${i}`}>
          {numberOfRefLines > 6 ? (
            i % 2 === 0 ? (
              <span>{i}</span>
            ) : null
          ) : (
            <span>{i}</span>
          )}
        </div>
      );
    }
    return lines;
  };

  return (
    <PokemonWrapper>
      {name && (
        <>
          <p>
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
          </p>

          <section>
            <p className="heading">Stats</p>
            <div className="stats-table">
              <PokemonStats stats={stats} />
            </div>
          </section>

          <section className="height-display">
            <p className="heading">Height</p>

            <div className="height-compare-wrapper">
              <div className="height-lines">{renderHeightReference()}</div>
              <img
                className="pokemon-sprite"
                src={rest.sprites.other["official-artwork"].front_default}
                alt={name}
                style={{
                  height: `${
                    height < trainerHeight
                      ? (height / trainerHeight) * 100
                      : (height / largestHeightRoundedUp) * 10
                  }%`,
                }}
              />
              <img
                className="trainer-sprite"
                src={trainerSprite}
                alt="trainer sprite"
                style={{
                  height: `${
                    height < trainerHeight
                      ? (trainerHeight / largestHeightRoundedUp) * 10
                      : (trainerHeight / height) * 100
                  }%`,
                }}
              />
            </div>
            <div className="height-numbers">
              <span>{(height / 10).toFixed(2)} m</span>
              <span>{(trainerHeight / 10).toFixed(2)} m</span>
            </div>
          </section>

          <section className="weight-display">
            <p className="heading">Weight</p>
            <div className="weighing-scale-wrapper">
              <div className="weighing-scale">
                <div
                  className="top-part"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div
                    className="left-bowl"
                    style={{
                      transform: `rotate(${calculateCounterRotation()}deg)`,
                    }}
                  >
                    <div
                      className="sprite-wrapper"
                      style={
                        rotation < prevRotation
                          ? {}
                          : {
                              transform: `translateY(${getBounceAnimationYValue(
                                weight
                              )}px`,
                            }
                      }
                    >
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
                  <div
                    className="right-bowl"
                    style={{
                      transform: `rotate(${calculateCounterRotation()}deg)`,
                    }}
                  >
                    <div
                      className="sprite-wrapper"
                      style={
                        rotation < prevRotation
                          ? {
                              transform: `translateY(${getBounceAnimationYValue(
                                trainerWeight
                              )}px`,
                            }
                          : {}
                      }
                    >
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
            <div className="weight-numbers">
              <span>{Math.round(weight / 10)} kg</span>
              <span>{trainerWeight / 10} kg</span>
            </div>
          </section>

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

  & .height-display {
    & .height-compare-wrapper {
      height: 6em;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      & > img {
        margin-inline: 0.2em;
        filter: brightness(0);
        transition: all 0.5s cubic-bezier(1, 1.2, 0, 1.2);
      }
    }

    & .height-numbers {
      padding: 0.8em;
      display: flex;
      justify-content: space-around;
      margin-top: 1em;
      font-size: 0.9em;
      border-top: 1px solid #d3d3d3;
    }

    & .height-lines {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column-reverse nowrap;
      justify-content: space-between;
    }

    & .height-line {
      position: relative;
      color: #959595;
      background-color: #e8e8e8;
      border-radius: 0.5em;
      height: 0.1em;

      & > span {
        font-weight: bold;
        position: absolute;
        left: 2em;
        background-color: #fff;
        padding: 0.2em 0.4em;
        border-radius: 0.5em;
        top: -0.7em;
        font-size: 0.6em;
      }
    }
  }

  & .weight-display {
    & .weighing-scale-wrapper {
      height: 6em;
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
          transition: all 0.35s cubic-bezier(1, 1.2, 0.44, 1.2);

          & .left-bowl,
          & .right-bowl {
            transition: all 0.2s cubic-bezier(0.61, 1.67, 0.5, 0.82);
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
              transition: transform 0.4s cubic-bezier(1, 0, 0.6, 1);
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

        & .fulcrum {
          width: 1em;
          height: 1em;
          background-color: #d3d3d3;
          margin: 0 auto;
          border-radius: 50% 50% 10% 10%;

          &::before {
            content: "";
            position: relative;
            width: 50%;
            height: 50%;
            display: block;
            background-color: #a1a1a1;
            border-radius: 50%;
            margin: 0 auto;
            top: -30%;
          }
        }
      }
    }
    & .weight-numbers {
      padding: 0.8em;
      display: flex;
      justify-content: space-around;
      margin-top: 1em;
      font-size: 0.9em;
      border-top: 1px solid #d3d3d3;
    }
  }
`;

export default Pokemon;
