"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
// mevcut tüm todoları almak GET /todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.default.findAll(); // Tüm todo'ları getir
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Verileri çekerken bir hata oluştu." });
    }
});
exports.getTodos = getTodos;
// yeni bir todo oluşturmak POST /todos
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, completed } = req.body;
        const newTodo = yield Todo_1.default.create({ title, completed }); // yeni todo oluştur
        res.status(201).json(newTodo);
    }
    catch (error) {
        res.status(500).json({ error: "Todo oluşturulurken hata oluştu." });
    }
});
exports.createTodo = createTodo;
// bir todoyu silmek DELETE /todos
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // id yi params dan al
        const deletedCount = yield Todo_1.default.destroy({ where: { id } }); // todoyu sil
        if (deletedCount === 0) {
            res.status(404).json({ error: "Todo bulunamadı." });
        }
        res.json({ message: "Todo başarıyla silindi." });
    }
    catch (error) {
        res.status(500).json({ error: "Todo silinirken hata oluştu." });
    }
});
exports.deleteTodo = deleteTodo;
// bir todoyu güncellemek POST /todos/:todoId
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params; // güncellenecek todonun ID'si
        const { title, completed } = req.body; // güncellenecek veriler
        const [updatedCount] = yield Todo_1.default.update({ title, completed }, { where: { id: todoId } });
        if (updatedCount === 0) {
            res.status(404).json({ error: "Todo bulunamadı veya değişiklik yapılmadı." });
        }
        res.json({ message: "Todo başarıyla güncellendi." });
    }
    catch (error) {
        res.status(500).json({ error: "Todo güncellenirken hata oluştu." });
    }
});
exports.updateTodo = updateTodo;
