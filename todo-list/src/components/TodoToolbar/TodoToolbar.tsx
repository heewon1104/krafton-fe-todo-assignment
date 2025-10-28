import { Button } from '@/components/ui/button';

export function TodoToolbar() {
  return (
    <div className="flex justify-between items-center border-b border-border/50 py-2">
      <div className="flex gap-2">
        <Button variant="default" size="sm">
          전체
        </Button>
        <Button variant="outline" size="sm">
          진행중
        </Button>
        <Button variant="outline" size="sm">
          완료
        </Button>
      </div>

      <div className="flex gap-1 text-xs text-muted-foreground">
        <span className="hidden sm:block">정렬:</span>
        <button className="underline hover:text-foreground transition">
          마감일순
        </button>
      </div>
    </div>
  );
}
