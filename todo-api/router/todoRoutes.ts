import express, { Request, Response } from 'express';
import Todo from '../models/Todo'; 
import { getTodos, createTodo, deleteTodo, updateTodo } from "../controllers/todoController";


const router = express.Router();

// Mevcut todo'ları almak için (GET /todos)
router.get("/", getTodos);

// Yeni bir todo oluşturmak için (POST /todos)
router.post("/", createTodo);

// Bir todo'yu silmek için (DELETE /todos)
router.delete("/:id", deleteTodo);

// Bir todo'yu güncellemek için (POST /todos/:todoId)
router.post("/:todoId", updateTodo);



export default router;  
