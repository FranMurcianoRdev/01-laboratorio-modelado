
import e, { Router } from "express";
import { addReviewToHouse, getHouse, getHouseList } from "../data/houseMock";

const houseApi = Router();

houseApi
  //obtener un filtrado de casas por pais (si no se selecciona, se pondrá un listado de todas)
  .get("/", async (req, res) => {
    const houseList = await getHouseList();
    const { country } = req.query;  // Obtenemos el parámetro de consulta 'country'

    if (country) {
      // Si se proporciona un país, filtramos por él
      const filteredHouses = houseList.filter(
        house => house.country.toLowerCase() === String(country).toLowerCase()
      );
      res.send(filteredHouses);
    } else {
      // Si no se proporciona un país, devolvemos todas las casas
      res.send(houseList);
    }
  })

  //Obtener el detalle de una casa por su id
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const houseId = String(id);
    const house = await getHouse(houseId);
    res.send(house);
  })

  //Añadir una review a una casa: 
  .post("/:id/reviews", async (req, res) => {
    const { id } = req.params;
    const review = req.body;

    console.log("Received review body:", review); // Debug: Verifica lo que se está recibiendo

    if (!review.name || !review.comment) {
      return res.status(400).send({ message: "La reseña debe tener un nombre y un comentario." });
    }

    try {
      const updatedHouse = addReviewToHouse(id, review);

      if (!updatedHouse) {
        return res.status(404).send({ message: "Casa no encontrada." });
      }

      res.status(201).send(updatedHouse); // Enviamos la casa actualizada
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: "Error desconocido" });
      }
    }
  });

export default houseApi;

