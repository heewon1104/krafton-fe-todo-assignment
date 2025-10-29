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

export type TodoDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function TodoDialog({ open, onOpenChange }: TodoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,720px)] sm:max-w-2xl max-h-[88vh] md:min-h-[70vh] overflow-hidden rounded-2xl p-0">
        <div className="flex flex-col max-h-[inherit]">
          <DialogHeader className="p-6 border-b">
            <DialogTitle>TODO 수정</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="dueDate">
                마감일 *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dueDate"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" /> 날짜를
                    선택해주세요
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  avoidCollisions={false}
                  className="p-0 w-[var(--radix-popover-trigger-width)]"
                >
                  <Calendar mode="single" initialFocus className="w-full" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="priority">
                우선순위
              </label>
              <Select defaultValue="중간">
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

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title" />
              <Input id="title" placeholder="제목" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="content">
                내용
              </label>
              <Textarea id="content" maxLength={500} rows={10} />
              <div className="text-xs text-slate-500">0/500</div>
            </div>
          </div>

          <DialogFooter className="gap-2 p-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button>
              <CircleCheck className="mr-1 h-4 w-4" /> 수정
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
