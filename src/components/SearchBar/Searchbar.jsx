import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    if(query.trim() === '') {
        return toast.error('Enter text for search.');
    }    
    onSubmit(query);
    setQuery('');
  }

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus 
          placeholder="Search images and photos"
          name="search"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={css.searchButton}>
          <label className={css.searchButtonLabel}>Search</label>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;