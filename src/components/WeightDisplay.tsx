import { styled } from "styled-components";
import { useEffect, useState } from "react";

interface IWeightDisplay {
  weight: number;
  name: string;
  sprite: string;
}

const trainerWeight = 620;
const trainerSpriteOverworld = "images/Brock_IV_OD.png";
const maxRotation = 12;
const gravity = 0.1;
const impactFactor = 2;

const WeightDisplay = ({ weight, name, sprite }: IWeightDisplay) => {
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

  return (
    <WeightDisplayWrapper>
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
                  <img src={sprite} alt={name + " icon sprite"} />
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
    </WeightDisplayWrapper>
  );
};

export default WeightDisplay;

const WeightDisplayWrapper = styled.section`
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
`;
