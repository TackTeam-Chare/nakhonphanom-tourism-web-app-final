"use client"
// pages/tourism.js
import { useEffect, useState } from 'react';
import { fetchTourismData } from '../utils/api';

const TourismPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchTourismData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Tourism Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TourismPage;
