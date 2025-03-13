import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; 


class Todo extends Model {
    public id!: number;
    public title!: string;
    public completed!: boolean;
}

// Modelin veritabanındaki yapısını 
Todo.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true, 
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        completed: {
            type: DataTypes.BOOLEAN, 
            defaultValue: false, 
        },
    },
    {
        sequelize, 
        tableName: "todos", 
    }
);

export default Todo;
