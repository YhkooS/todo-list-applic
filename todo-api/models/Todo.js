"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Veritabanı bağlantısını içe aktarıyoruz
// Todo modelini oluşturuyoruz
class Todo extends sequelize_1.Model {
}
// Modelin veritabanındaki yapısını tanımlıyoruz
Todo.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Sayısal ID olacak
        autoIncrement: true, // ID otomatik artacak
        primaryKey: true, // ID birincil anahtar olacak
    },
    title: {
        type: sequelize_1.DataTypes.STRING, // Metin türünde bir başlık
        allowNull: false, // Boş bırakılamaz
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN, // Boolean (true/false) olacak
        defaultValue: false, // Varsayılan olarak tamamlanmamış olacak
    },
}, {
    sequelize: database_1.default, // Veritabanı bağlantısını belirtiyoruz
    tableName: "todos", // Veritabanında "todos" adında bir tablo oluşturulacak
});
exports.default = Todo;
