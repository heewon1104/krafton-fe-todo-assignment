import { useState, useEffect } from 'react';
import StatsCards from '@/components/StatsCards/StatsCards';
import TodoDialog from '@/components/TodoDialog/TodoDialog';
import TodoDetailDialog from '@/components/TodoDetailDialog/TodoDetailDialog';
import Header from '@/components/Header/Header';
import FilterNav from '@/components/FilterTabs/FilterNav';
import TodoList from '@/components/TodoList/TodoList';
import { useTodoStore } from '@/stores/todoStore';
import type { Todo } from '@/types/todo';

export default function TodoPage() {
  const start = useTodoStore((s) => s.startLiveSync);
  const stop = useTodoStore((s) => s.stopLiveSync);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTodo, setDetailTodo] = useState<Todo | null>(null);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsCards />

        <FilterNav
          setOpen={() => {
            setEditingTodo(null);
            setEditorOpen(true);
          }}
        />

        <TodoList
          onView={(todo) => {
            setDetailTodo(todo);
            setDetailOpen(true);
          }}
          onEdit={(todo) => {
            setEditingTodo(todo);
            setEditorOpen(true);
          }}
        />
      </main>

      <TodoDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        mode={editingTodo ? 'edit' : 'create'}
        item={editingTodo ?? undefined}
      />

      <TodoDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        item={detailTodo}
        onEdit={() => {
          if (!detailTodo) return;
          setDetailOpen(false);
          setEditingTodo(detailTodo);
          setEditorOpen(true);
        }}
      />
    </div>
  );
}
