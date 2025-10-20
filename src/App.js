import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const raw = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
      const input = this.normalizeInput(raw);
      const result = this.calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (e) {
      const msg = e && e.message ? e.message : "알 수 없는 오류가 발생했습니다.";
      Console.print(`[ERROR] ${msg}`);
    }
  }

  normalizeInput(raw) {
    let s = String(raw ?? "");

    s = s.replace(/\r\n/g, "\n");
    s = s.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");

    if (s.trim() === "") return "";

    return s.replace(/\s+$/g, "");
  }

  calculate(s) {
    const ERROR_INVALID_INPUT = "양의 정수만 입력할 수 있습니다.";
    const ERROR_DELIM_SYNTAX = "커스텀 구분자 형식이 올바르지 않습니다.";
    const ERROR_DELIM_LENGTH = "커스텀 구분자는 공백이 아닌 한 글자여야 합니다.";

    if (s === "") return 0;

    let body = s;
    let custom = null;
    const m = body.match(/^\/\/([^\n])\n([\s\S]*)$/);
    if (m) {
      custom = m[1];
      body = m[2];
      if (String(custom).trim() === "") throw new Error(ERROR_DELIM_LENGTH);
    } else if (body.startsWith("//")) {
      throw new Error(ERROR_DELIM_SYNTAX);
    }

    if (custom !== null) {
      body = body.split(custom).join(",");
    }

    const tokens = body.trim().split(/,|:/);

    let sum = 0;
    for (const t of tokens) {
      if (t === "") continue; 
      const n = Number(t.trim());

      if (!Number.isInteger(n) || n <= 0) {
        throw new Error(ERROR_INVALID_INPUT);
      }
      sum += n;
    }
    return sum;
  }
}

export default App;