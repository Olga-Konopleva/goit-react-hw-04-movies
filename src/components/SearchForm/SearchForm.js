import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [querySearch, setQuerySearch] = useState('');
  const handleChange = e => setQuerySearch(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(querySearch);
    setQuerySearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={querySearch} onChange={handleChange}></input>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
