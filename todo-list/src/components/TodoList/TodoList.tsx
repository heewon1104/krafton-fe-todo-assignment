import TodoItem from '@/components/TodoList/TodoItem';
import { useTodoStore } from '@/stores/todoStore';
import type { Todo } from '@/types/todo';

type TodoListProps = {
  onView: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
};

export default function TodoList({ onView, onEdit }: TodoListProps) {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const loading = useTodoStore((s) => s.loading);
  const patch = useTodoStore((s) => s.patch);
  const del = useTodoStore((s) => s.delete);

  const filtered = todos.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'done') return t.done;
    if (filter === 'progress') return !t.done;
    return true;
  });

  if (loading) {
    return <div className="mt-4 text-sm text-slate-500">불러오는 중…</div>;
  }
  if (filtered.length === 0) {
    return <div className="mt-4 text-sm text-slate-500">항목이 없습니다.</div>;
  }

  return (
    <section className="mt-4 flex flex-wrap gap-3">
      {filtered.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onView={onView}
          onEdit={onEdit}
          onDelete={(id) => void del(id)}
          onToggle={(id, nextDone) => void patch(id, { done: nextDone })}
        />
      ))}
    </section>
  );
}
