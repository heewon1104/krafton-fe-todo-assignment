import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  CheckCircle2,
  Clock4,
  AlertTriangle,
  Plus,
} from 'lucide-react';

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'progress', label: '진행중' },
  { key: 'done', label: '완료' },
];

const STATS = [
  { label: '전체', value: 5, icon: CalendarDays },
  { label: '완료', value: 1, icon: CheckCircle2 },
  { label: '진행중', value: 4, icon: Clock4 },
  { label: '지연', value: 4, icon: AlertTriangle },
];

function formatKoreanDate(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    d
  );
  return `${y}년 ${m}월 ${day}일 ${weekday}`;
}

export default function ReaddyTodoPage() {
  const todayStr = formatKoreanDate(new Date());
  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 grid place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <CalendarDays className="h-5 w-5" />
            </div>
            <span className="font-semibold text-xl">Readdy TODO</span>
          </div>
          <div className="text-sm text-slate-500">{todayStr}</div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <section className="flex flex-wrap gap-4">
          {STATS.map((s, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-sm flex-1 min-w-[180px]"
            >
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
        <section className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">할 일 목록</h2>
            <Separator orientation="vertical" className="h-5" />
            <Tabs value="all">
              <TabsList className="rounded-full">
                {FILTERS.map((f) => (
                  <TabsTrigger
                    key={f.key}
                    value={f.key}
                    className="rounded-full px-4"
                  >
                    {f.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Button className="rounded-full" size="sm">
            <Plus className="mr-1 h-4 w-4" /> 추가
          </Button>
        </section>
      </main>
    </div>
  );
}
