import { useState, useEffect } from 'react';
import StatsCards from '@/components/StatsCards/StatsCards';
import TodoDialog from '@/components/TodoDialog/TodoDialog';
import Header from '@/components/Header/Header';
import FilterNav from '@/components/FilterTabs/FilterNav';
import TodoList from '@/components/TodoList/TodoList';
import { useTodoStore } from '@/stores/todoStore';

export default function TodoPage() {
  const start = useTodoStore((s) => s.startLiveSync);
  const stop = useTodoStore((s) => s.stopLiveSync);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsCards />

        <FilterNav setOpen={setOpen} />

        <TodoList setOpen={setOpen} />
      </main>

      <TodoDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
