import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { fetchMoviesSearch } from '../services/api';
import queryString from 'query-string';
import SearchForm from '../components/SearchForm/SearchForm';
import styles from '../page/HomePage/HomePage.module.scss';
import defaultImage from '../images/notFoundImage.jpg';

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

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      <ul className={styles.gallery}>
        {films.map(({ id, title, backdrop_path }) => (
          <li key={id} className={styles.galleryItem}>
            <Link
              to={{
                pathname: `${match.url}/${id}`,
                state: {
                  from: location,
                  querySearch,
                },
              }}
            >
              <img
                className={styles.galleryImg}
                src={
                  backdrop_path
                    ? `https://themoviedb.org/t/p/w300/${backdrop_path}`
                    : defaultImage
                }
                alt={title}
              />
              <p className={styles.galleryTitle}> {title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesPage;
