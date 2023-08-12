import { useEffect } from "react";
import { IPokemon } from "../interfaces/IPokemon";
import { styled } from "styled-components";
import PokemonType from "./PokemonType";

const SelectedEntry = ({
  name,
  id,
  types,
  height,
  stats,
  weight,
  abilities,
  ...rest
}: IPokemon) => {
  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <SelectedEntryWrapper>
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
              <PokemonType typeName={t.type.name} />
            ))}
          </div>

          <div>
            <p>Base stats:</p>
            {stats.map(s => (
              <p key={s.stat.url}>
                {s.stat.name}: {s.base_stat}
              </p>
            ))}
          </div>
        </>
      )}
    </SelectedEntryWrapper>
  );
};

const SelectedEntryWrapper = styled.section`
  grid-area: selectedEntry;
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
`;

export default SelectedEntry;
