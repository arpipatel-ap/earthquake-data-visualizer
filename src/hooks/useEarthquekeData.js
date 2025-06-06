import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

// URL to the local CSV file containing earthquake data
const LOCAL_CSV_URL = `${import.meta.env.BASE_URL}data/all_month.csv`;

// Custom React hook to load and parse earthquake data from a CSV file
export const useEarthquakeData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
        // Async function to fetch and parse CSV data
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the CSV file content as plain text
        const response = await axios.get(LOCAL_CSV_URL);

        // Parse the CSV data using PapaParse
        Papa.parse(response.data, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,

           // Callback on successful parsing
          complete: (results) => {

              // Map through parsed rows to enforce data types and add 'id' field
            const parsedData = results.data.map(row => ({
                ...row,
                latitude: parseFloat(row.latitude),
                longitude: parseFloat(row.longitude),
                depth: parseFloat(row.depth),
                mag: parseFloat(row.mag),
            
                // Generate a unique ID for each earthquake if not provided
                id: row.id || `<span class="math-inline">\{row\.time\}\-</span>{row.latitude}-${row.longitude}`,
                // Filter out any rows missing critical numeric data
            })).filter(row => row.latitude != null && row.longitude != null && row.mag != null); 

            // Update data state with cleaned parsed data
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