import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const raw = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
      const input = this.normalize(raw);
      const result = this.calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (e) {
      const msg = e && e.message ? e.message : "알 수 없는 오류가 발생했습니다.";
      Console.print(`[ERROR] ${msg}`);
    }
  }

  normalize(raw) {
    let s = String(raw == null ? "" : raw);
    s = s.replace(/\r\n/g, "\n");
    s = s.replace(/\\r\\n/g, "\n");
    s = s.replace(/\\n/g, "\n");
    return s.trim();
  }

  calculate(s) {
    const ERR_INV_INPUT = "양의 정수만 입력할 수 있습니다.";
    const ERR_SYNTAX = "커스텀 구분자 형식이 올바르지 않습니다.";
    const ERR_LEN = "커스텀 구분자는 공백이 아닌 한 글자여야 합니다.";

    if (s === "") return 0;

    let body = s;
    let custom = null;

    const m = body.match(/^\/\/([^\n])\n([\s\S]*)$/);
    if (m) {
      custom = m[1];
      body = m[2];
      if (String(custom).trim() === "" || custom.length !== 1) {
        throw new Error(ERR_LEN);
      }
    } else if (body.indexOf("//") === 0) {
      throw new Error(ERR_SYNTAX);
    }

    if (custom !== null) {
      body = body.split(custom).join(",");
    }

    const tokens = body.split(/[,:\s]+/);

    let sum = 0;
    for (let i = 0; i < tokens.length; i += 1) {
      const t = tokens[i];
      if (t === "") continue;
      const n = Number(t);

      if (!Number.isInteger(n) || n <= 0) {
        throw new Error(ERR_INV_INPUT);
      }
      sum += n;
    }
    return sum;
    }
}

export default App;