import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");
      const result = this.#calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (error) {
      Console.print(`[ERROR] ${error.message}`);
    }
  }

  // 문자열 덧셈 계산기
  #calculate(raw) {
    const ERROR_INVALID_INPUT = "양의 정수만 입력할 수 있습니다.";
    const ERROR_INVALID_DELIMITER = "문자열에 공백이나 잘못된 구분자가 포함되었습니다.";
    const ERROR_DELIMITER_SYNTAX = "커스텀 구분자 형식이 올바르지 않습니다.";
    const ERROR_DELIMITER_LENGTH = "커스텀 구분자는 공백이 아닌 한 글자여야 합니다.";

    const input = String(raw ?? "");
    if (input.trim() === "") return 0;

    let rest = input;
    let custom = null;

    // 커스텀 구분자: //<구분자>\n숫자들
    if (rest.startsWith("//")) {
      const nl = rest.indexOf("\n");
      if (nl === -1) throw new Error(ERROR_DELIMITER_SYNTAX);

      custom = rest.slice(2, nl);
      if (custom.length !== 1 || custom.trim() === "") {
        throw new Error(ERROR_DELIMITER_LENGTH);
      }

      rest = rest.slice(nl + 1);
    }

    // 앞뒤 공백 방어
    rest = rest.trim();

    // 커스텀 구분자를 기본 구분자(,)로 치환
    if (custom !== null) {
      rest = rest.replaceAll(custom, ",");
    }

    // 허용되지 않은 문자 존재 여부(숫자, 콤마, 콜론만 허용)
    if (/[^0-9,:]/.test(rest)) {
      throw new Error(ERROR_INVALID_DELIMITER);
    }

    // 분리 및 숫자 변환
    const tokens = rest.split(/,|:/);

    const sum = tokens.reduce((acc, t) => {
      if (t === "") return acc;
      const n = Number(t);

      // 양의 정수만 허용
      if (Number.isNaN(n) || n <= 0 || !Number.isInteger(n)) {
        throw new Error(ERROR_INVALID_INPUT);
      }

      return acc + n;
    }, 0);

    return sum;
  }
}

export default App;