export function truncate(text: string, max: number): string {
  if (typeof text !== 'string') return '';
  if (max <= 0) return '....';
  if (text.length <= max) return text;
  return text.slice(0, max) + '....';
}
