import "./App.css";
import { useState } from "react";
import { IPokemon } from "./interfaces/IPokemon";
import styled from "styled-components";
import Pokemon from "./components/Pokemon";
import SearchSection from "./components/SearchSection";
import "./assets/styles/global.scss";

function App() {
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | any>();

  return (
    <div className="App">
      <PokedexWrapper>
        {currentPokemon && <Pokemon {...currentPokemon} />}

        <SearchSection setCurrentPokemon={setCurrentPokemon} />
      </PokedexWrapper>
    </div>
  );
}

const PokedexWrapper = styled.div`
  font-family: "Barlow", sans-serif;

  display: grid;
  grid-template-areas:
    "header header"
    "pokemon searchSection";
  grid-gap: 1em;
  width: 80vw;
  min-width: 820px;
  max-width: 1160px;
  margin-inline: auto;
  display: flex;
`;

export default App;
