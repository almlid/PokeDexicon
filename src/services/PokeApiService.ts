import axios from "axios";

export const axiosConfig = {
  baseUrl: "https://pokeapi.co/api/v2/",
};

const PokeApiService = (() => {
  const getData = async (endpoint: string) => {
    try {
      return await axios
        .get(`${axiosConfig.baseUrl}${endpoint}`)
        .then(res => res.data);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  return { getData };
})();

export default PokeApiService;
