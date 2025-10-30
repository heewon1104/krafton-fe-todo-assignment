import type { Filter } from '@/types/todo';

export const FILTERS: Filter[] = [
  { key: 'all', label: '전체' },
  { key: 'progress', label: '진행중' },
  { key: 'done', label: '완료' },
];

export const TITLE_MAX = 60;
export const DESC_MAX = 500;
