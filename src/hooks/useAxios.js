import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, method, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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
    };

    fetchData();
  }, [url, method, token]);

  return { data, error, loading };
};

export default useAxios;
