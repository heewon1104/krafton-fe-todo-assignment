import { TodoInput } from '@/components/TodoInput/TodoInput';
import { TodoToolbar } from '@/components/TodoToolbar/TodoToolbar';
import { TodoList } from '@/components/TodoList/TodoList';

export default function TodoPage() {
  return (
    <div className="w-full max-w-xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">오늘의 할 일</h1>
        <p className="text-sm text-muted-foreground">
          오늘 해야 할 일을 정리해보세요.
        </p>
      </header>

      <TodoInput />
      <TodoToolbar />
      <TodoList />
    </div>
  );
}
