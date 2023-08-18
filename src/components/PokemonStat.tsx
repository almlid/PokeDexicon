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

interface IPokemonStat {
  stat: IStat;
  level: number;
  maxStat: number;
  minStat: number;
}

const PokemonStat = ({ stat, level, maxStat, minStat }: IPokemonStat) => {
  const StatAbbr =
    StatAbbreviations[stat.stat.name as keyof typeof StatAbbreviations];

  return (
    <tr>
      <td>{StatAbbr}</td>

      <PokemonStatWrapper
        $level={level}
        $maxStat={maxStat}
        $minStat={minStat}
        $baseStat={stat.base_stat}
      >
        <div
          style={{ width: `${(stat.base_stat / 200) * 100}%` }}
          className="stat-bar"
        >
          <span>{stat.base_stat}</span>
        </div>
      </PokemonStatWrapper>

      <td>
        <span>{minStat}</span>
        <span className="max-stat">-{maxStat}</span>
      </td>
    </tr>
  );
};

export default PokemonStat;

interface IPokemonStatWrapper {
  $level: number;
  $maxStat: number;
  $minStat: number;
  $baseStat: number;
}

const PokemonStatWrapper = styled.td<IPokemonStatWrapper>`
  display: flex;
  /* width: 150%; */

  & .stat-bar {
    background-color: #353535;
    border-radius: 0 0.15em 0.15em 0;
    transition: all 0.2s;
    display: flex;
    margin: 0.1em;

    & > span {
      font-size: 0.8em;
      font-weight: bolder;
      margin-block: 0.1em;
      padding: 0.2em 0.4em;
      color: #f3f3f3;
    }
  }
`;
