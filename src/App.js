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
}

export default App;
