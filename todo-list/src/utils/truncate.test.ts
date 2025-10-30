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
