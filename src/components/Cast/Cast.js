import { useState, useEffect } from 'react';
import { movieCast } from '../../services/api';
import defaultImage from '../../images/notFoundImage.jpg';

const Cast = ({ movieId }) => {
  const [castMovie, setCastMovie] = useState([]);
  // console.log(movieId);

  useEffect(() => {
    movieCast(movieId).then(({ cast }) => {
      if (cast) {
        setCastMovie(cast);
      }
    });
  });

  return (
    <>
      <div>
        {castMovie.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? `https://themoviedb.org/t/p/w200/${profile_path}`
                  : defaultImage
              }
            />
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </div>
    </>
  );
};

export default Cast;
