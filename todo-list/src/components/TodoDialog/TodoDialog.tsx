import { useState } from 'react';
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
import { Calendar as CalendarIcon, CircleCheck } from 'lucide-react';
import { format } from 'date-fns';

export type TodoDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function TodoDialog({ open, onOpenChange }: TodoDialogProps) {
  const create = useTodoStore((s) => s.create);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<'높음' | '중간' | '낮음'>('중간');
  const [due, setDue] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const toneByPriority: Record<
    '높음' | '중간' | '낮음',
    'red' | 'orange' | 'green'
  > = {
    높음: 'red',
    중간: 'orange',
    낮음: 'green',
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    if (!due) return;

    await create({
      title: title.trim(),
      desc: desc.trim(),
      priority,
      date: format(due, 'yyyy. M. d.'),
      tone: toneByPriority[priority],
      done: false,
    });

    setTitle('');
    setDesc('');
    setPriority('중간');
    setDue(undefined);

    onOpenChange(false);
  }

  const descCount = desc.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,720px)] sm:max-w-2xl max-h-[88vh] md:min-h-[70vh] overflow-hidden rounded-2xl p-0">
        <form
          className="flex flex-col max-h-[inherit]"
          onSubmit={(e) => {
            void onSubmit(e);
          }}
        >
          <DialogHeader className="p-6 border-b">
            <DialogTitle>TODO 수정</DialogTitle>
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
                    className="w-full justify-start text-left font-normal"
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
              />
            </div>

            {/* 내용 */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="content">
                내용
              </label>
              <Textarea
                id="content"
                maxLength={500}
                rows={10}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="text-xs text-slate-500">{descCount}/500</div>
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
            <Button type="submit">
              <CircleCheck className="mr-1 h-4 w-4" /> 수정
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
