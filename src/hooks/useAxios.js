import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxios = (url, method, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await axios({
        method,
        url,
        headers,
      });

      setData(response.data.data);
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [url, method, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useAxios;
