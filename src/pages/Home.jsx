import { useEffect, useState, lazy } from 'react';
import { fetchTrendMovies } from '../services/api';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const MovieList = lazy(() => import ('../components/MovieList'));

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await fetchTrendMovies();
        setTrendingMovies(results);
      } catch (error) {
        setError(true);
        toast.error('No movies found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
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
          Sorry, we could not fetch the trending movies. Please try again later.
        </p>
      ) : (
        <MovieList movies={trendingMovies} title={'Trending Today'}/>
      )}
    </>
  );
};

export default Home;