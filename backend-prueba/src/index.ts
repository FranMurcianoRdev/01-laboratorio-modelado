import express from "express"; 
import houseApi from "./api/houseApi";  // Cambié 'booksApi' a 'houseApi' para consistencia

const app = express();
const port = 3000;

app.use(express.json());  // Middleware para manejar JSON

app.get("/", (req, res) => {
  res.send("My awesome house portal");
});

// Usar la API de casas
app.use("/api/houses", houseApi);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
