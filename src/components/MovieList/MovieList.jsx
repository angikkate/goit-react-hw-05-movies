import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies, title }) => {
  //console.log(movies);
  return (
    <section>
      <h1 style={{ margin: '10px' }}>{title}</h1>
      <ul className={css.listMovies} >
        {movies.map(movie => (
          <li className={css.itemMovies} key={movie.id}>
            <Link className={css.linkMovies} to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieList;

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
};
