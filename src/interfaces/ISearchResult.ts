import { Dispatch, SetStateAction } from "react";
import { IPokemon } from "./IPokemon";

export interface ISearchResult {
  name: string;
  url: string;
  setSelectedEntry: Dispatch<SetStateAction<IPokemon>>;
}
