import { Request, Response } from 'express';
import { housesCollection, ObjectId } from '../config/db'; // Asegúrate de importar ObjectId
import { houseMapper } from '../mappers/houseMapper';
import { Review } from '../models/reviewModel';
import { reviewMapper } from '../mappers/reviewMapper';
import { paginate } from '../helpers/paginationHelper';

export const getHouses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const houses = await housesCollection.find({}).toArray();
    const paginatedHouses = paginate(houses, page, limit);
    const houseApiModels = paginatedHouses.data.map(houseMapper);
    res.json({
      ...paginatedHouses,
      data: houseApiModels
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const getHouseById = async (req: Request, res: Response) => {
  try {
    const houseId = req.params.id;
    const house = await housesCollection.findOne({ _id: new ObjectId(houseId) });
    if (house) {
      res.json(houseMapper(house));
    } else {
      res.status(404).send('House not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const houseId = req.params.id;
    const { reviewer_name, comments } = req.body;
    const review = {
      _id: new ObjectId(), // Genera un nuevo ObjectId
      date: new Date(),
      listing_id: houseId,
      reviewer_id: '', // Handle reviewer_id properly if needed
      reviewer_name,
      comments
    };
    await housesCollection.updateOne(
      { _id: new ObjectId(houseId) },
      { $push: { reviews: review } }
    );
    res.status(201).send('Review added');
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};
