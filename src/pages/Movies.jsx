import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchMovieByName } from '../services/api';
import SearchBar from '../components/SearchBar';
import css from '../components/MovieList/MovieList.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  //const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query') ?? '';
    if (!query) return;
    const getMovie = async () => {
      try {
        //setError(false);
        setLoading(true);
        const { results } = await fetchMovieByName(query);
        if (results.length === 0) {
          toast.dismiss();
          toast.error('No movies found');
          setMovies([]);
        } else {
          setMovies(results);
          setLoading(false);
        }
      } catch (error) {
        //setError(true);
        toast.error(error.message);
        setMovies([]);
      }
    };

      getMovie();
  }, [searchParams]);

  const handleSubmit = query => {
    setSearchParams({ query });
  };

  if(isLoading) {
    return (<ThreeDots
    height="80" 
    width="80" 
    radius="9"
    color="#4fa94d" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{ justifyContent: 'center' }}
  />);
}

  return (
    <main>
      <section>
        <h1 style={{ margin: '10px' }}>Movies Page</h1>
        <SearchBar onSubmit={handleSubmit} /> 
        <ul className={css.listMovies}>
          {movies.map(movie => (
            <li className={css.itemMovies} key={movie.id}>
              <Link className={css.linkMovies} to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Movies;