import { forceWrapLongRuns } from './forceWrapLongRuns';

describe('forceWrapLongRuns', () => {
  it('빈 문자열이면 빈 문자열을 반환한다', () => {
    expect(forceWrapLongRuns('', 10)).toBe('');
  });

  it('maxRun <= 0 이면 원문을 그대로 반환한다', () => {
    expect(forceWrapLongRuns('hello world', 0)).toBe('hello world');
    expect(forceWrapLongRuns('hello world', -1)).toBe('hello world');
  });

  it('토큰 길이가 maxRun 이하이면 변경하지 않는다', () => {
    expect(forceWrapLongRuns('hello world', 10)).toBe('hello world');
  });

  it('긴 연속 토큰을 maxRun 단위로 줄바꿈 삽입한다(기본 \\n)', () => {
    const s = 'aaaaaaaaaa';
    expect(forceWrapLongRuns(s, 3)).toBe('aaa\naaa\naaa\na');
  });

  it('공백/탭/개행 토큰은 유지한다(원래 공백 보존)', () => {
    const s = 'aaaa\tbbbb  cccc\ndddd';
    const out = forceWrapLongRuns(s, 4);
    expect(out).toBe('aaaa\tbbbb  cccc\ndddd');
  });

  it('긴 토큰만 분할하고, 주변 공백은 그대로 둔다', () => {
    const s = 'hey  aaaaaaaa  you';
    const out = forceWrapLongRuns(s, 3);
    expect(out).toBe('hey  aaa\naaa\naa  you');
  });

  it('insert 파라미터로 커스텀 구분자 삽입 가능', () => {
    const s = 'abcdefgh';
    expect(forceWrapLongRuns(s, 2, '|')).toBe('ab|cd|ef|gh');
  });

  it('혼합 문자열에서도 정상 동작한다', () => {
    const s = 'AAAAAA   BBBBBBBB\tCCCCCCCC\nDD';
    const out = forceWrapLongRuns(s, 3, '/');
    expect(out).toBe('AAA/AAA   BBB/BBB/BB\tCCC/CCC/CC\nDD');
  });
});
