import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import css from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const { title, release_date, poster_path, vote_average, overview, genres } =
  movie;
  const location = useLocation();
  const releaseDate = new Date(release_date);

  const releaseYear = isNaN(releaseDate)
    ? 'Unknown'
    : releaseDate.getFullYear();

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w400/${poster_path}`
    : 'https://via.placeholder.com/400x600.png?text=Poster+Not+Available';

  const userScore = vote_average
    ? `${(vote_average * 10).toFixed(0)}%`
    : 'Not rated yet';

  if (!title) {
    return <ThreeDots
    height="80" 
    width="80" 
    radius="9"
    color="#4fa94d" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{ justifyContent: 'center' }}
  />;
  }

  return (
    <>
      <div className={css.movieCardContainer}>
        <img src={posterUrl} alt={`${title} poster`} />

        <div className={css.movieInfo}>
          <h2 className={css.movieName}>
            {title ?? 'Unknown'} ({releaseYear})
          </h2>
          <p className={css.movieInfoText}><b>User Score:</b> {userScore}</p>
          <p className={css.movieInfoText}><b>Overview:</b> {overview}</p>
          
          {genres && genres.length > 0 && (
            <p className={css.movieInfoText}>
              <b>Genres: </b>
              {genres.map(genre => genre.name).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className={css.moreInfoWrapper}>
        <h3 className={css.moreInfoHeader}>Additional information</h3>

        <ul className={css.list}>
          <li className={css.listItem}>
            <Link className={css.link}
              to="cast"
              state={{ from: location?.state?.from ?? '/' }}
            >
              Cast
            </Link>
          </li>

          <li className={css.listItem}>
            <Link className={css.link}
              to="reviews"
              state={{ from: location?.state?.from ?? '/' }}
            >
              Reviews
            </Link>
          </li>
        </ul>

      </div>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string.isRequired })
    ),
  }).isRequired,
};

export default MovieCard;