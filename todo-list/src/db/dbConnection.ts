import Dexie, { type Table } from 'dexie';
import type { Todo } from '@/types/todo';

type DB = Dexie & { todos: Table<Todo, number> };

let _db: DB | null = null;

export function getDB(): DB {
  if (_db) return _db;
  const db = new Dexie('todo-db') as DB;
  db.version(1).stores({
    todos: '++id, title, desc, priority, date, tone, done',
  });
  _db = db;
  return _db;
}
