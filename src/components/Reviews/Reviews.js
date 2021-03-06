import { useEffect, useState } from 'react';
import { movieReviews } from '../../services/api';
import PropTypes from 'prop-types';

const Reviews = ({ movieId }) => {
  const [reviewsMovie, setReviewsMovie] = useState([]);

  useEffect(() => {
    movieReviews(movieId).then(({ results }) => {
      if (results) {
        console.log(results);
        setReviewsMovie(results);
      }
    });
  }, []);

  return (
    <div>
      {reviewsMovie.length > 0 ? (
        <ul>
          {reviewsMovie.map(({ author, content, id }) => (
            <li key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Reviews;
