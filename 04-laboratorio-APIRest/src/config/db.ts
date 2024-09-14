// src/config/db.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/airbnb';

let client: MongoClient;

export const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('airbnb');
};

export const getCollection = async (collectionName: string) => {
  const db = await connectDB();
  return db.collection(collectionName);
};
