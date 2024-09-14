import { Router } from 'express';
import { getHouses, getHouseById, addReview } from '../controllers/houseControllers';

const router = Router();

router.get('/houses', getHouses);
router.get('/houses/:id', getHouseById);
router.post('/houses/:id/reviews', addReview);

export default router;
