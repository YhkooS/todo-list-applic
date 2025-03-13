"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const todoRoutes_1 = __importDefault(require("./router/todoRoutes"));
const database_1 = __importDefault(require("./config/database"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
// Frontend'in build klasörünü serve et
const frontendPath = path_1.default.join(__dirname, '../todo-client/dist');
console.log('Frontend path:', frontendPath); // Debug için frontend dosya yolu
app.use(express_1.default.static(frontendPath));
// Middleware
app.use(body_parser_1.default.json());
app.use('/api/todos', todoRoutes_1.default);
// React Router için frontend'in index.html dosyasına yönlendirme
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../todo-client/dist', 'index.html'));
});
// Veritabanına bağlan ve tabloyu oluştur
database_1.default.sync()
    .then(() => console.log('Veritabanı bağlantısı başarılı'))
    .catch((err) => console.error('Veritabanı bağlantı hatası:', err));
// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
