import { TodoItem } from './TodoItem';

export function TodoList() {
  return (
    <ul className="space-y-2 pt-3">
      <TodoItem
        title="디자인 시스템 구조 정리하기"
        date="2025-10-27"
        completed={false}
      />
      <TodoItem
        title="Tailwind 색상 변수 적용하기"
        date="2025-10-28"
        completed={true}
      />
      <TodoItem
        title="IndexedDB 연동 시나리오 설계"
        date="2025-10-29"
        completed={false}
      />
    </ul>
  );
}
