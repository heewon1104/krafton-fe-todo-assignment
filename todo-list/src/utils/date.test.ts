import { formatKoreanDate, parseDue } from './date';

describe('formatKoreanDate', () => {
  it('yyyy년 m월 d일 요일 형식으로 포맷한다', () => {
    // 2025-10-30은 (KST 기준) 목요일
    const d = new Date('2025-10-30T12:34:56+09:00');
    const s = formatKoreanDate(d);
    expect(s).toBe('2025년 10월 30일 목요일');
  });

  it('월과 일이 한 자리여도 0을 붙이지 않고 출력한다', () => {
    // 2025-02-09은 일요일
    const d = new Date('2025-02-09T00:00:00+09:00');
    const s = formatKoreanDate(d);
    // 구현은 0-padding이 없으니 "2월 9일"이어야 함
    expect(s.startsWith('2025년 2월 9일')).toBe(true);
  });
});

describe('parseDue', () => {
  it('유효한 문자열 "yyyy. M. d." 를 Date로 파싱한다', () => {
    const parsed = parseDue('2025. 10. 30.');
    expect(parsed).not.toBeNull();
    // 타입 가드
    if (parsed) {
      expect(parsed.getFullYear()).toBe(2025);
      expect(parsed.getMonth()).toBe(9); // 0=Jan, 9=Oct
      expect(parsed.getDate()).toBe(30);
    }
  });

  it('한 자리 월/일도 파싱한다 (예: "2025. 2. 9.")', () => {
    const parsed = parseDue('2025. 2. 9.');
    expect(parsed).not.toBeNull();
    if (parsed) {
      expect(parsed.getFullYear()).toBe(2025);
      expect(parsed.getMonth()).toBe(1); // Feb
      expect(parsed.getDate()).toBe(9);
    }
  });

  it('형식이 다르면 null을 반환한다', () => {
    expect(parseDue('2025-10-30')).toBeNull();
    expect(parseDue('2025/10/30')).toBeNull();
    expect(parseDue('')).toBeNull();
    expect(parseDue(undefined)).toBeNull();
  });
});
