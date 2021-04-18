import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { API_KEY } from '../apiKey';

const HomePage = () => {
  const [popularFilms, setPopularFilms] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const { data } = await Axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
      );
      setPopularFilms([...data.results]);
      // console.log(data);
    }
    fetchApi();
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      <ul>
        {popularFilms.map(({ id, title, name }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title || name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
