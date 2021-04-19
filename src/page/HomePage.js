import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { popularFilmsApi } from '../services/api';

const HomePage = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const location = useLocation();

  useEffect(() => {
    popularFilmsApi().then(({ results }) => setPopularFilms(results));
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      <ul>
        {popularFilms.map(({ id, title, name }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: location,
                },
              }}
            >
              {title || name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
