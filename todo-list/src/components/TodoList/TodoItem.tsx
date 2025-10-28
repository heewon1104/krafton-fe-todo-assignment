import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

interface TodoItemProps {
  title: string;
  date?: string;
  completed?: boolean;
}

export function TodoItem({ title, date, completed }: TodoItemProps) {
  return (
    <li
      className={`group flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/40 transition`}
    >
      <div className="flex items-center gap-3">
        <Checkbox checked={completed} />
        <div
          className={`flex flex-col ${
            completed ? 'text-muted-foreground line-through' : ''
          }`}
        >
          <span className="font-medium">{title}</span>
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <Button variant="ghost" size="icon" aria-label="수정">
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="삭제">
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </li>
  );
}
