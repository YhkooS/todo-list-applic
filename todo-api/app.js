"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoRoutes_1 = __importDefault(require("./router/todoRoutes"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // JSON verilerini işleyebilmek için
app.use('/api/todos', todoRoutes_1.default); // Todo rotalarını kullan
const PORT = process.env.PORT || 3000;
database_1.default.sync() // Veritabanı ile senkronize et
    .then(() => {
    console.log(' Database synchronized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch(err => console.error('Database sync error:', err));
