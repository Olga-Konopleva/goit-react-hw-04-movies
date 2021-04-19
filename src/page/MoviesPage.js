import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { fetchMoviesSearch } from '../services/api';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm/SearchForm';

const MoviesPage = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const queryParams = queryString.parse(location.search);
  const [films, setFilms] = useState([]);
  const [querySearch, setQuerySearch] = useState(queryParams?.query || '');

  useEffect(() => {
    if (querySearch) {
      history.push({
        ...location,
        search: `?query=${querySearch}`,
      });
      getMoviesByQuery();
    }
  }, [querySearch]);

  const getMoviesByQuery = () =>
    fetchMoviesSearch(querySearch).then(({ results }) => setFilms(results));

  const handleSubmit = query => {
    setQuerySearch(query);
    if (query !== querySearch) {
      setFilms([]);
    }
  };

  // const fetchFilms = async (query) => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  //   );
  //   setFilms(data.results);
  // };

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
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
