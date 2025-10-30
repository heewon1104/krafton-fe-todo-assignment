export function forceWrapLongRuns(
  text: string,
  maxRun: number,
  insert: string = '\n'
): string {
  if (!text) return '';
  if (maxRun <= 0) return text;

  // 공백(스페이스/탭/개행) 기준으로 토큰 분리
  const tokens = text.split(/(\s+)/); // 구분자(공백)도 유지됨
  const chunked = tokens.map((tok) => {
    // 공백 토큰은 그대로
    if (/^\s+$/.test(tok)) return tok;

    // 비공백(연속 문자열) 토큰만 처리
    if (tok.length <= maxRun) return tok;

    const parts: string[] = [];
    for (let i = 0; i < tok.length; i += maxRun) {
      parts.push(tok.slice(i, i + maxRun));
    }
    return parts.join(insert);
  });

  return chunked.join('');
}
