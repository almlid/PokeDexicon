import PokeApiService from "./services/PokeApiService";
import "./App.css";
import { useState, useEffect } from "react";
import { IPokemonPreview } from "./components/PokemonPreview";
import { IPokemon } from "./interfaces/IPokemon";
import styled from "styled-components";
import PokedexEntries from "./components/PokedexEntries";
import Pokemon from "./components/Pokemon";

function App() {
  const [results, setResults] = useState<IPokemonPreview[]>();
  const [selectedEntry, setSelectedEntry] = useState<IPokemon | any>();
  const getPokemon = async () => {
    return await PokeApiService.getData("pokemon").then(res => {
      setResults(res.results);
    });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="App">
      <PokedexWrapper>
        {selectedEntry && <Pokemon {...selectedEntry} />}
        {results && (
          <PokedexEntries
            results={results}
            setSelectedEntry={setSelectedEntry}
          ></PokedexEntries>
        )}
      </PokedexWrapper>
    </div>
  );
}

const PokedexWrapper = styled.div`
  display: grid;

  grid-template-areas:
    "header header"
    "selectedEntry searchResults";
  grid-gap: 1em;
`;

export default App;
