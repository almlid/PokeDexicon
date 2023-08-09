import PokeApiService from "./services/PokeApiService";
import "./App.css";
import SearchResults from "./components/SearchResults";
import { useState, useEffect } from "react";
import { ISearchResult } from "./interfaces/ISearchResult";

function App() {
  const [results, setResults] = useState<ISearchResult[]>();
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
      {results && <SearchResults results={results}></SearchResults>}
    </div>
  );
}

export default App;
