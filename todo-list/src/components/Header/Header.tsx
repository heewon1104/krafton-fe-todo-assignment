import { CalendarDays } from 'lucide-react';
import { formatKoreanDate } from '@/utils/date';

export default function Header() {
  const todayStr = formatKoreanDate(new Date());

  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <CalendarDays className="h-5 w-5" />
          </div>
          <span className="font-semibold text-xl">Krafton TODO</span>
        </div>
        <div className="text-sm text-slate-500">{todayStr}</div>
      </div>
    </header>
  );
}
