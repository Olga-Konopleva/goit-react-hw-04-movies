import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import { API_KEY } from '../apiKey';
import defaultImage from '../images/notFoundImage.jpg';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const match = useRouteMatch();

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    );
    setMovie(data);
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
      {shouldDetailesRender && (
        <div>
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
      )}
      <div>
        <h3>Additional informations</h3>
        <ul>
          <li>
            <NavLink to={`${match.url}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`${match.url}/reviews`}>Reviews</NavLink>
          </li>
        </ul>
      </div>
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
    </>
  );
};

export default MovieDetailsPage;
