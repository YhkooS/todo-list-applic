"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // CORS importu
const todoRoutes_1 = __importDefault(require("./router/todoRoutes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
// Middleware
app.use(body_parser_1.default.json());
app.use('/api/todos', todoRoutes_1.default);
// Veritabanına bağlan ve tabloyu oluştur
database_1.default.sync()
    .then(() => console.log('Veritabanı bağlantısı başarılı'))
    .catch((err) => console.error('Veritabanı bağlantı hatası:', err));
// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
