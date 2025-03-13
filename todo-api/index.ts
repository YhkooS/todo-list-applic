import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './router/todoRoutes';
import sequelize from './config/database';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Frontend'in build klasörünü serve et
const frontendPath = path.join(__dirname, '../../todo-client/assets/dist');
console.log('Frontend path:', frontendPath); // Debug için frontend dosya yolu

app.use(express.static(frontendPath));

// Middleware
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

// React Router için frontend'in index.html dosyasına yönlendirme
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Veritabanına bağlan ve tabloyu oluştur
sequelize.sync()
  .then(() => console.log('Veritabanı bağlantısı başarılı'))
  .catch((err) => console.error('Veritabanı bağlantı hatası:', err));

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
