import { Sequelize } from 'sequelize';

// pgsql veritabanı bağlantısı için qequelize örneği 
const sequelize = new Sequelize('postgres://postgres:3200@localhost:5432/postgres', {
  dialect: 'postgres',
  logging: false,  // sorguları konsolda kapat
});

export default sequelize; 
