
import { Router } from 'express';
import { addReview } from '../controllers/reviewControllers';

const router = Router();

router.post('/houses/:id/reviews', addReview);

export default router;
