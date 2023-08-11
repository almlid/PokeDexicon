import { Dispatch, SetStateAction } from "react";
import { IPokemon } from "./IPokemon";

export interface ISearchResults<ISearchResult> {
  results: ISearchResult[];
  setSelectedEntry: Dispatch<SetStateAction<IPokemon>>;
}
