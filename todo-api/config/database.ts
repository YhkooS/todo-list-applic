import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:3200@localhost:5432/postgres';

console.log("DATABASE_URL:", databaseUrl); // debug

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false 
    } : false
  },
  logging: console.log // SQL sorgularını 
});

// Bağlantıyı test et
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Veritabanına başarıyla bağlandı');
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
  }
})();

export default sequelize;
