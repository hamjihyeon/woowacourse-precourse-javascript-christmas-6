import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    const day = await this.validDay();
  }
  async validDay() {
    const day = Number(await Console.readLineAsync('12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n'));
    if (day < 1 || day > 31 || isNaN(day)) {
      Console.print('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요');
      return this.validDay();
    }
    return day;
  }
}

export default App;
