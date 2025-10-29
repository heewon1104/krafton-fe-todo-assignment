import { Card, CardContent } from '@/components/ui/card';
import { useTodoStore } from '@/stores/todoStore';

import {
  CalendarDays,
  CheckCircle2,
  Clock4,
  AlertTriangle,
} from 'lucide-react';

export default function StatsCards() {
  const todos = useTodoStore((s) => s.todos);

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const progress = total - done;
  const late = todos.filter((t) => !t.done).length;

  const stats = [
    { label: '전체', value: total, icon: CalendarDays },
    { label: '완료', value: done, icon: CheckCircle2 },
    { label: '진행중', value: progress, icon: Clock4 },
    { label: '지연', value: late, icon: AlertTriangle },
  ];

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
