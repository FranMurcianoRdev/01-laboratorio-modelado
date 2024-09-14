
// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import houseRoutes from './routes/houseRoutes';

// Inicializa las variables de entorno
dotenv.config();

// Inicializa Express
const app = express();
app.use(express.json());

// Usar las rutas de casas
app.use('/api', houseRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

