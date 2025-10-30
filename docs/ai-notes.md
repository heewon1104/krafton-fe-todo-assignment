# 1. PR 리뷰를 통한 코드 리뷰 진행

## 사용 도구

- copilot, gemini-code-assist

## 배경 및 활용 과정

- 내가 코드를 맞게 작성하는지 평가를 해줄 수단이 필요하다 느낌
- PR 리뷰 수단중 Gemini Codde assist와 Copilot을 사용 가능한 것을 확인
- 작성한 우선순위 설계서를 바탕으로 Feature 단위로 브랜치를 나누고, Main에 Merge하기전에 코드 리뷰를 요청하여 분석
- 분석한 리뷰를 토대로 놓친 부분 일부는 반영하여 코드 수정

## 대표적인 활용 예시

- **웹 접근성 향상을 위해 <label> 태그에 htmlFor 속성을 추가하라는 리뷰가 달려 해당 리뷰 반영**
  - 링크: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/2

- **'진행중'(progress)과 '지연'(late) 로직 구현 하는 부분을 까먹어 같은 로직이라는 리뷰가 달려 구현하여 반영**
  - 링크: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/3

- **toneByPriority 객체에서 낮음을 green이 아닌 blue로 색상을 잘못 매핑하여 수정**
  - 링크: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/3

---

## 2. 디자인 초안 작성

## 사용 도구

- ChatGPT Atlas, Readdy

### 배경 및 활용 과정

- 다지인에 관한 명세가 없기에 어떤 자료를 참고하여 과제를 진행해야 할지 고민하였음
- 최근 ChatGPT Atlas가 공개되면서 웹 브라우저 내에서 GPT를 사용할 수 있음
- Readdy라는 디자인 웹사이트를 통해 AI 프롬프트를 주면 해당 프롬프트를 기반으로 디자인 초안을 만들어주는 것을 알 수 있었음
- 과제 안내 PDF를 웹 페이지로 띄우고, Readdy 웹사이트에 사용할 프롬프트를 작성 해달라고 Atlas 내부 GPT 모델에게 부탁함
- Readdy에 해당 결과 프롬프트를 전달, 디자인 계획서 생성

### 활용 예시 스크린샷

- **ChatGPT Atlas를 이용하여 과제 분석 및 프롬프트 생성**

<img width="1845" height="949" alt="스크린샷 2025-10-28 오후 8 57 26" src="https://github.com/user-attachments/assets/3d36b0c2-5a09-4644-88ce-fe3144f02397" />

- **생성한 프롬프트를 Readdy에 전달하여 디자인 계획서 생성**

<img width="1499" height="898" alt="스크린샷 2025-10-28 오후 8 57 09" src="https://github.com/user-attachments/assets/b708bd4e-7ecf-482f-a735-e21af68ae95e" />

---

## 3. 초기 컴포넌트 구현

## 사용 도구

- ChatGPT

### 배경 및 활용 과정

- 구현해야 할 양이 많아 초기 컴포넌트 구현에 많은 시간이 걸렸음
- 과제 요구사항에도 AI를 이해하고 활용하여 초기 컴포넌트 설계에 사용 가능하다는 것을 확인
- Readdy를 이용하여 생성한 디자인 계획서 스크린샷 + Shadcn과 Tailwind를 이용하여 하나의 Page 컴포넌트로 설계해달라 지시

## 대표적인 활용 예시

- **위 과정을 통해 하나의 긴 Page 컴포넌트 생성**
  - 항상 AI 사용시 다음과 같은 기준을 세우고 사용
    - 이 코드의 동작 원리를 내가 설명할 수 있는지
    - 우리 프로젝트의 구조나 컨벤션과 일관되는지
    - 문제 발생 시 스스로 수정할 수 있을지
  - 해당 코드를 보고, 디자인 설계서와 비슷하게 디자인을 수정
  - 컴포넌트를 기능별로 분리하고 코드를 수정

<details>
    <summary><strong>생성했던 초기 컴포넌트 코드</strong></summary>

```jsx
import { useMemo, useState } from "react";
import {
CalendarDays,
CheckCircle2,
Clock4,
AlertTriangle,
Plus,
Pencil,
Trash2,
CircleCheck,
Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/*
✅ 변경 요약
- grid → flex 레이아웃으로 전면 교체
- UI 컴포넌트 분리 (TopBar / StatsBar / FilterBar / TodoCard / EditDialog)
- 퍼블리싱/디자인 전용 목업 (기능 없음)
*/

// 타입
type Stat = { label: string; value: number; icon: React.ComponentType<{ className?: string }> };
type Todo = {
id: number;
title: string;
desc: string;
priority: "높음" | "중간" | "낮음";
date: string;
tone: "red" | "orange" | "blue" | "green";
done: boolean;
};

// 고정 목업 데이터
const MOCK = {
stats: [
    { label: "전체", value: 5, icon: CalendarDays },
    { label: "완료", value: 1, icon: CheckCircle2 },
    { label: "진행중", value: 4, icon: Clock4 },
    { label: "지연", value: 4, icon: AlertTriangle },
] as Stat[],
filters: [
    { key: "all", label: "전체" },
    { key: "progress", label: "진행중" },
    { key: "done", label: "완료" },
],
items: [
    { id: 1, title: "버그 수정", desc: "로그인 페이지 버그 수정 및 테스트", priority: "높음" as const, date: "2024. 1. 22.", tone: "red" as const, done: false },
    { id: 2, title: "프로젝트 기획서 작성", desc: "Q1 신규 프로젝트 기획서 초안 작성 및 검토", priority: "높음" as const, date: "2024. 1. 25.", tone: "orange" as const, done: false },
    { id: 3, title: "코드 리뷰", desc: "PR #123 코드 리뷰 및 피드백 작성", priority: "중간" as const, date: "2024. 1. 24.", tone: "orange" as const, done: false },
    { id: 4, title: "문서 업데이트", desc: "API 문서 최신 버전으로 업데이트", priority: "낮음" as const, date: "2024. 1. 26.", tone: "blue" as const, done: false },
    { id: 5, title: "팀 미팅 준비", desc: "주간 팀 미팅 아젠다 준비 및 자료 정리", priority: "중간" as const, date: "2024. 1. 23.", tone: "green" as const, done: true },
] as Todo[],
};

function formatKoreanDate(d: Date) {
const y = d.getFullYear();
const m = d.getMonth() + 1;
const day = d.getDate();
const weekday = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(d);
return `${y}년 ${m}월 ${day}일 ${weekday}`;
}

/* ----------------------------- 분리 컴포넌트 ----------------------------- */
function TopBar({ todayStr }: { todayStr: string }) {
return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
        <div className="h-9 w-9 grid place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <CalendarDays className="h-5 w-5" />
        </div>
        <span className="font-semibold text-xl">Readdy TODO</span>
        </div>
        <div className="text-sm text-slate-500">{todayStr}</div>
    </div>
    </header>
);
}

function StatsBar({ stats }: { stats: Stat[] }) {
return (
    <section className="flex flex-wrap gap-4">
    {stats.map((s, i) => (
        <Card key={i} className="rounded-2xl shadow-sm flex-1 min-w-[180px]">
        <CardContent className="p-4 flex items-center justify-between">
            <div className="text-slate-500 text-sm">{s.label}</div>
            <div className="flex items-center gap-2">
            <s.icon className="h-4 w-4 text-slate-400" />
            <div className="text-xl font-semibold">{s.value}</div>
            </div>
        </CardContent>
        </Card>
    ))}
    </section>
);
}

function FilterBar({
tab,
setTab,
onAdd,
}: {
tab: string;
setTab: (v: string) => void;
onAdd: () => void;
}) {
return (
    <section className="flex items-center justify-between">
    <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">할 일 목록</h2>
        <Separator orientation="vertical" className="h-5" />
        <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-full">
            {MOCK.filters.map((f) => (
            <TabsTrigger key={f.key} value={f.key} className="rounded-full px-4">
                {f.label}
            </TabsTrigger>
            ))}
        </TabsList>
        </Tabs>
    </div>
    <Button className="rounded-full" size="sm" onClick={onAdd}>
        <Plus className="mr-1 h-4 w-4" /> 추가
    </Button>
    </section>
);
}

function TodoCard({ item, onEdit }: { item: Todo; onEdit: () => void }) {
return (
    <article
    className={cn(
        "group relative rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 w-full md:w-1/2 xl:w-1/3",
        item.tone === "red" && "border-l-4 border-red-400",
        item.tone === "orange" && "border-l-4 border-orange-300",
        item.tone === "blue" && "border-l-4 border-sky-300",
        item.tone === "green" && "border-l-4 border-emerald-300",
        item.done && "opacity-70"
    )}
    >
    <div className="flex items-start gap-3">
        <div className="pt-1">
        <Checkbox checked={item.done} aria-label="완료 체크" />
        </div>
        <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
            <h3 className={cn("font-semibold", item.done && "line-through text-slate-400")}>{item.title}</h3>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Trash2 className="h-4 w-4" />
            </Button>
            </div>
        </div>
        <p className={cn("text-sm text-slate-600", item.done && "line-through text-slate-400")}>{item.desc}</p>
        <div className="flex items-center justify-between pt-2">
            <Badge
            variant="secondary"
            className={cn(
                "rounded-md px-2",
                item.priority === "높음" && "bg-red-50 text-red-600",
                item.priority === "중간" && "bg-amber-50 text-amber-600",
                item.priority === "낮음" && "bg-sky-50 text-sky-600"
            )}
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

function EditDialog({
open,
onOpenChange,
}: {
open: boolean;
onOpenChange: (v: boolean) => void;
}) {
const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
        <DialogTitle>TODO 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">제목 *</label>
            <Input placeholder="제목" defaultValue="코드 리뷰" />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">내용</label>
            <Textarea placeholder="내용" defaultValue="PR #123 코드 리뷰 및 피드백 작성" maxLength={500} />
            <div className="text-xs text-slate-500">22/500</div>
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">마감일 *</label>
            <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                    ? selectedDate.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
                    : "날짜 선택"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
            </Popover>
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">우선순위</label>
            <Select defaultValue="중간">
            <SelectTrigger className="w-full">
                <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="높음">높음</SelectItem>
                <SelectItem value="중간">중간</SelectItem>
                <SelectItem value="낮음">낮음</SelectItem>
            </SelectContent>
            </Select>
        </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
        <Button variant="outline">취소</Button>
        <Button>
            <CircleCheck className="mr-1 h-4 w-4" /> 수정
        </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
);
}

/* --------------------------------- 페이지 -------------------------------- */
export default function ReaddyTodoPage() {
const todayStr = useMemo(() => formatKoreanDate(new Date()), []);
const [tab, setTab] = useState("all");
const [editOpen, setEditOpen] = useState(false);

return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
    <TopBar todayStr={todayStr} />

    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsBar stats={MOCK.stats} />

        <FilterBar tab={tab} setTab={setTab} onAdd={() => setEditOpen(true)} />

        {/* 카드 리스트: flex 레이아웃 */}
        <section className="flex flex-wrap gap-5">
        {MOCK.items.map((item) => (
            <TodoCard key={item.id} item={item} onEdit={() => setEditOpen(true)} />
        ))}
        </section>
    </main>

    <EditDialog open={editOpen} onOpenChange={setEditOpen} />
    </div>
);
}
```

</details>

---

## 4. 테스트 코드 시뮬레이션 및 작성

## 사용 도구

- ChatGPT

### 배경 및 활용 과정

- 테스트 코드를 많이 작성해 보지 않아 작성 및 설계에 어려움을 느낌
- 순수함수 형태로 분리한 유틸 함수들에 대해 테스트 상황을 AI에게 제공
- AI가 해당 상황에 대한 테스트 코드 작성
- 해당 코드를 보고 참고하여 비슷한 테스트 코드 작성

## 대표적인 활용 예시

* 
    <details>
    <summary><strong>1. 테스트 코드를 생성할 유틸 함수</strong></summary>

    ```js
    export function truncate(text: string, max: number): string {
    if (typeof text !== 'string') return '';
    if (max <= 0) return '....';
    if (text.length <= max) return text;
    return text.slice(0, max) + '....';
    }
    ```

    </details>


* **2. 작성할 상황 제시 -> "길이가 max 이하이면 원문 그대로 반환하는 Jest 테스트 코드 작성해줘"**



* 
    <details>
    <summary><strong>AI 이용하여 구현한 테스트코드</strong></summary>

    ```js

    it('길이가 max 이하이면 원문을 반환한다', () => {
        expect(truncate('hello', 5)).toBe('hello');
        expect(truncate('hi', 5)).toBe('hi');
    });

    ```

    </details>


* 
    <details>
    <summary><strong>참고하여 학습 및 나머지 테스트코드 작성</strong></summary>

    ```js

    import { truncate } from './truncate';

    describe('truncate', () => {
    it('문자열이 아니면 빈 문자열을 반환한다', () => {
        expect(truncate(null, 10)).toBe('');
        expect(truncate(undefined, 10)).toBe('');
    });

    it('max <= 0 이면 "...."를 반환한다', () => {
        expect(truncate('hello', 0)).toBe('....');
        expect(truncate('hello', -5)).toBe('....');
    });

    it('길이가 max 이하이면 원문을 반환한다', () => {
        expect(truncate('hello', 5)).toBe('hello');
        expect(truncate('hi', 5)).toBe('hi');
    });

    it('길이가 max를 넘으면 잘라서 "...."를 붙인다', () => {
        expect(truncate('hello world', 5)).toBe('hello' + '....');
        expect(truncate('abcdef', 3)).toBe('abc' + '....');
    });

    it('max가 문자열 길이보다 1 작을 때도 정상 처리한다', () => {
        expect(truncate('12345', 4)).toBe('1234' + '....');
    });
    });


    ```

    </details>

---

## 5. 처음 접하는 라이브러리 예제 이용

## 사용 도구

- ChatGPT

### 배경 및 활용 과정

- Indexed DB나 Dexied와 같은 처음 보는 공식문서만 보고 구현하기에 어려움을 느낌
- AI에게 구현해야하는 상황을 알려주고 해당 문제를 해결하기 위해 도움이 될만한 예제코드를 달라 제시함

## 대표적인 활용 예시

<details>
  <summary><strong>1. 구현해야하는 상황 지시</strong></summary>

```
React + TS, 전역 상태는 Zustand,
IndexedDB를 Dexie로 쓰고 싶으며
DB가 바뀌면 화면이 자동으로 갱신되게 liveQuery로 실시간 구독하고, 구독 시작/해제를 제어하는 액션이 필요함
CRUD와 필터를 포함하여 직접적으로 알려주지 말고 참고할 수 있는 예제 코드 알려줘
```

</details>

<details>
  <summary><strong>2. AI가 알려준 예시코드</strong></summary>

```js
// store.ts (참고용)
import { create } from 'zustand';
import { liveQuery } from 'dexie';
import { db } from './db';
import { addTodoMinimal, patchTodoMinimal, removeTodoMinimal } from './todoRepo';

type FilterKey = 'all' | 'active' | 'done';
// type Todo = ... // 네 타입 사용

let unsub: null | (() => void) = null;

export const useTodoStore = create<any>((set, get) => ({
  todos: [],
  filter: 'all' as FilterKey,
  loading: true,

  setFilter: (f: FilterKey) => set({ filter: f }),

  // CRUD는 리포지토리로 얇게 위임
  create: (input: any) => addTodoMinimal(input),
  patch: (id: number, patch: any) => patchTodoMinimal(id, patch),
  delete: (id: number) => removeTodoMinimal(id),

  // 실시간 구독 핵심만
  startLiveSync: () => {
    if (unsub) return; // 중복 방지
    const sub = liveQuery(() =>
      db.table('todos').orderBy('updatedAt').reverse().toArray()
    ).subscribe({
      next: (rows) => set({ todos: rows, loading: false }),
      error: () => set({ loading: false }),
    });
    unsub = () => sub.unsubscribe();
  },

  stopLiveSync: () => {
    unsub?.();
    unsub = null;
  },
}));

```
</details>

<details>
  <summary><strong>3. 최종 결과물</strong></summary>

``` js
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { liveQuery } from 'dexie';
import { getDB } from '@/db/dbConnection';
import type { Todo, FilterKey } from '@/types/todo';
import { addTodo, updateTodo, removeTodo } from '@/db/todoRepo';

type TodoState = {
todos: Todo[];
filter: FilterKey;
loading: boolean;
};

type TodoActions = {
setFilter: (f: FilterKey) => void;

create: (input: Omit<Todo, 'id'>) => Promise<void>;
patch: (id: number, patch: Partial<Omit<Todo, 'id'>>) => Promise<void>;
delete: (id: number) => Promise<void>;

// liveQuery 관리
startLiveSync: () => void;
stopLiveSync: () => void;
};

type Store = TodoState & TodoActions;

const unsubscribeLive: { current: (() => void) | null } = { current: null };

export const useTodoStore = create<Store>()(
subscribeWithSelector((set) => ({
todos: [],
filter: 'all',
loading: true,

setFilter: (f) => set({ filter: f }),

create: async (input) => {
    await addTodo(input);
},

patch: async (id, patch) => {
    await updateTodo(id, patch);
},

delete: async (id) => {
    await removeTodo(id);
},

startLiveSync: () => {
    if (unsubscribeLive.current) return;

    const sub = liveQuery(async () => {
    const db = getDB();
    return db.todos.toArray();
    }).subscribe({
    next: (rows) => set({ todos: rows, loading: false }),
    error: (err) => {
        console.error('liveQuery error:', err);
        set({ loading: false });
    },
    });

    unsubscribeLive.current = () => sub.unsubscribe();
},
stopLiveSync: () => {
    unsubscribeLive.current?.();
    unsubscribeLive.current = null;
},
}))
);

```
</details>