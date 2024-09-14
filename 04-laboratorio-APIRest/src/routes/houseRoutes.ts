
// src/routes/houseRoutes.ts
import express from 'express';
import { getAllHouses, getHouseById, addReview } from '../controllers/houseControllers';

const router = express.Router();

// Listado de casas
router.get('/houses', getAllHouses);

// Detalle de una casa
router.get('/houses/:id', getHouseById);

// Añadir una review
router.post('/houses/:id/reviews', addReview);

export default router;
