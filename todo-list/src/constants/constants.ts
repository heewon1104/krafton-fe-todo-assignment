import type { Filter } from '@/types/todo';
import type { Todo } from '@/types/todo';

export const FILTERS: Filter[] = [
  { key: 'all', label: '전체' },
  { key: 'progress', label: '진행중' },
  { key: 'done', label: '완료' },
];

export const TODOS: Todo[] = [
  {
    id: 1,
    title: '버그 수정',
    desc: '로그인 페이지 버그 수정 및 테스트',
    priority: '높음',
    date: '2024. 1. 22.',
    tone: 'red',
    done: false,
  },
  {
    id: 2,
    title: '프로젝트 기획서 작성',
    desc: 'Q1 신규 프로젝트 기획서 초안 작성 및 검토',
    priority: '높음',
    date: '2024. 1. 25.',
    tone: 'orange',
    done: false,
  },
  {
    id: 3,
    title: '코드 리뷰',
    desc: 'PR #123 코드 리뷰 및 피드백 작성',
    priority: '중간',
    date: '2024. 1. 24.',
    tone: 'orange',
    done: false,
  },
  {
    id: 4,
    title: '문서 업데이트',
    desc: 'API 문서 최신 버전으로 업데이트',
    priority: '낮음',
    date: '2024. 1. 26.',
    tone: 'blue',
    done: false,
  },
  {
    id: 5,
    title: '팀 미팅 준비',
    desc: '주간 팀 미팅 아젠다 준비 및 자료 정리',
    priority: '중간',
    date: '2024. 1. 23.',
    tone: 'green',
    done: true,
  },
];
