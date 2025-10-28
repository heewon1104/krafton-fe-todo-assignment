export function formatKoreanDate(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    d
  );
  return `${y}년 ${m}월 ${day}일 ${weekday}`;
}
