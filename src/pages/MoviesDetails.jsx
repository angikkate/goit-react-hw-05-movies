import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { fetchMovieById } from '../services/api';
import MovieCard from '../components/MovieCard';
import css from './MovieDetails.module.css';
import { ThreeDots } from 'react-loader-spinner';

const MovieDelails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    const fetchSelectedMovie = async movieId => {
      try {
        const movieData = await fetchMovieById(movieId);
        setSelectedMovie(movieData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSelectedMovie(movieId);
  }, [movieId]);

  return (
    <main>
      <div className={css.container}>

        <Link className={css.linkBack} to={location?.state?.from ?? '/'}>
          <button className={css.buttonBack} type="button">
            <BsArrowLeftShort
              style={{ width: '25px', height: '25px', display: 'inline-block' }}
            />
            Go back
          </button>
        </Link>

        <MovieCard movie={selectedMovie} />

        <Suspense fallback={<ThreeDots
            height="80" 
            width="80" 
            radius="9"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: 'center' }}
        />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default MovieDelails;