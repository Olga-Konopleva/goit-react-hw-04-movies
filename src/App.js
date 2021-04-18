import { Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './page/HomePage';
import MoviesPage from './page/MoviesPage';
import MovieDetailsPage from './page/MovieDetailsPage';
import NotFoundPage from './page/NotFoundPage';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';

const App = () => (
  <>
    <ul>
      <li>
        <NavLink
          exact
          to="/"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className="NavLink"
          activeClassName="NavLink--active"
        >
          Movies
        </NavLink>
      </li>
    </ul>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies/:movieId" component={MovieDetailsPage} />
      <Route path="/movies" component={MoviesPage} />

      <Route path="/movies/:movieId/cast" component={Cast} />
      <Route path="/movies/:movieId/reviews" component={Reviews} />
      <Route component={NotFoundPage} />
    </Switch>
  </>
);

export default App;
