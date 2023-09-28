import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (endpoint: string, deps?: any[]): unknown | Error => {
  const [data, setData] = useState();

  const getData = async (endpoint: string) => {
    return await axios
      .get(endpoint)
      .then(res => setData(res.data))

      .catch((err: any) => {
        return Promise.reject(err);
      });
  };

  useEffect(() => {
    getData(endpoint);
  }, deps);

  return data;
};
