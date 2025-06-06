import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const LOCAL_CSV_URL = `${import.meta.env.BASE_URL}data/all_month.csv`;

export const useEarthquakeData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(LOCAL_CSV_URL);
        Papa.parse(response.data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map(row => ({
                ...row,
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                depth: parseFloat(row.depth),
                mag: parseFloat(row.mag),
            
                id: row.id || `<span class="math-inline">\{row\.time\}\-</span>{row.latitude}-${row.longitude}`,
            })).filter(row => row.latitude != null && row.longitude != null && row.mag != null); 


            setData(parsedData);
            setLoading(false);
          },
          error: (err) => {
            setError(`Parsing error: ${err.message}`);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(`Failed to fetch data: ${err.message || String(err)}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};