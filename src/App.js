import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import routes from './routes';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() =>
  import('./page/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./page/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './page/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const NotFoundPage = lazy(() =>
  import('./page/NotFoundPage' /* webpackChunkName: "not-found-page" */),
);

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Route path={routes.movies} component={MoviesPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
