import { Request, Response } from "express";
import Todo from "../models/Todo"; 

// mevcut tüm todoları almak GET /todos
export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.findAll(); // Tüm todo'ları getir
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "Verileri çekerken bir hata oluştu." });
    }
};

// yeni bir todo oluşturmak POST /todos
export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, completed } = req.body;
        const newTodo = await Todo.create({ title, completed }); // yeni todo oluştur
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Todo oluşturulurken hata oluştu." });
    }
};

// bir todoyu silmek DELETE /todos
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // id yi params dan al
        const deletedCount = await Todo.destroy({ where: { id } }); // todoyu sil
        
        if (deletedCount === 0) {
            res.status(404).json({ error: "Todo bulunamadı." });
        }
        
        res.json({ message: "Todo başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ error: "Todo silinirken hata oluştu." });
    }
};

// bir todoyu güncellemek POST /todos/:todoId
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { todoId } = req.params; // güncellenecek todonun ID'si
        const { title, completed } = req.body; // güncellenecek veriler
        
        const [updatedCount] = await Todo.update(
            { title, completed },
            { where: { id: todoId } }
        );

        if (updatedCount === 0) {
            res.status(404).json({ error: "Todo bulunamadı veya değişiklik yapılmadı." });
        }

        res.json({ message: "Todo başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ error: "Todo güncellenirken hata oluştu." });
    }
};
