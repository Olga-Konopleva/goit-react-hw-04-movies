import axios from 'axios';
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

const Cast = lazy(() =>
  import('../components/Cast/Cast' /* webpackChunkName: "home-page" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews/Reviews' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => setMovie(data));
  }, []);

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
  };

  const {
    original_title: title,
    release_date: releaseDate,
    vote_average: voteAvarage,
    poster_path: posterPath,
    overview,
    genres,
  } = movie;

  const shouldDetailesRender =
    title && releaseDate && voteAvarage && overview && genres;

  return (
    <>
      {shouldDetailesRender ? (
        <>
          <div>
            <button type="button" onClick={handleGoBack}>
              Go back
            </button>
            <h1>{title}</h1>
            <img
              src={
                posterPath
                  ? `https://themoviedb.org/t/p/w500/${posterPath}`
                  : defaultImage
              }
              alt={title}
            />
            <p>User score: {voteAvarage * 10} %</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            {genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
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
      ) : (
        <div>
          <p>Not found</p>
          <button type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
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
