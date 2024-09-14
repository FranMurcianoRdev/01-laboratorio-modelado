import express from 'express';
import dotenv from 'dotenv';
import houseRoutes from './src/routes/houseRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', houseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
