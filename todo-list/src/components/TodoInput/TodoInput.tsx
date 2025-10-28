import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export function TodoInput() {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 pb-3">
      <Input
        placeholder="할 일을 입력하세요..."
        className="flex-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button variant="ghost" size="icon" aria-label="마감일 선택">
        <Calendar className="w-4 h-4 text-muted-foreground" />
      </Button>
      <Button variant="outline" size="sm">
        추가
      </Button>
    </div>
  );
}
