import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.scss';
import Button from '@material-ui/core/Button';

const SearchForm = ({ onSubmit }) => {
  const [querySearch, setQuerySearch] = useState('');
  const handleChange = e => setQuerySearch(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(querySearch);
    setQuerySearch('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.form__input}
          value={querySearch}
          onChange={handleChange}
          placeholder="Search Movie"
        ></input>
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
