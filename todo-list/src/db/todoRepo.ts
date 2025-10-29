import { getDB } from '@/db/dbConnection';
import type { Todo } from '@/types/todo';

// Create
export async function addTodo(input: Omit<Todo, 'id'>) {
  const db = getDB();
  return db.todos.add(input as Todo);
}

// Read
export async function listTodos(filter: 'all' | 'done' | 'progress' = 'all') {
  const db = getDB();
  if (filter === 'all') return db.todos.toArray();
  if (filter === 'done') return db.todos.where({ done: true }).toArray();
  return db.todos.where({ done: false }).toArray();
}

// Update
export async function updateTodo(id: number, patch: Partial<Omit<Todo, 'id'>>) {
  const db = getDB();
  await db.todos.update(id, patch);
}

// Delete
export async function removeTodo(id: number) {
  const db = getDB();
  await db.todos.delete(id);
}
