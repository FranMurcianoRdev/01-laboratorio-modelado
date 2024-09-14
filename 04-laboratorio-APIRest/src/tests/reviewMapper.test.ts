// src/mappers/reviewMapper.test.ts

import { reviewMapper } from '../mappers/reviewMapper';
import { Review } from '../models/reviewModel';

describe('reviewMapper', () => {
  it('should map a Review to ReviewApiModel correctly', () => {
    const mockReview: Review = {
      _id: 'review_123',
      date: new Date('2022-01-01'),
      listing_id: 'listing_123',
      reviewer_id: 'reviewer_123',
      reviewer_name: 'John Doe',
      comments: 'Great place to stay!',
    };

    const result = reviewMapper(mockReview);

    expect(result).toEqual({
      id: 'review_123',
      reviewer_name: 'John Doe',
      comments: 'Great place to stay!',
      date: new Date('2022-01-01').toISOString(),
    });
  });
});
