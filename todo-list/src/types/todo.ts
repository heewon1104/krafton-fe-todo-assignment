export type Priority = '높음' | '중간' | '낮음';
export type Tone = 'red' | 'orange' | 'blue' | 'green';

export type Todo = {
  id: number;
  title: string;
  desc: string;
  priority: Priority;
  date: string;
  tone: Tone;
  done: boolean;
};

export type Stat = {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
};
export type FilterKey = 'all' | 'progress' | 'done';
export type Filter = { key: FilterKey; label: string };

