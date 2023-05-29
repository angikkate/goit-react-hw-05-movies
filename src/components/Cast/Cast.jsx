import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/api';
import css from './Cast.module.css';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCast = async () => {
      try {
        const { cast } = await fetchMovieCast(movieId);
        if (cast.length === 0) {
          toast.dismiss();
          toast.error('No cast found');
          setCast([]);
          setLoading(false);
        } else {
          setCast(cast);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setCast([]);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return (
      <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
      />
    );
  }

  return (
    <div className={css.wrapper}>
      <h3>Cast</h3>
      {cast.length ? (
        <ul className={css.castList}>
        {cast.map(actor => (
          <li className={css.castListItem} key={actor.id}>
            <img className={css.img}
              src={actor.profile_path ?`https://image.tmdb.org/t/p/w200${actor.profile_path}`: `https://via.placeholder.com/200x300?text=No+Image`} 
              alt={`${actor.name} profile`}
            />
            <p className={css.name}>{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
      ) : (
        <p>
          We don't have any information about the cast yet.
        </p>
      )}
    </div>
  );
};

export default Cast;