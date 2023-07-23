import PokeApiService from "./services/PokeApiService";
import "./App.css";

function App() {
  const getPokemon = () => {
    console.log(PokeApiService.getData("pokemon"));
  };

  getPokemon();

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
