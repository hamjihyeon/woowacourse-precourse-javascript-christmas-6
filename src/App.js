import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Menu from "./Menu.js";

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
    const benefitAmount = OutputView.printBenifitAmount(price, this.day);
    OutputView.printTotalBenefitAmount(benefitAmount);
  }

  async getOrderSummary(menu) {

    Console.print('\n<할인 후 예상 결제 금액>');
    const discountedTotalOrderPrice = totalOrderPrice - totalDiscount;

    Console.print(`${discountedTotalOrderPrice.toLocaleString()}원`);

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

  // calculateChristmasDiscount(selectedDay) {
  //   const today = new Date();
  //   const christmasDay = new Date(today.getFullYear(), 11, 25); // 11: 12월
  //   const daysUntilChristmas = Math.ceil((christmasDay - today) / (1000 * 60 * 60 * 24));
  
  //   // selectedDay가 크리스마스 이후인 경우 할인을 적용하지 않음
  //   if (selectedDay > daysUntilChristmas) {
  //     return 0;
  //   }
  
  //   // 할인 시작일부터 할인 금액을 계산
  //   const discountAmount = 1000 + (selectedDay * 100) - 100;
  
  //   // 최대 할인 금액은 3400원으로 제한
  //   return Math.min(discountAmount, 3400);
  // }

  // calculateWeekdayOrWeekendDiscount(isWeekend) {
  //   const discountPerMenu = 2023;

  //   return isWeekend ? discountPerMenu : discountPerMenu * 2;
  // }

  // calculateSpecialDiscount() {
  //   const isSpecialEvent = this.checkSpecialEvent();

  //   return isSpecialEvent ? 1000 : 0;
  // }

  // checkSpecialEvent() {
  //   const isStarMarkedOnCalendar = true;
  //   return isStarMarkedOnCalendar;
  // }
}

export default App;
