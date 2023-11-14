import { Console } from "@woowacourse/mission-utils";

const InputView = {
    async readDate() {
        const input = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n");
        const day = Number(input);
        if (day < 1 || day > 31 || isNaN(day)) {
            Console.print('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
            return this.readDate();
          }
          return day;
    }
}

export default InputView;