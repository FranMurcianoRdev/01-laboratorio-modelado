
// src/controllers/houseController.ts
import { Request, Response } from 'express';
import { getCollection } from '../config/db';
import { houseMapper } from '../mappers/houseMapper';
import { ObjectId } from 'mongodb';

// Obtener listado de casas
export const getAllHouses = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection('houses');
    const houses = await collection.find().toArray();
    
    // Mapea los datos del modelo a un formato de API
    const housesApiModel = houses.map(houseMapper);
    
    res.json(housesApiModel);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las casas' });
  }
};

// Obtener detalle de una casa
export const getHouseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await getCollection('houses');
    
    const house = await collection.findOne({ _id: new ObjectId(id) });
    if (!house) {
      return res.status(404).json({ message: 'Casa no encontrada' });
    }

    // Mapea los datos del modelo a un formato de API
    const houseApiModel = houseMapper(house);

    res.json(houseApiModel);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la casa' });
  }
};

// Añadir una review a una casa
export const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reviewer_name, comments } = req.body;
    
    const collection = await getCollection('houses');
    
    // Crear la nueva reseña
    const newReview = {
      _id: new ObjectId().toString(),
      reviewer_name,
      comments,
      date: new Date(),
    };

    // Actualizar la casa agregando la nueva reseña
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { reviews: newReview } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Casa no encontrada' });
    }

    res.json({ message: 'Reseña añadida correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir la reseña' });
  }
};
