import { Card, CardContent } from '@/components/ui/card';
import type { Stat } from '@/types/todo';

export default function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <section className="flex flex-wrap gap-4">
      {stats.map((s, i) => (
        <Card key={i} className="rounded-2xl shadow-sm flex-1 min-w-[180px]">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="text-slate-500 text-sm">{s.label}</div>
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-slate-400" />
              <div className="text-xl font-semibold">{s.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
