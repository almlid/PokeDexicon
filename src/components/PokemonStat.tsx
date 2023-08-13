import { IStat } from "../interfaces/IPokemon";
import { styled } from "styled-components";

const StatAbbreviations = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "sp.atk",
  "special-defense": "sp.def",
  speed: "speed",
};
const maxEv = Math.floor(255 / 4);
const maxIv = 31;

const PokemonStat = (stat: IStat) => {
  const StatAbbr =
    StatAbbreviations[stat.stat.name as keyof typeof StatAbbreviations];

  const level = 100;

  const getMaxStat = () => {
    if (stat.stat.name === "hp") {
      if (stat.base_stat === 1) {
        return 1;
      }
      return (
        Math.floor(((stat.base_stat * 2 + maxIv + maxEv) * level) / 100) +
        level +
        10
      );
    }

    return Math.floor(
      (((stat.base_stat * 2 + maxIv + maxEv) * level) / 100 + 5) * 1.1
    );
  };

  const getMinStat = () => {
    if (stat.stat.name === "hp") {
      if (stat.base_stat === 1) {
        return 1;
      }
      return Math.floor(stat.base_stat * 2 + level + 10);
    }
    return Math.floor((((stat.base_stat * 2 + 5) * level) / 100) * 0.9);
  };

  console.log(stat.stat.name, (stat.base_stat / getMaxStat()) * 100);
  return (
    <PokemonStatWrapper
      $level={level}
      $maxStat={getMaxStat()}
      $minStat={getMinStat()}
      $baseStat={stat.base_stat}
    >
      <>
        <span>{StatAbbr}</span>
        <span>{stat.base_stat}</span>

        <div className="stat-bar"></div>

        <span>{getMinStat()}-</span>
        <span>{getMaxStat()}</span>
      </>
    </PokemonStatWrapper>
  );
};

export default PokemonStat;

interface IPokemonStatWrapper {
  $level: number;
  $maxStat: number;
  $minStat: number;
  $baseStat: number;
}

const PokemonStatWrapper = styled.div<IPokemonStatWrapper>`
  display: grid;
  grid-template-columns: 3em 2em 1fr 2em 2em;

  & .stat-bar {
    width: ${p => `${(p.$baseStat / p.$maxStat) * 100}%`};
    margin-left: 0;
    margin-right: auto;
    background-color: red;
    border-radius: 0 2em 2em 0;
  }
`;
