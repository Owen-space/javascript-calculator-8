import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const raw = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");

      const input = String(raw ?? "")
        .replaceAll("\\r\\n", "\n")
        .replaceAll("\\n", "\n");

      const result = this.#calc(input);
      Console.print(`결과 : ${result}`);
    } catch (e) {
      Console.print(`[ERROR] ${e.message ?? "알 수 없는 오류가 발생했습니다."}`);
    }
  }

  #calc(inputRaw) {
    const ERROR_INVALID_INPUT = "양의 정수만 입력할 수 있습니다.";
    const s = String(inputRaw ?? "");
    if (s.trim() === "") return 0;

    let body = s;
    const m = s.match(/^\/\/(.)\n([\s\S]*)$/);
    if (m) {
      const delimiter = m[1];
      body = m[2];
      body = body.split(delimiter).join(",");
    }

    const tokens = body.trim().split(/,|:/);

    let sum = 0;
    for (const t of tokens) {
      if (t === "") continue;
      const n = Number(t);

      if (!Number.isInteger(n) || n <= 0) {
        throw new Error(ERROR_INVALID_INPUT);
      }
      sum += n;
    }

    return sum;
  }
}

export default App;