
import { Review } from '../models/reviewModel';
import { ReviewApiModel } from '../models/reviewApiModel';

export const reviewMapper = (review: Review): ReviewApiModel => {
  return {
    id: review._id,
    reviewer_name: review.reviewer_name,
    comments: review.comments,
    date: new Date(review.date).toISOString(),
  };
};
