
import { Router } from "express";
import {houseToHouseApiList} from "../mappers/houseMapperPrincipal"
import { houseToHouseApiDetail } from "../mappers/houseMapper";
import { createCountryFilter } from "../helpers/countryFilterHelper";
import { isValidReview } from "../helpers/validationHelper";

const houseApi = Router();

  houseApi
  //listado de las casas
  .get("/", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit as string) || 10; // Número de elementos por página, por defecto 10
    const country = req.query.country as string; // Filtro por país, opcional
  
    try {
      const db = req.app.locals.db;
      
      // Validar que page y limit sean positivos
      if (page <= 0 || limit <= 0) {
        return res.status(400).send({ message: "La página y el límite deben ser números positivos." });
      }
  
      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;
  
      // Construir el filtro de consulta
      const query: any = {};
      if (country) {
        query["address.country"] = country;
      }
  
      // Consultar las casas con paginación y filtro
      const houses = await db.collection('listingsAndReviews')
        .find(query)
        .skip(skip) // Saltar documentos
        .limit(limit) // Limitar el número de documentos
        .toArray();
  
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
    const { name, comment } = req.body; // Extrae name y comment
  
    if (!isValidReview({ name, comment })) { // Asegúrate de que isValidReview acepte los parámetros correctos
      return res.status(400).send({ message: "La reseña debe tener un nombre y un comentario." });
    }
  
    try {
      const db = req.app.locals.db;
  
      const house = await db.collection('listingsAndReviews').findOne({ _id: id });
  
      if (!house) {
        return res.status(404).send({ message: "Casa no encontrada." });
      }
  
      const reviewId = String(house.reviews.length + 1); // ID basado en la cantidad actual de reseñas
  
      const newReview = {
        _id: reviewId,
        reviewer_name: name,  // Usa reviewer_name
        comments: comment,    // Usa comments
        date: new Date(),     // Fecha actual
      };
  
      // Insertar la nueva reseña en la primera posición
      const result = await db.collection('listingsAndReviews').updateOne(
        { _id: id },
        { $push: { reviews: { $each: [newReview], $position: 0 } } }
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