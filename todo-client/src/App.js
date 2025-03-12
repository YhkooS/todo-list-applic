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
const react_1 = require("react");
require("./App.css");
const api_1 = require("./services/api");
function App() {
    const [todos, setTodos] = (0, react_1.useState)([]);
    const [newTodo, setNewTodo] = (0, react_1.useState)('');
    const [editTodo, setEditTodo] = (0, react_1.useState)(null);
    const [editTitle, setEditTitle] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const fetchTodos = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        try {
            const data = yield (0, api_1.getTodos)();
            setTodos(data);
        }
        catch (err) {
            setError(err.message || 'Veri alırken hata oluştu');
            console.error('Veri alırken hata:', err);
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchTodos();
    }, []);
    const handleAddTodo = () => __awaiter(this, void 0, void 0, function* () {
        if (!newTodo.trim())
            return;
        setLoading(true);
        setError(null);
        try {
            yield (0, api_1.createTodo)({ title: newTodo, completed: false });
            setNewTodo('');
            fetchTodos();
        }
        catch (err) {
            setError(err.message || 'Todo eklenirken hata oluştu');
        }
        finally {
            setLoading(false);
        }
    });
    const handleUpdateTodo = () => __awaiter(this, void 0, void 0, function* () {
        if (!editTodo || !editTitle.trim())
            return;
        setLoading(true);
        setError(null);
        try {
            yield (0, api_1.updateTodo)(editTodo.id.toString(), { title: editTitle, completed: editTodo.completed });
            setEditTodo(null);
            setEditTitle('');
            fetchTodos();
        }
        catch (err) {
            setError(err.message || 'Todo güncellenirken hata oluştu');
        }
        finally {
            setLoading(false);
        }
    });
    const handleDeleteTodo = (id) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        try {
            yield (0, api_1.deleteTodo)(id.toString());
            fetchTodos();
        }
        catch (err) {
            setError(err.message || 'Todo silinirken hata oluştu');
        }
        finally {
            setLoading(false);
        }
    });
    const handleToggleComplete = (id, currentCompleted) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        setLoading(true);
        setError(null);
        try {
            yield (0, api_1.updateTodo)(id.toString(), { title: ((_a = todos.find((t) => t.id === id)) === null || _a === void 0 ? void 0 : _a.title) || '', completed: !currentCompleted });
            fetchTodos();
        }
        catch (err) {
            setError(err.message || 'Tamamlama durumu güncellenirken hata oluştu');
        }
        finally {
            setLoading(false);
        }
    });
    return (<div>
      <h1>Todo List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Yeni todo ekle" disabled={loading}/>
        <button onClick={handleAddTodo} disabled={loading}>
          Ekle
        </button>
      </div>
      <div id="list">
    <ul>
      {todos.length === 0 && !loading ? (<li id="todo">Henüz todo yok.</li>) : (todos.map((todo) => (<li key={todo.id} className="todo-item">
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleComplete(todo.id, todo.completed)} disabled={loading}/>
            {(editTodo === null || editTodo === void 0 ? void 0 : editTodo.id) === todo.id ? (<>
                <input type="text" id="editInput" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={loading}/>
                <div className="todo-buttons">
                  <button onClick={handleUpdateTodo} disabled={loading}>Kaydet</button>
                  <button onClick={() => setEditTodo(null)} disabled={loading}>İptal</button>
                </div>
              </>) : (<>
                <span className="todo-text">{todo.title}</span>
                <div className="todo-buttons">
                  <button id="edit" onClick={() => {
                    setEditTodo(todo);
                    setEditTitle(todo.title);
                }} disabled={loading}>
                    Düzenle
                  </button>
                  <button id="delete" onClick={() => handleDeleteTodo(todo.id)} disabled={loading}>Sil</button>
                </div>
              </>)}
          </li>)))}
    </ul>
  </div>
    </div>);
}
exports.default = App;
