import styled from "styled-components";
import { IStat } from "../interfaces/IPokemon";
import PokemonStat from "./PokemonStat";
import { useState } from "react";

const maxEv = Math.floor(255 / 4);
const maxIv = 31;

const PokemonStats = ({ stats }: { stats: IStat[] }) => {
  const [level, setLevel] = useState(50);

  const getMaxStat = (stat: IStat) => {
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

  const getMinStat = (stat: IStat) => {
    if (stat.stat.name === "hp") {
      if (stat.base_stat === 1) {
        return 1;
      }
      return Math.floor((stat.base_stat * 2 * level) / 100 + level + 10);
    }
    return Math.floor(((stat.base_stat * 2 * level) / 100 + 5) * 0.9);
  };

  const totalBaseStats = stats.reduce((prev, stat) => {
    return prev + stat.base_stat;
  }, 0);

  const totalMaxStat = stats.reduce((prev, stat) => {
    return prev + getMaxStat(stat);
  }, 0);

  const totalMinStat = stats.reduce((prev, stat) => {
    return prev + getMinStat(stat);
  }, 0);

  return (
    <>
      <button
        onClick={() =>
          setLevel(level => (level <= 100 && level >= 60 ? level - 10 : level))
        }
      >
        -
      </button>
      <span>Level {level}</span>
      <button
        onClick={() =>
          setLevel(level => (level <= 90 && level >= 50 ? level + 10 : level))
        }
      >
        +
      </button>
      <PokemonStatsWrapper>
        <thead>
          <tr>
            <th></th>
            <th>Base stats</th>
            <th>Range at lvl. {level}</th>
          </tr>
        </thead>

        <tbody>
          {stats.map(s => (
            <PokemonStat
              key={s.stat.url}
              stat={s}
              level={level}
              maxStat={getMaxStat(s)}
              minStat={getMinStat(s)}
            ></PokemonStat>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>Total</td>
            <td>{totalBaseStats}</td>

            <td>
              <span>{totalMinStat}-</span>
              <span>{totalMaxStat}</span>
            </td>
          </tr>
        </tfoot>
      </PokemonStatsWrapper>
    </>
  );
};

export default PokemonStats;

const PokemonStatsWrapper = styled.table`
  & > thead > tr {
    & > th:nth-child(1) {
      width: 10%;
    }
    & > th:nth-child(2) {
      text-align: left;
    }
    & > th:nth-child(3) {
      width: 40%;
    }
    & > th {
      font-size: 0.7em;
      border-bottom: 0.01em solid #353535;
      margin-block: 0.6em;
      padding-block: 0.5em;
    }
  }

  & tr > td:nth-child(1) {
    font-size: 0.7em;
    text-transform: uppercase;
  }

  tbody > tr:first-child > td {
    padding-top: 0.3em;
  }
  tbody tr:last-child > td {
    padding-bottom: 0.3em;
  }

  & > tfoot {
    & > tr > td:nth-child(2) {
      text-align: left;
    }
    & > tr > td {
      border-top: 0.01em solid #353535;
      padding: 0.3em;
      font-size: 0.8em;
    }
  }
`;
