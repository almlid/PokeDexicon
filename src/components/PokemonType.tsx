import styled from "styled-components";
import { typeColors } from "../data/typeColors";
import { IType } from "../interfaces/IPokemon";

interface IPokemonType {
  typeName: string;
}

const PokemonType = ({ typeName }: IPokemonType) => {
  const typeColor = typeColors.find(type => type.name === typeName)?.color;

  return (
    <div>
      {typeColor && (
        <PokemonTypeWrapper typeColor={typeColor} typeName={typeName}>
          <span>{typeName}</span>
        </PokemonTypeWrapper>
      )}
    </div>
  );
};

export default PokemonType;

interface IPokemonTypeWrapper {
  typeColor: string;
  typeName: string;
}

const PokemonTypeWrapper = styled.span<IPokemonTypeWrapper>`
  background-color: ${({ typeColor }) => typeColor}33;
  margin: 0.5em;
  padding: 0.5em;
  text-transform: uppercase;
  font-size: 0.6em;
  border-radius: 0.3em;
  color: ${({ typeColor }) => typeColor};
  align-items: center;
  justify-content: center;
  display: inline-flex;

  & > span {
    color: ${({ typeColor }) => typeColor};
    filter: invert(0.2) brightness(0.5);
  }
`;
