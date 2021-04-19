import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import defaultImage from '../images/notFoundImage.jpg';
import routes from '../routes';

import Button from '@material-ui/core/Button';

const Cast = lazy(() =>
  import('../components/Cast/Cast' /* webpackChunkName: "home-page" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews/Reviews' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = () => {
    fetchMovieDetails(movieId)
      .then(movie => setMovie(movie))
      .catch(error => setError(error));
  };

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };

  // const {
  //   original_title: title,
  //   release_date: releaseDate,
  //   vote_average: voteAvarage,
  //   poster_path: posterPath,
  //   overview,
  //   genres,
  // } = movie;

  // const shouldDetailesRender =
  //   title && releaseDate && voteAvarage && overview && genres;

  return (
    <>
      {error ? (
        <div>
          <p>Not found</p>
          <button type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      ) : (
        <>
          <div>
            <Button
              type="button"
              onClick={handleGoBack}
              variant="outlined"
              color="primary"
            >
              Go back
            </Button>

            <img
              src={
                movie.poster_path
                  ? `https://themoviedb.org/t/p/w500/${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.title}
            />
            <h1>{movie.title}</h1>
            <p>User score: {movie.vote_average * 10} %</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            {movie.genres &&
              movie.genres.map(genre => <p key={genre.id}>{genre.name}</p>)}
          </div>
          <div>
            <h3>Additional informations</h3>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/cast`,
                    state: {
                      from: location && location.state && location.state.from,
                    },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: {
                      from: location && location.state && location.state.from,
                    },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      )}

      <Suspense fallback={<h1>Loading...</h1>}>
        <Route
          path={`${match.path}/cast`}
          render={props => {
            const movieIdCast = Number(match.params.movieId);
            return <Cast {...props} movieId={movieIdCast} />;
          }}
        />
        <Route
          path={`${match.path}/reviews`}
          render={props => {
            const movieIdCast = Number(match.params.movieId);
            return <Reviews {...props} movieId={movieIdCast} />;
          }}
        />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
