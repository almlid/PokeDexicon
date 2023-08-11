import PokeApiService from "./services/PokeApiService";
import "./App.css";
import SearchResults from "./components/SearchResults";
import { useState, useEffect } from "react";
import { ISearchResult } from "./interfaces/ISearchResult";
import SelectedEntry from "./components/SelectedEntry";

function App() {
  const [results, setResults] = useState<ISearchResult[]>();
  const [selectedEntry, setSelectedEntry] = useState<any>();
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
      <p>Hello World</p>

      <SelectedEntry {...selectedEntry} />

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
