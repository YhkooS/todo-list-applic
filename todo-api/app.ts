import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './router/todoRoutes';
import sequelize from './config/database';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  // JSON verilerini işleyebilmek için

app.use('/api/todos', todoRoutes);  // Todo rotalarını kullan

const PORT = process.env.PORT || 3000;

sequelize.sync()  // Veritabanı ile senkronize et
  .then(() => {
    console.log(' Database synchronized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync error:', err));
