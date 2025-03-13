// config/database.ts
import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:3200@localhost:5432/postgres';

// Yerel test için şifreyi buraya girin (örneğin, 'your_local_password')
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false // Heroku için SSL sertifikası doğrulamasını devre dışı bırakır
    } : false
  },
  logging: process.env.NODE_ENV === 'development' // Geliştirme ortamında logları aç, production'da kapat
});

export default sequelize;

// Bağlantıyı test etmek için (isteğe bağlı)
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarılı');
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
  }
})();