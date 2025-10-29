import TodoItem from '@/components/TodoList/TodoItem';
import { useTodoStore } from '@/stores/todoStore';

type TodoListProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TodoList({ setOpen }: TodoListProps) {
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
          onEdit={() => setOpen(true)}
          onDelete={(id) => void del(id)}
          onToggle={(id, nextDone) => void patch(id, { done: nextDone })}
        />
      ))}
    </section>
  );
}
