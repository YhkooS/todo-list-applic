import { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from './services/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || 'Veri alırken hata oluştu');
      console.error('Veri alırken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createTodo({ title: newTodo, completed: false });
      setNewTodo('');
      fetchTodos();
    } catch (err: any) {
      setError(err.message || 'Todo eklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async () => {
    if (!editTodo || !editTitle.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await updateTodo(editTodo.id.toString(), { title: editTitle, completed: editTodo.completed });
      setEditTodo(null);
      setEditTitle('');
      fetchTodos();
    } catch (err: any) {
      setError(err.message || 'Todo güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id.toString());
      fetchTodos();
    } catch (err: any) {
      setError(err.message || 'Todo silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: number, currentCompleted: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await updateTodo(id.toString(), { title: todos.find((t) => t.id === id)?.title || '', completed: !currentCompleted });
      fetchTodos();
    } catch (err: any) {
      setError(err.message || 'Tamamlama durumu güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni todo ekle"
          disabled={loading}
        />
        <button onClick={handleAddTodo} disabled={loading}>
          Ekle
        </button>
      </div>
      <div id="list">
    <ul>
      {todos.length === 0 && !loading ? (
        <li id="todo">Henüz todo yok.</li>
      ) : (
        todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id, todo.completed)}
              disabled={loading}
            />
            {editTodo?.id === todo.id ? (
              <>
                <input
                  type="text"
                  id="editInput"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  disabled={loading}
                />
                <div className="todo-buttons">
                  <button onClick={handleUpdateTodo} disabled={loading}>Kaydet</button>
                  <button onClick={() => setEditTodo(null)} disabled={loading}>İptal</button>
                </div>
              </>
            ) : (
              <>
                <span className="todo-text">{todo.title}</span>
                <div className="todo-buttons">
                  <button
                    id="edit"
                    onClick={() => {
                      setEditTodo(todo);
                      setEditTitle(todo.title);
                    }}
                    disabled={loading}
                  >
                    Düzenle
                  </button>
                  <button id="delete" onClick={() => handleDeleteTodo(todo.id)} disabled={loading}>Sil</button>
                </div>
              </>
            )}
          </li>
        ))
      )}
    </ul>
  </div>
</div>
  );
}

export default App;