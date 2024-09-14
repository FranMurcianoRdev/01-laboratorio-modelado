
import express from 'express';
import houseRoutes from './routes/houseRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', houseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
