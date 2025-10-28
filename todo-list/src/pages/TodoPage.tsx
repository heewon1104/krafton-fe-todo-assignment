import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  CheckCircle2,
  Clock4,
  AlertTriangle,
  Plus,
  Calendar as CalendarIcon,
  Pencil,
  Trash2,
} from 'lucide-react';

type Todo = {
  id: number;
  title: string;
  desc: string;
  priority: '높음' | '중간' | '낮음';
  date: string;
  tone: 'red' | 'orange' | 'blue' | 'green';
  done: boolean;
};

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

const TODOS: Todo[] = [
  {
    id: 1,
    title: '버그 수정',
    desc: '로그인 페이지 버그 수정 및 테스트',
    priority: '높음',
    date: '2024. 1. 22.',
    tone: 'red',
    done: false,
  },
  {
    id: 2,
    title: '프로젝트 기획서 작성',
    desc: 'Q1 신규 프로젝트 기획서 초안 작성 및 검토',
    priority: '높음',
    date: '2024. 1. 25.',
    tone: 'orange',
    done: false,
  },
  {
    id: 3,
    title: '코드 리뷰',
    desc: 'PR #123 코드 리뷰 및 피드백 작성',
    priority: '중간',
    date: '2024. 1. 24.',
    tone: 'orange',
    done: false,
  },
  {
    id: 4,
    title: '문서 업데이트',
    desc: 'API 문서 최신 버전으로 업데이트',
    priority: '낮음',
    date: '2024. 1. 26.',
    tone: 'blue',
    done: false,
  },
  {
    id: 5,
    title: '팀 미팅 준비',
    desc: '주간 팀 미팅 아젠다 준비 및 자료 정리',
    priority: '중간',
    date: '2024. 1. 23.',
    tone: 'green',
    done: true,
  },
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

        <section className="mt-4 flex flex-wrap">
          {TODOS.map((item) => (
            <article
              key={item.id}
              className={[
                'group relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4',
                'w-full md:w-1/2 xl:w-1/3',
                item.tone === 'red' && 'border-l-4 border-red-400',
                item.tone === 'orange' && 'border-l-4 border-orange-300',
                item.tone === 'blue' && 'border-l-4 border-sky-300',
                item.tone === 'green' && 'border-l-4 border-emerald-300',
                item.done && 'opacity-70',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Checkbox checked={item.done} aria-label="완료 체크" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-semibold ${item.done ? 'line-through text-slate-400' : ''}`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p
                    className={`text-sm ${item.done ? 'line-through text-slate-400' : 'text-slate-600'}`}
                  >
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <Badge
                      variant="secondary"
                      className={[
                        'rounded-md px-2',
                        item.priority === '높음' && 'bg-red-50 text-red-600',
                        item.priority === '중간' &&
                          'bg-amber-50 text-amber-600',
                        item.priority === '낮음' && 'bg-sky-50 text-sky-600',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {item.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <CalendarIcon className="h-4 w-4" /> {item.date}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
