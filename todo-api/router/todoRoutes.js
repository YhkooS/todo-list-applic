"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
// Mevcut todo'ları almak için (GET /todos)
router.get("/", todoController_1.getTodos);
// Yeni bir todo oluşturmak için (POST /todos)
router.post("/", todoController_1.createTodo);
// Bir todo'yu silmek için (DELETE /todos)
router.delete("/:id", todoController_1.deleteTodo);
// Bir todo'yu güncellemek için (POST /todos/:todoId)
router.post("/:todoId", todoController_1.updateTodo);
exports.default = router; // Router'ı dışa aktarıyoruz
