import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        exact
        to={routes.home}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        Home
      </NavLink>
      <NavLink
        to={routes.movies}
        className={styles.NavLink}
        activeClassName={styles.NavLinkActive}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
