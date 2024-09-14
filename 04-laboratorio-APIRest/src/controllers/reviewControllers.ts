
import { Request, Response } from 'express';
import { houses } from '../data/houseData';
import { getCurrentDate } from '../helpers/dateHelper';
import { isValidReview } from '../helpers/validationReviewHelper';

export const addReview = (req: Request, res: Response) => {
  const houseId = req.params.id;
  const { name, comments } = req.body;

  if (!isValidReview(name, comments)) {
    return res.status(400).json({ message: 'Invalid review data' });
  }

  const house = houses.find((h) => h._id === houseId);

  if (!house) {
    return res.status(404).json({ message: 'House not found' });
  }

  const newReview = {
    _id: (house.reviews.length + 1).toString(),
    date: getCurrentDate(),
    reviewer_name: name,
    comments: comments,
  };

  house.reviews.push(newReview);

  return res.status(201).json(newReview);
};
