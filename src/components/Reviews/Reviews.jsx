import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import css from './Reviews.module.css';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const { results } = await fetchMovieReviews(movieId);
        if (results.length === 0) {
          toast.dismiss();
          toast.error('No reviews found');
          setReviews([]);
          setLoading(false);
        } else {
          setReviews(results);
          setLoading(false);
        }
        
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setReviews([]);
      }
    };

    fetchReviews();
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
    < div className={css.wrapper}>
      <h3>Reviews</h3>
      {reviews.length ? (
        <ul className={css.reviewList}>
          {reviews.map(review => (
            <li className={css.reviewListItem} key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          We don't have any reviews for this movie yet.
        </p>
      )}
    </div>
  );
};
export default Reviews;
