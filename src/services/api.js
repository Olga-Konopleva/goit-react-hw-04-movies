import axios from 'axios';
import { API_KEY } from '../apiKey';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const popularFilmsApi = () => {
  return axios
    .get(`/trending/all/day?api_key=${API_KEY}`)
    .then(({ data }) => data)
    .catch(console.log);
};

export const fetchMovieDetails = async id => {
  try {
    return await axios
      .get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(({ data }) => data);
  } catch (error) {
    throw error;
  }
};

export const fetchMoviesSearch = async search => {
  return await axios
    .get(
      `/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
    )
    .then(({ data }) => data)
    .catch(console.log);
};

export const movieCast = id => {
  return axios
    .get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data)
    .catch(console.log);
};

export const movieReviews = async id => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`,
    )
    .then(({ data }) => data)
    .catch(console.log);
};
