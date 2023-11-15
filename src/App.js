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
    OutputView.printBenifitAmount(price, this.day);
  }

  async getOrderSummary(menu) {

    // let christmasDiscount = this.calculateChristmasDiscount(parseInt(this.day));

    // // 주중 또는 주말 할인 계산
    // let isWeekend = [5, 6].includes(new Date().getDay());
    // let weekdayOrWeekendDiscount = this.calculateWeekdayOrWeekendDiscount(isWeekend);

    // // 특별 할인 계산
    // let specialDiscount = this.calculateSpecialDiscount();

    // // // 특별 할인 계산
    // // let bonusMenu = totalOrderPrice >= 120000 ? '샴페인 1개' : '없음';

    // // 총 할인 계산
    // let totalDiscount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount;

    // // 총 혜택 계산
    // let totalBenefitAmount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount + (totalOrderPrice >= 120000 ? 25000 : 0);

    // Console.print('\n<증정 메뉴>');
    // Console.print(bonusMenu);

    // Console.print('\n<혜택 내역>');
    // if (totalOrderPrice >= 10000) {

    //   if (christmasDiscount !== 0) {
    //     Console.print(`크리스마스 디데이 할인: -${christmasDiscount.toLocaleString()}원`);
    //   }

    //   if (weekdayOrWeekendDiscount !== 0) {
    //     Console.print(`평일/주말 할인: -${weekdayOrWeekendDiscount.toLocaleString()}원`);
    //   }

    //   if (specialDiscount !== 0) {
    //     Console.print('특별 할인: -1,000원');
    //   }

    //   if (totalOrderPrice >= 120000) {
    //     Console.print('증정 이벤트: -25,000원');
    //   }
    // } else {
    //   Console.print("없음");
    //   totalBenefitAmount = 0;
    // }

    Console.print('\n<총혜택 금액>');
    if (`${totalBenefitAmount}` > 0) {
      Console.print(`-${totalBenefitAmount.toLocaleString()}원`);
    } else {
      weekdayOrWeekendDiscount = 0;
      specialDiscount = 0;
      christmasDiscount = 0;
      totalBenefitAmount = 0;
      totalDiscount = 0;
      Console.print(`${totalBenefitAmount.toLocaleString()}원`);
    }

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
