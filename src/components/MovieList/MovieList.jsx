import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';


const MovieList = ({ trendingMovies }) => {
  return (
    <section>
      <h1 style={{ margin: '10px' }}>Trending Today</h1>
      <ul className={css.listMovies} >
        {trendingMovies.map(trendingMovie => (
          <li className={css.itemMovies} key={trendingMovie.id}>
            <Link className={css.linkMovies} to={`/movies/${trendingMovie.id}`}>
              {trendingMovie.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieList;

MovieList.propTypes = {
  trendingMovies: PropTypes.arrayOf(
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
