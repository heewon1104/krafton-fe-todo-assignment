import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Pencil, Trash2 } from 'lucide-react';
import type { Todo } from '@/types/todo';
import { truncate } from '@/utils/truncate';
import type { CheckedState } from '@radix-ui/react-checkbox';

type TodoCardProps = {
  item: Todo;
  onView: (item: Todo) => void;
  onEdit: (item: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, nextDone: boolean) => void;
};

export default function TodoItem({
  item,
  onView,
  onEdit,
  onDelete,
  onToggle,
}: TodoCardProps) {
  return (
    <article
      onClick={() => onView(item)}
      className={[
        'group relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-6',
        'flex-none',
        'w-full',
        'md:basis-[calc((100%-theme(space.3))/2)]',
        'lg:basis-[calc((100%-theme(space.3)*2)/3)]',
        'min-w-0',
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
          <Checkbox
            checked={item.done}
            onCheckedChange={(checked: CheckedState) => {
              const nextDone = checked === true;
              onToggle(item.id, nextDone);
            }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') e.stopPropagation();
            }}
            aria-label="완료 체크"
            className="h-5 w-5 border-slate-600 bg-slate-300 hover:bg-slate-200"
          />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold ${item.done ? 'line-through' : ''}`}>
              {truncate(item.title, 10)}
            </h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="편집"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
              >
                <Pencil className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="삭제"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className={`text-sm ${item.done ? 'line-through ' : ''}`}>
            {truncate(item.desc, 30)}
          </p>
          <div className="flex items-center justify-between pt-2">
            <Badge
              variant="secondary"
              className={[
                'rounded-md px-2 text-sm',
                item.priority === '높음' && 'bg-red-50 text-red-600 font-bold',
                item.priority === '중간' &&
                  'bg-amber-50 text-amber-600 font-bold',
                item.priority === '낮음' && 'bg-sky-50 text-sky-600 font-bold',
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
  );
}
