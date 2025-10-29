import { parse, isValid } from 'date-fns';

export function formatKoreanDate(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    d
  );
  return `${y}년 ${m}월 ${day}일 ${weekday}`;
}

export function parseDue(dateStr: string | undefined) {
  if (!dateStr) return null;
  const d = parse(dateStr, 'yyyy. M. d.', new Date());
  return isValid(d) ? d : null;
}
