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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const API_URL = "http://localhost:3000/api/todos";
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Todo'ları çekerken hata: ${response.status} - ${response.statusText}`);
    }
    return response.json();
});
exports.getTodos = getTodos;
const createTodo = (todo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error(`Todo oluştururken hata: ${response.status} - ${response.statusText}`);
    }
    return response.json();
});
exports.createTodo = createTodo;
const updateTodo = (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/${id}`, {
        method: 'POST', // Backend'de rota POST olarak tanımlı
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error(`Todo güncellenirken hata: ${response.status} - ${response.statusText}`);
    }
    return response.json();
});
exports.updateTodo = updateTodo;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Todo silinirken hata: ${response.status} - ${response.statusText}`);
    }
    // DELETE genellikle yanıt gövdesi döndürmez, bu yüzden sadece hata kontrolü yapıyoruz
});
exports.deleteTodo = deleteTodo;
