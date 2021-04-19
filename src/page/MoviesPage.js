import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { API_KEY } from '../apiKey';
import queryString from 'query-string';

const MoviesPage = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [films, setFilms] = useState([]);
  const match = useRouteMatch();

  const history = useHistory();
  const [querySearch, setQuerySearch] = useState(queryParams?.query || '');

  useEffect(() => {
    if (querySearch) {
      history.push({
        ...location,
        search: `?query=${querySearch}`,
      });
      fetchFilms();
    }
  }, [querySearch]);

  //  useEffect(() => {
  //   fetchFilms();
  //  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    fetchFilms();
  };

  const fetchFilms = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${querySearch}&page=1&include_adult=false`,
    );
    setFilms(data.results);
  };

  const handleChange = e => setQuerySearch(e.target.value);

  return (
    <>
      <h1>Страница поиска фильмов</h1>
      <form onSubmit={handleSubmit}>
        <input value={querySearch} onChange={handleChange}></input>
        <button type="submit">Search</button>
      </form>
      <ul>
        {films.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={{
                pathname: `${match.url}/${id}`,
                state: {
                  from: location,
                  querySearch,
                },
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
