# 김희원 프론트엔드 개발자 과제 안내

## 프로젝트 소개

- React + Vite 환경으로 구현한 TODO 웹서비스입니다.
- 디자인 및 컴포넌트 구현을 위해 Tailwind와 shadcn/ui를 사용했습니다.
- 상태 관련 라이브러리로 Zustand를 사용했습니다.
- 영속성을 위해 IndexedDB 사용을 돕는 Dexie 라이브러리를 사용했습니다.
- 유닛 테스트를 위해 Jest를 사용했습니다.
- 그 외에 SVG 아이콘을 위해 lucide-react, 날짜 처리를 위해 date-fns를 사용했습니다.

## 🔷 프로젝트 실행방법

```bash
# 1) todo-list 디렉토리로 이동 후 의존성 설치
cd todo-list
npm install

# 2) 개발 모드 실행
npm run dev

# 3) 테스트 코드 실행
npm test
```

- 의존성 설치 후 개발 모드로 실행 시 localhost에서 프로젝트를 확인할 수 있습니다.
- 의존성 설치 후 테스트 코드를 실행하면 3개의 유닛 테스트가 실행되는 것을 확인할 수 있습니다.

---

## 🔷 프로젝트 구조

- `docs/` : MoSCoW 요구사항, AI 활용내역 정리
- `todo-list/src/components/` : 컴포넌트 관련 TypeScript 클라이언트 소스
- `todo-list/src/constants/` : 컴포넌트에서 사용되는 상수 정리
- `todo-list/src/db/` : Indexed DB 관련 디렉토리
- `todo-list/src/pages/` : 페이지 관련 디렉토리
- `todo-list/src/stores/` : Zustand 이용 디렉토리
- `todo-list/src/types/` : 공용 타입 정의
- `todo-list/src/utils/` : 유틸 함수 및 해당 테스트 코드

---

## 🔷 페이지 설명

시연 영상 링크: https://drive.google.com/file/d/1tWGuHZjTgK3PooTbUjrh_pX_Wp-33vU3/view?usp=sharing

### StatsCards

- 상단의 전체 / 완료 / 진행 중 / 지연은 현재 TODO들의 상태를 나타냅니다.
- **전체**: 모든 TODO의 개수
- **완료**: 좌측 체크박스가 체크된 TODO의 개수
- **진행 중**: 좌측 체크박스가 체크되지 않은 TODO의 개수
- **지연**: (정의에 따라) 마감일이 오늘 날짜 이전인 TODO의 개수

### FilterTabs

- 전체, 진행 중, 완료 탭이 있습니다.
- **전체** 버튼: 모든 TODO를 표시합니다.
- **진행 중** 버튼: 좌측 체크박스가 **체크되지 않은** TODO만 표시합니다.
- **완료** 버튼: 좌측 체크박스가 **체크된** TODO만 표시합니다.
- **추가** 버튼: 새로운 TODO를 추가할 수 있습니다.

### TodoList

- FilterTabs 값에 따라 해당되는 TODO를 표시합니다.
- 긴 제목과 내용은 ‘…’로 생략해 디자인 깨짐을 방지합니다.
- 좌측 체크박스 클릭 시 완료 상태로 변경됩니다.
- 우측 상단에 수정/삭제 버튼이 있습니다.
- 항목 클릭 시 상세 보기가 가능합니다.

### TodoDialog

- TODO 클릭 시 나타나는 내용 상세 보기 모달입니다.
- 연속된 문자열의 경우 자동으로 개행 문자를 삽입해 디자인 깨짐을 방지합니다.

### TodoDetailDialog

- TODO 수정/추가 시 사용하는 모달입니다.
- 입력 칸이 비어 있으면 제출 버튼이 비활성화됩니다.
- 제목과 내용에는 글자 수 제한이 있습니다.

### 컴포넌트 외 기능

- 반응형을 고려해 좌우 **너비**가 줄어들어도 컴포넌트가 깨지지 않도록 설계했습니다.
- 유틸 함수들에 대한 테스트 코드를 작성했습니다.
- Git PR 템플릿을 적용하고 기능 단위로 브랜치를 나눠 진행 상황을 기록했습니다.
- AI PR 리뷰를 통해 코드 품질을 개선했습니다.

---

## 🔷 이전 PR 링크 모음

- 🎉 Init: 프로젝트 초기 설정: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/1
- ✨ Feat: 컴포넌트 설계 및 구현: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/2
- ✨ Feat: IndexedDB 연결 및 영속성 보장: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/3
- ✅ Test: Jest 테스트 코드 작성: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/4
- 🔨 Refactor: 접근성 향상 및 코드 개선: https://github.com/heewon1104/krafton-fe-todo-assignment/pull/5
