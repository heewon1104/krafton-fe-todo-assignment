import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import FilterTabs from '@/components/FilterTabs/FilterTabs';
import { FILTERS } from '@/constants/constants';
import { useTodoStore } from '@/stores/todoStore';
import { Plus } from 'lucide-react';

type FilterNavProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilterNav({ setOpen }: FilterNavProps) {
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);

  return (
    <section className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">할 일 목록</h2>
        <Separator orientation="vertical" className="h-5" />
        <FilterTabs filters={FILTERS} value={filter} onChange={setFilter} />
      </div>
      <Button className="rounded-full" size="sm" onClick={() => setOpen(true)}>
        <Plus className="mr-1 h-4 w-4" /> 추가
      </Button>
    </section>
  );
}
