import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const rawInput = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");

      const input = String(rawInput ?? "")
        .replaceAll("\\r\\n", "\n")
        .replaceAll("\\n", "\n");

      const result = this.#calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }

  #calculate(raw) {
    const ERROR_INVALID_INPUT = "양의 정수만 입력할 수 있습니다.";
    const ERROR_DELIMITER_SYNTAX = "커스텀 구분자 형식이 올바르지 않습니다.";
    const ERROR_DELIMITER_LENGTH = "커스텀 구분자는 공백이 아닌 한 글자여야 합니다.";

    let input = String(raw ?? "");
    if (input.trim() === "") return 0;

    let rest = input;
    let custom = null;

    if (rest.startsWith("//")) {
      const nl = rest.indexOf("\n");
      if (nl === -1) throw new Error(ERROR_DELIMITER_SYNTAX);

      custom = rest.slice(2, nl);
      if (custom.length !== 1 || custom.trim() === "") {
        throw new Error(ERROR_DELIMITER_LENGTH);
      }
      rest = rest.slice(nl + 1);
    }

    rest = rest.trim();

    if (custom !== null) {
      rest = rest.replaceAll(custom, ",");
    }

    const tokens = rest.split(/,|:/);

    const sum = tokens.reduce((acc, t) => {
      if (t === "") return acc;
      const n = Number(t);

      if (Number.isNaN(n) || n <= 0 || !Number.isInteger(n)) {
        throw new Error(ERROR_INVALID_INPUT);
      }
      return acc + n;
    }, 0);

    return sum;
  }
}

export default App;