import { useEffect } from "react";
import { IPokemon } from "../interfaces/IPokemon";

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
    <div>
      {name && (
        <>
          <p>no.{id}</p>
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

          <p>{name}</p>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>

          <p>Abilities:</p>
          {abilities.map(a => (
            <p key={a.ability.url}>{a.ability.name}</p>
          ))}

          <p>Types:</p>
          {types.map(t => (
            <p key={t.type.url}>{t.type.name}</p>
          ))}

          <p>Base stats:</p>
          {stats.map(s => (
            <p key={s.stat.url}>
              {s.stat.name}: {s.base_stat}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default SelectedEntry;
