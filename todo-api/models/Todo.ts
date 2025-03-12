import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Veritabanı bağlantısını içe aktarıyoruz

// Todo modelini oluşturuyoruz
class Todo extends Model {
    public id!: number;
    public title!: string;
    public completed!: boolean;
}

// Modelin veritabanındaki yapısını tanımlıyoruz
Todo.init(
    {
        id: {
            type: DataTypes.INTEGER, // Sayısal ID olacak
            autoIncrement: true, // ID otomatik artacak
            primaryKey: true, // ID birincil anahtar olacak
        },
        title: {
            type: DataTypes.STRING, // Metin türünde bir başlık
            allowNull: false, // Boş bırakılamaz
        },
        completed: {
            type: DataTypes.BOOLEAN, // Boolean (true/false) olacak
            defaultValue: false, // Varsayılan olarak tamamlanmamış olacak
        },
    },
    {
        sequelize, // Veritabanı bağlantısını belirtiyoruz
        tableName: "todos", // Veritabanında "todos" adında bir tablo oluşturulacak
    }
);

export default Todo;
