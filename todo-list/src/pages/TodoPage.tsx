import { CalendarDays } from 'lucide-react';

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
        내용 준비 중…
      </main>
    </div>
  );
}
