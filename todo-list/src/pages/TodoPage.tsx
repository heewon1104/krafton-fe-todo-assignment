import { useState } from 'react';
import StatsCards from '@/components/StatsCards/StatsCards';
import TodoDialog from '@/components/TodoDialog/TodoDialog';
import Header from '@/components/Header/Header';
import FilterNav from '@/components/FilterTabs/FilterNav';
import TodoList from '@/components/TodoList/TodoList';
import type { FilterKey } from '@/types/todo';
import { STATS } from '@/constants/constants';

export default function TodoPage() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('all');

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StatsCards stats={STATS} />

        <FilterNav filter={filter} setFilter={setFilter} setOpen={setOpen} />

        <TodoList filter={filter} setOpen={setOpen} />
      </main>

      <TodoDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
