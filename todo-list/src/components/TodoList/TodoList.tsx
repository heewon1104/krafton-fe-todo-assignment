import TodoCard from '@/components/TodoList/TodoItem';
import { TODOS } from '@/constants/constants';
import type { FilterKey } from '@/types/todo';

type TodoListProps = {
  filter: FilterKey;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TodoList({ filter, setOpen }: TodoListProps) {
  const filtered = TODOS.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'done') return t.done;
    if (filter === 'progress') return !t.done;
    return true;
  });

  return (
    <section className="mt-4 flex flex-wrap gap-3">
      {filtered.map((item) => (
        <TodoCard
          key={item.id}
          item={item}
          onEdit={() => setOpen(true)}
          onDelete={() => {}}
          onToggle={() => {}}
        />
      ))}
    </section>
  );
}
