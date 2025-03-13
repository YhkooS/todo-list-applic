const API_URL = "/api/todos"

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Todo'ları çekerken hata: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

export const createTodo = async (todo: { title: string; completed: boolean }): Promise<Todo> => {
    const response = await fetch(API_URL, {
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
};

export const updateTodo = async (id: string, todo: { title: string; completed: boolean }): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${id}`, {
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
};

export const deleteTodo = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Todo silinirken hata: ${response.status} - ${response.statusText}`);
    }
    // DELETE genellikle yanıt gövdesi döndürmez, bu yüzden sadece hata kontrolü yapıyoruz
  };