import styled from "styled-components";
import { typeColors } from "../data/typeColors";

interface IPokemonType {
  typeName: string;
  size?: number;
  displayText?: boolean;
  displayIcon?: boolean;
}

const PokemonType = ({
  typeName,
  size,
  displayText,
  displayIcon,
}: IPokemonType) => {
  const typeColor = typeColors[typeName as keyof typeof typeColors];

  return (
    <PokemonTypeWrapper
      $typeColor={typeColor}
      className={`${size ? `type-size-${size}` : ""} ${
        displayIcon !== false && displayText === false ? "icon-only" : ""
      }`}
    >
      {displayIcon !== false && (
        <img
          style={{
            mask: `url(./images/icons/type-icons/${typeName}.svg) no-repeat center`,
            WebkitMask: `url(./images/icons/type-icons/${typeName}.svg) no-repeat center`,
            maskSize: "cover",
            WebkitMaskSize: "cover",
          }}
          alt=""
        />
      )}

      {displayText !== false && <span>{typeName}</span>}
    </PokemonTypeWrapper>
  );
};

export default PokemonType;

interface IPokemonTypeWrapper {
  $typeColor: string;
}

const PokemonTypeWrapper = styled.span<IPokemonTypeWrapper>`
  background-color: color-mix(
    in srgb,
    ${({ $typeColor }) => $typeColor},
    #fff 80%
  );

  text-transform: uppercase;
  border-radius: 2em;
  color: ${({ $typeColor }) => $typeColor};
  align-items: center;
  display: inline-flex;
  margin: 0.3em;
  padding: 0.5em 0.8em;
  font-size: 0.6em;
  &.icon-only {
    padding: 0.5em;
  }
  &.type-size {
    &-1,
    &-2,
    &-3 {
      margin: 0.1em;
    }
    &-1 {
      font-size: 0.8em;
    }
    &-2 {
      font-size: 0.9em;
    }
    &-3 {
      font-size: 1.2em;
    }
  }

  & > span {
    color: ${({ $typeColor }) => $typeColor};
    font-family: "Barlow-SemiBold";
    color: color-mix(in srgb, ${({ $typeColor }) => $typeColor}, #000000 30%);
    margin-left: 0.3em;
    margin-inline: 0.4em;
  }

  & > img {
    padding: 0.4em;
    width: 0px;
    height: 0px;
    background-color: color-mix(
      in srgb,
      ${({ $typeColor }) => $typeColor},
      #00000050 50%
    );
  }
`;
