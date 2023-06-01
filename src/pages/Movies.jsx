import React, { useState, useEffect, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByName } from '../services/api';
import SearchBar from '../components/SearchBar';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
const MovieList = lazy(() => import ('../components/MovieList'));

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get('query') ?? ''; console.log(query);
    if (!query) return;
    const getMovie = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await fetchMovieByName(query);
        setMovies(results);
      } catch (error) {
        setError(true);
        toast.error('No movies found');
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
  }, [searchParams]);


  const handleSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <main>
      <section>
        <SearchBar onSubmit={handleSubmit} /> 
        {isLoading ? (
        <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
      />
      ) : error ? (
        <p>
          Sorry, we could not fetch the movies. Please try again later.
        </p>
      ) : (
        <MovieList movies={movies} title={'Movies Page'}/>
      )}
      </section>
    </main>
  );
};

export default Movies;