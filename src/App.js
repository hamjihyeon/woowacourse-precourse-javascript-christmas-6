import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Menu from "./Menu.js";
import Calculate from "./Calculate.js";

class App {
  async run() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    this.day = await InputView.readDate();
    const menus = new Menu();
    const order = await InputView.readMenu(menus);
    Console.print(`12월 ${this.day} 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
    OutputView.printMenu(order);
    const price = OutputView.printTotalOrderPrice(menus, order);
    OutputView.printBonusMenu(price);
    const calculate = new Calculate();
    const benefitAmount = OutputView.printBenifitAmount(price, this.day, calculate);
    OutputView.printTotalBenefitAmount(benefitAmount);
    OutputView.printDiscountOrderPrice(price, calculate, this.day);
    OutputView.printEvent(benefitAmount);
  }

  async getOrderSummary(menu) {

    // Console.print('\n<할인 후 예상 결제 금액>');
    // const discountedTotalOrderPrice = totalOrderPrice - totalDiscount;

    // Console.print(`${discountedTotalOrderPrice.toLocaleString()}원`);

    Console.print('\n<12월 이벤트 배지>');
    if (totalBenefitAmount >= 5000 && totalBenefitAmount < 10000) {
      Console.print('별');
    } else if (totalBenefitAmount >= 10000 && totalBenefitAmount < 20000) {
      Console.print('트리');
    } else if (totalBenefitAmount >= 20000) {
      Console.print('산타');
    } else {
      Console.print('없음');
    }

    return orderSummary.trim();
  }
}

export default App;
