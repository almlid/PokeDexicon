import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useAxios<T = any>(endpoint: string, deps?: any[]) {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const getData = async (endpoint: string) => {
    setLoading(true);
    return await axios
      .get(endpoint)
      .then(res => setResponse(res.data))

      .catch(setError)

      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData(endpoint);
  }, deps);

  return { response, error, loading };
}
