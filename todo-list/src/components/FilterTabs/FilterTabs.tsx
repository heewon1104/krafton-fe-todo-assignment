import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Filter, FilterKey } from '@/types/todo';

export default function FilterTabs({
  filters,
  value,
  onChange,
}: {
  filters: Filter[];
  value: FilterKey;
  onChange: (v: FilterKey) => void;
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as FilterKey)}>
      <TabsList className="rounded-full">
        {filters.map((f) => (
          <TabsTrigger key={f.key} value={f.key} className="rounded-full px-4">
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
