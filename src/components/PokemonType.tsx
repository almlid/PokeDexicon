import styled from "styled-components";
import { typeColors } from "../data/typeColors";

interface IPokemonType {
  typeName: string;
}

const PokemonType = ({ typeName }: IPokemonType) => {
  const typeColor = typeColors[typeName as keyof typeof typeColors];

  return (
    <PokemonTypeWrapper $typeColor={typeColor}>
      <span>{typeName}</span>
    </PokemonTypeWrapper>
  );
};

export default PokemonType;

interface IPokemonTypeWrapper {
  $typeColor: string;
}

const PokemonTypeWrapper = styled.span<IPokemonTypeWrapper>`
  background-color: ${({ $typeColor }) => $typeColor}33;
  margin: 0.5em;
  padding: 0.5em;
  text-transform: uppercase;
  font-size: 0.6em;
  border-radius: 0.3em;
  color: ${({ $typeColor }) => $typeColor};
  align-items: center;
  justify-content: center;
  display: inline-flex;

  & > span {
    color: ${({ $typeColor }) => $typeColor};
    filter: invert(0.2) brightness(0.5);
  }
`;