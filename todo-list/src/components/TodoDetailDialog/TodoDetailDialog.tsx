import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Pencil } from 'lucide-react';
import type { Todo } from '@/types/todo';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item?: Todo | null;
  onEdit?: () => void;
};

export default function TodoDetailDialog({
  open,
  onOpenChange,
  item,
  onEdit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,720px)] sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-lg">{item?.title ?? '항목 없음'}</span>
            {item && (
              <Badge
                variant="secondary"
                className={[
                  'rounded-md px-2',
                  item.priority === '높음' && 'bg-red-50 text-red-600',
                  item.priority === '중간' && 'bg-amber-50 text-amber-600',
                  item.priority === '낮음' && 'bg-sky-50 text-sky-600',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.priority}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-slate-600 whitespace-pre-wrap">
            {item?.desc || '내용이 없습니다.'}
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {item?.date ?? '-'}
            </div>
            <div>상태: {item?.done ? '완료' : '진행중'}</div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
          {item && (
            <Button onClick={onEdit}>
              <Pencil className="mr-1 h-4 w-4" /> 수정
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
