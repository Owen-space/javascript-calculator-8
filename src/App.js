import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      // 입력 받기
      const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.\n");

      // 문자열 계산
      const result = this.calculator(input);

      // 결과 출력
      Console.print(`결과 : ${result}`);
    } catch (error) {
      // 요구사항:[ERROR]로 시작
      Console.print(`[ERROR] ${error.message}`);
    }
  }

  // 문자열 덧셈 계산기
  calculator(input) {
    const DEFAULT_DIVIDER = /,|:/;
    const ERROR_INVALID_INPUT = "양의 정수만 입력할 수 있습니다.";
    const ERROR_INVALID_DIVIDER = "문자열에 공백이나 잘못된 구분자가 포함되었습니다.";
    const ERROR_DIVIDER_SYNTAX = "커스텀 구분자 형식이 올바르지 않습니다.";
    const ERROR_DIVIDER_LENGTH = "커스텀 구분자는 공백이 아닌 한 글자여야 합니다.";

    // 공백 처리 포함: 빈 입력이면 0
    if (input.trim() === "") return 0;

    let rest = input;
    let customDivider = null;

    // 커스텀 구분자 선언 형태: //<구분자>\n숫자들
    if (rest.startsWith("//")) {
      const endIndex = rest.indexOf("\n"); // ← '\\n' (문자 두 개) 아님, 실제 줄바꿈 문자
      if (endIndex === -1) throw new Error(ERROR_DIVIDER_SYNTAX);

      customDivider = rest.slice(2, endIndex);
      if (customDivider.length !== 1 || customDivider.trim() === "") {
        throw new Error(ERROR_DIVIDER_LENGTH);
      }

      // 구분자 선언부 제거
      rest = rest.slice(endIndex + 1);
    }

    // 커스텀 구분자를 기본 구분자(,)로 치환
    if (customDivider !== null) {
      rest = rest.replaceAll(customDivider, ",");
    }

    // 허용된 문자(숫자, ',', ':') 외 있으면 에러
    if (rest.replace(/[0-9,:]/g, "") !== "") {
      throw new Error(ERROR_INVALID_DIVIDER);
    }

    // 분리 후 숫자 변환 + 검증
    const tokens = rest.split(DEFAULT_DIVIDER);

    const sum = tokens.reduce((acc, cur) => {
      // 빈 토큰은 0으로 (예: "1,,2")
      if (cur === "") return acc;

      const num = Number(cur);

      // NaN, 0, 음수, 정수 아님 → 에러 (README 기준)
      if (Number.isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        throw new Error(ERROR_INVALID_INPUT);
      }

      return acc + num;
    }, 0);

    return sum;
  }
}

export default App;