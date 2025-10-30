import { Card, CardContent } from '@/components/ui/card';
import { parseDue } from '@/utils/date';
import { useTodoStore } from '@/stores/todoStore';
import { isBefore, startOfToday } from 'date-fns';
import {
  CalendarDays,
  CheckCircle2,
  Clock4,
  AlertTriangle,
} from 'lucide-react';

const toneText: Record<'blue' | 'green' | 'orange' | 'red', string> = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
};

export default function StatsCards() {
  const todos = useTodoStore((s) => s.todos);

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const progress = total - done;

  const todayStart = startOfToday();
  const late = todos.filter((t) => {
    if (t.done) return false;
    const due = parseDue(t.date);
    return due ? isBefore(due, todayStart) : false;
  }).length;

  const stats = [
    { label: '전체', value: total, icon: CalendarDays, tone: 'blue' as const },
    { label: '완료', value: done, icon: CheckCircle2, tone: 'green' as const },
    { label: '진행중', value: progress, icon: Clock4, tone: 'orange' as const },
    { label: '지연', value: late, icon: AlertTriangle, tone: 'red' as const },
  ];

  return (
    <section className="flex flex-wrap gap-4">
      {stats.map((s, i) => {
        const color = toneText[s.tone];
        return (
          <Card key={i} className="rounded-2xl shadow-sm flex-1 min-w-[180px]">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="text-slate-700 text-xl">{s.label}</div>
              <div className="flex items-center gap-2">
                <s.icon aria-hidden="true" className={`h-6 w-6 ${color}`} />
                <div className={`text-xl font-semibold ${color}`}>
                  {s.value}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
