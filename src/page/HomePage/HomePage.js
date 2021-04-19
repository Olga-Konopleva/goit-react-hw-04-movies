import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { popularFilmsApi } from '../../services/api';
import styles from './HomePage.module.scss';
import defaultImage from '../../images/notFoundImage.jpg';

const HomePage = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const location = useLocation();

  useEffect(() => {
    popularFilmsApi().then(({ results }) => setPopularFilms(results));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Tranding today</h1>
      <ul className={styles.gallery}>
        {popularFilms.map(({ id, title, name, backdrop_path }) => (
          <li key={id} className={styles.galleryItem}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: {
                  from: location,
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
              <p className={styles.galleryTitle}> {title || name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
