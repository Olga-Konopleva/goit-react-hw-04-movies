import axios from 'axios';
import { API_KEY } from '../apiKey';

export const movieCast = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
    .then(({ data }) => data)
    .catch(console.log);
};

export const movieReviews = id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
    )
    .then(({ data }) => data)
    .catch(console.log);
};
