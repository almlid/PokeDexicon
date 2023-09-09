import { styled } from "styled-components";
import { useEffect, useState } from "react";
import HeightLine from "./HeightLine";

interface IHeightDisplay {
  height: number;
  sprite: string;
  name: string;
}

const HeightDisplay = ({ height, sprite, name }: IHeightDisplay) => {
  const trainerHeight = 17.3;
  const trainerSprite = "images/Spr_FRLG_Brock.png";
  const [numberOfHeightLines, setNumberOfHeightLines] = useState(
    Math.ceil((height > trainerHeight ? height : trainerHeight) / 10)
  );

  useEffect(() => {
    setNumberOfHeightLines(
      Math.ceil((height > trainerHeight ? height : trainerHeight) / 10)
    );
  }, [height]);

  const renderHeightLines = () => {
    const lines: JSX.Element[] = [];

    for (let i = 0; i <= numberOfHeightLines; i++) {
      lines.push(
        <HeightLine
          key={`height-line-${i}`}
          number={i}
          numberOfHeightLines={numberOfHeightLines}
        ></HeightLine>
      );
    }
    return lines;
  };

  return (
    <HeightDisplayWrapper>
      <p className="heading">Height</p>
      <div className="height-compare-wrapper">
        <div className="height-lines" key={numberOfHeightLines}>
          <>{renderHeightLines()}</>
        </div>

        <div
          className="height-sprite-wrapper"
          style={{
            height: `${(height / numberOfHeightLines) * 10}%`,
          }}
        >
          <span className="height-indicator">{(height / 10).toFixed(2)} m</span>
          <img className="pokemon-sprite" src={sprite} alt={name} />
        </div>
        <div
          className="height-sprite-wrapper"
          style={{
            height: `${(trainerHeight / numberOfHeightLines) * 10}%`,
          }}
        >
          <span className="height-indicator">
            {(trainerHeight / 10).toFixed(2)} m
          </span>
          <img
            className="trainer-sprite"
            src={trainerSprite}
            alt="trainer sprite"
          />
        </div>
      </div>
    </HeightDisplayWrapper>
  );
};

export default HeightDisplay;

const HeightDisplayWrapper = styled.section`
  & .height-compare-wrapper {
    margin-block: 2em;
    height: 6em;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    & > .height-sprite-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-inline: 0.2em;
      position: relative;
      transition: all 0.5s cubic-bezier(1, 1.2, 0, 1.2);

      & > img {
        height: 100%;
        filter: brightness(0);
      }

      & > .height-indicator {
        font-family: "Barlow-Medium", sans-serif;
        position: absolute;
        white-space: nowrap;
        top: -1.8em;
        &::after {
          content: "▾";
          display: block;
          margin-top: -0.3em;
        }
      }
    }
  }

  & .height-lines {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column-reverse nowrap;
    justify-content: space-between;
    transition: all 0.5s cubic-bezier(1, 1.2, 0, 1.2);
  }

  & .height-line:not(:first-child) {
    align-items: start;
  }
  & .height-line:first-child {
    height: 0;
    align-items: flex-end;
  }
  & .height-line {
    transition: all 0.5s cubic-bezier(1, 1.2, 0, 1.2);
    animation: growWidth 0.4s cubic-bezier(1, 1.2, 0, 1.02) forwards;
    position: relative;
    color: #959595;
    display: flex;
    opacity: 1;

    & > .line {
      transition: all 0.5s cubic-bezier(1, 1.2, 0, 1);
      animation: growWidth 0.4s cubic-bezier(1, 1.2, 0, 1.2) forwards;
      background-color: #e8e8e8;
      border-radius: 0.5em;
      height: 0.1em;
      width: 100%;
      position: absolute;
      left: 0;
    }
    & > .number {
      font-weight: bold;
      z-index: 1;
      position: absolute;
      left: 2em;
      background-color: #fff;
      padding: 0.2em 0.4em;
      border-radius: 0.5em;
      top: -0.4em;
      font-size: 0.6em;
      animation: fadeIn 0.2s ease-in forwards;
    }
  }

  @keyframes growWidth {
    100% {
      width: 100%;
    }
  }

  @keyframes fadeIn {
    100% {
      opacity: 1;
      top: -0.7em;
    }
  }
`;
