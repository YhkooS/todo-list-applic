import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './router/todoRoutes';
import sequelize from './config/database';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  

app.use('/api/todos', todoRoutes);  

const PORT = process.env.PORT || 3000;

sequelize.sync()  
  .then(() => {
    console.log(' Database synchronized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));
