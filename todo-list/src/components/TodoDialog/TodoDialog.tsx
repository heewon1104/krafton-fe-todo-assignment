import { useState, useEffect } from 'react';
import { useTodoStore } from '@/stores/todoStore';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Todo } from '@/types/todo';
import { Calendar as CalendarIcon, CircleCheck } from 'lucide-react';
import { format, parse } from 'date-fns';
import { TITLE_MAX, DESC_MAX } from '@/constants/constants';

type TodoDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: 'create' | 'edit';
  item?: Todo;
};

export default function TodoDialog({
  open,
  onOpenChange,
  mode = 'create',
  item,
}: TodoDialogProps) {
  const create = useTodoStore((s) => s.create);
  const patch = useTodoStore((s) => s.patch);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<'높음' | '중간' | '낮음'>('중간');
  const [due, setDue] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const toneByPriority: Record<
    '높음' | '중간' | '낮음',
    'red' | 'orange' | 'blue'
  > = {
    높음: 'red',
    중간: 'orange',
    낮음: 'blue',
  };

  useEffect(() => {
    if (mode === 'edit' && item) {
      setTitle(item.title);
      setDesc(item.desc);
      setPriority(item.priority);
      setDue(
        item.date ? parse(item.date, 'yyyy. M. d.', new Date()) : undefined
      );
    } else {
      setTitle('');
      setDesc('');
      setPriority('중간');
      setDue(undefined);
    }
  }, [mode, item, open]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !due) return;

    if (mode === 'edit' && item) {
      await patch(item.id, {
        title: title.trim(),
        desc: desc.trim(),
        priority,
        date: format(due, 'yyyy. M. d.'),
        tone: toneByPriority[priority],
      });
    } else {
      await create({
        title: title.trim(),
        desc: desc.trim(),
        priority,
        date: format(due, 'yyyy. M. d.'),
        tone: toneByPriority[priority],
        done: false,
      });
    }
    onOpenChange(false);
  }

  const titleText = mode === 'edit' ? 'TODO 수정' : 'TODO 생성';
  const submitText = mode === 'edit' ? '수정' : '생성';

  const isTitleValid =
    title.trim().length > 0 && title.trim().length <= TITLE_MAX;
  const isDueValid = !!due;
  const isDescValid = desc.length <= DESC_MAX;
  const isFormValid = isTitleValid && isDueValid && isDescValid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,720px)] sm:max-w-2xl max-h-[88vh] md:min-h-[70vh] overflow-hidden rounded-2xl p-0">
        <form
          className="flex flex-col max-h-[inherit]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isFormValid) return;
            void onSubmit(e);
          }}
        >
          <DialogHeader className="p-6 border-b">
            <DialogTitle>{titleText}</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* 마감일 */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="dueDate">
                마감일 *
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="dueDate"
                    type="button"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!isDueValid ? 'border-red-300' : ''}`}
                    aria-invalid={isDueValid ? 'false' : 'true'}
                    aria-describedby={!isDueValid ? 'due-error' : undefined}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {due ? format(due, 'yyyy. M. d.') : '날짜를 선택해주세요'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  avoidCollisions={false}
                  className="p-0 w-[var(--radix-popover-trigger-width)]"
                >
                  <Calendar
                    mode="single"
                    selected={due}
                    onSelect={(d) => {
                      setDue(d);
                      if (d) setCalendarOpen(false);
                    }}
                    initialFocus
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>
              {!isDueValid && (
                <p id="due-error" className="text-xs text-red-600">
                  마감일을 선택하세요.
                </p>
              )}
            </div>

            {/* 우선순위 */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="priority">
                우선순위
              </label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as typeof priority)}
              >
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue placeholder="선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="높음">높음</SelectItem>
                  <SelectItem value="중간">중간</SelectItem>
                  <SelectItem value="낮음">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 제목 */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">
                제목 *
              </label>
              <Input
                id="title"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={TITLE_MAX}
                aria-invalid={isTitleValid ? 'false' : 'true'}
                aria-describedby="title-count"
              />
              <div
                id="title-count"
                className={`text-xs ${isTitleValid ? 'text-slate-500' : 'text-red-600'}`}
              >
                {title.length}/{TITLE_MAX}
              </div>
            </div>

            {/* 내용 */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="content">
                내용
              </label>
              <Textarea
                id="content"
                maxLength={DESC_MAX}
                rows={10}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                aria-invalid={isDescValid ? 'false' : 'true'}
                aria-describedby="desc-count"
              />
              <div
                id="desc-count"
                className={`text-xs ${isDescValid ? 'text-slate-500' : 'text-red-600'}`}
              >
                {desc.length}/{DESC_MAX}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 p-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              <CircleCheck className="mr-1 h-4 w-4" /> {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
