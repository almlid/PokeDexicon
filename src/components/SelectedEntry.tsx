import { FC, useEffect } from "react";
import { IPokemon } from "../interfaces/IPokemon";

const SelectedEntry = ({ name, id, ...rest }: IPokemon) => {
  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <div>
      {name && (
        <>
          <p>no.{id}</p>
          <p>{name}</p>

          <img src={rest.sprites.front_default} />
        </>
      )}
    </div>
  );
};

export default SelectedEntry;
