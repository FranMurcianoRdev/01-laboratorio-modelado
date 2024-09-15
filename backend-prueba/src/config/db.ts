// db.ts
import { MongoClient } from "mongodb";

// URL de la base de datos MongoDB
const url = 'mongodb://localhost:27017'; // Cambia esto si tu base de datos no está en localhost
const client = new MongoClient(url);

// Nombre de la base de datos
const dbName = 'airbnb';

export const connectDB = async () => {
  try {
    // Conecta con MongoDB
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(dbName); // Retorna la base de datos
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error;
  }
};
