import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { liveQuery } from 'dexie';
import { getDB } from '@/db/dbconnection';
import type { Todo, FilterKey } from '@/types/todo';
import { addTodo, updateTodo, removeTodo } from '@/db/todoRepo';

type TodoState = {
  todos: Todo[];
  filter: FilterKey;
  loading: boolean;
};

type TodoActions = {
  setFilter: (f: FilterKey) => void;

  create: (input: Omit<Todo, 'id'>) => Promise<void>;
  patch: (id: number, patch: Partial<Omit<Todo, 'id'>>) => Promise<void>;
  delete: (id: number) => Promise<void>;

  // liveQuery 관리
  startLiveSync: () => void;
  stopLiveSync: () => void;
};

type Store = TodoState & TodoActions;

const unsubscribeLive: { current: (() => void) | null } = { current: null };

export const useTodoStore = create<Store>()(
  subscribeWithSelector((set) => ({
    todos: [],
    filter: 'all',
    loading: true,

    setFilter: (f) => set({ filter: f }),

    create: async (input) => {
      await addTodo(input);
    },

    patch: async (id, patch) => {
      await updateTodo(id, patch);
    },

    delete: async (id) => {
      await removeTodo(id);
    },

    startLiveSync: () => {
      if (unsubscribeLive.current) return;

      const sub = liveQuery(async () => {
        const db = getDB();
        return db.todos.toArray();
      }).subscribe({
        next: (rows) => set({ todos: rows, loading: false }),
        error: (err) => {
          console.error('liveQuery error:', err);
          set({ loading: false });
        },
      });

      unsubscribeLive.current = () => sub.unsubscribe();
    },
    stopLiveSync: () => {
      unsubscribeLive.current?.();
      unsubscribeLive.current = null;
    },
  }))
);
