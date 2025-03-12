import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // CORS importu
import todoRoutes from './router/todoRoutes';
import sequelize from './config/database';

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

// Veritabanına bağlan ve tabloyu oluştur
sequelize.sync()
  .then(() => console.log('Veritabanı bağlantısı başarılı'))
  .catch((err) => console.error('Veritabanı bağlantı hatası:', err));

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
