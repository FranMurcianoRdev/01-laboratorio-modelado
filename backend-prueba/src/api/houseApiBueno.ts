
import { Router } from "express";
import {houseToHouseApiList} from "../mappers/houseMapperPrincipal"
import { houseToHouseApiDetail } from "../mappers/houseMapper";
import { Review } from "../model/houseModel";

const houseApi = Router();

  houseApi
  //listado de las casas
  .get("/", async (req, res) => {
    try {
      const db = req.app.locals.db;
      const houses = await db.collection('listingsAndReviews').find().toArray();
      
      // Usamos el mapper para devolver solo lo que necesitamos en la página principal
      const houseList = houses.map(houseToHouseApiList);
      
      res.send(houseList);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener las casas" });
    }
  })
  //obtener el detalle de una casa
  .get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = req.app.locals.db;
      
      // Si el _id es un string en tu base de datos, no necesitas convertirlo a ObjectId
      const house = await db.collection('listingsAndReviews').findOne({ _id: id });
  
      if (!house) {
        return res.status(404).send({ message: "Casa no encontrada" });
      }
  
      // Usamos el mapper para devolver el detalle de la casa
      const houseDetail = houseToHouseApiDetail(house);
  
      res.send(houseDetail);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener la casa" });
    }
  })
  //para insertar una review en la casa
  .post("/:id/reviews", async (req, res) => {
    const { id } = req.params;
    const { name, comment } = req.body;
  
    // Validación para asegurarnos de que se proporciona un nombre y un comentario
    if (!name || !comment) {
      return res.status(400).send({ message: "La reseña debe tener un nombre y un comentario." });
    }
  
    try {
      const db = req.app.locals.db;
  
      // Encontrar la casa para obtener la cantidad actual de reseñas
      const house = await db.collection('listingsAndReviews').findOne({ _id: id });
  
      if (!house) {
        return res.status(404).send({ message: "Casa no encontrada." });
      }
  
      const reviewId = String(house.reviews.length + 1); // ID de la nueva reseña basado en la longitud actual
  
      const newReview: Review = {
        _id: reviewId, // Genera el ID como un string basado en la cantidad de reseñas
        name,
        comment,
        date: new Date(), // Se genera automáticamente la fecha
      };
  
      // Insertar la nueva reseña
      const result = await db.collection('houses').updateOne(
        { _id: id },
        { $push: { reviews: newReview } }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).send({ message: "Casa no encontrada." });
      }
  
      res.status(201).send({ message: "Reseña añadida con éxito", review: newReview });
    } catch (error) {
      res.status(500).send({ message: "Error al añadir la reseña", error });
    }
  });
  

export default houseApi;