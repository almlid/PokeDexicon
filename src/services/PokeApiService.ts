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

  const getDataByUrl = async (url: string) => {
    try {
      return await axios.get(url).then(res => res.data);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };
  return { getData, getDataByUrl };
})();

export default PokeApiService;
