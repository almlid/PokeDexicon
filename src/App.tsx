import PokeApiService from "./services/PokeApiService";
import "./App.css";
import SearchResults from "./components/SearchResults";
import { useState, useEffect } from "react";
import { ISearchResult } from "./interfaces/ISearchResult";
import SelectedEntry from "./components/SelectedEntry";
import { IPokemon } from "./interfaces/IPokemon";

function App() {
  const [results, setResults] = useState<ISearchResult[]>();
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
      {selectedEntry && <SelectedEntry {...selectedEntry} />}

      {results && (
        <SearchResults
          results={results}
          setSelectedEntry={setSelectedEntry}
        ></SearchResults>
      )}
    </div>
  );
}

export default App;
