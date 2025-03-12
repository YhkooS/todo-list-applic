"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// pgsql veritabanı bağlantısı için qequelize örneği 
const sequelize = new sequelize_1.Sequelize('postgres://postgres:3200@localhost:5432/postgres', {
    dialect: 'postgres',
    logging: false, // sorguları konsolda kapat
});
exports.default = sequelize;
