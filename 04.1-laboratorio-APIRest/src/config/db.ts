import { MongoClient, Collection, ObjectId } from 'mongodb';
import { House } from '../models/houseModel';

const url = 'mongodb://localhost:27017';
const dbName = 'your-database-name';

const client = new MongoClient(url);

let db: any;
let housesCollection: Collection;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);
    housesCollection = db.collection('houses');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

// Function to fetch houses with proper type
const getHouses = async (): Promise<House[]> => {
  const houses = await housesCollection.find().toArray();
  return houses.map(house => ({
    ...house,
    _id: house._id as ObjectId,
    last_scraped: new Date(house.last_scraped),
    calendar_last_scraped: new Date(house.calendar_last_scraped),
    price: parseFloat(house.price.toString()), // Ensuring price is a number
    weekly_price: house.weekly_price ? parseFloat(house.weekly_price.toString()) : undefined,
    monthly_price: house.monthly_price ? parseFloat(house.monthly_price.toString()) : undefined,
    cleaning_fee: house.cleaning_fee ? parseFloat(house.cleaning_fee.toString()) : undefined,
    extra_people: house.extra_people ? parseFloat(house.extra_people.toString()) : undefined,
    bathrooms: parseFloat(house.bathrooms.toString()), // Ensuring bathrooms is a number
  })) as House[];
};

export { connectToDatabase, housesCollection, ObjectId, getHouses };
