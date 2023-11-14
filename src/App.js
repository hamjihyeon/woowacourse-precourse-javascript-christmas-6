import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import Menu from "./Menu.js";

class App {
  async run() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    this.day = await InputView.readDate();
    const menus = new Menu();
    const order = await this.getOrderSummary(menus);
  }

  async getOrderSummary(menu) {
    const menuInput = await Console.readLineAsync('주문하실 메뉴를 메뉴와 개수를 알려 주세요. (예: 해산물파스타-2, 레드와인-1, 초코케이크-1)\n');

    // 빈 입력 체크
    if (!menuInput.trim()) {
      Console.print('[ERROR] 주문할 메뉴를 입력해 주세요.');
      return this.getOrderSummary(menu);
    }

    const orders = menuInput.split(',');

    // 주문 갯수 체크
    if (orders.length > 20) {
      Console.print('[ERROR] 한 번에 20개까지만 주문 가능합니다. 다시 입력해 주세요.');
      return this.getOrderSummary(menu);
    }

    let orderSummary = '';
    let uniqueMenus = new Set();
    let totalOrderCount = 0;
    const orderErrorMessage = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

    for (const order of orders) {
      const [menuItem, quantity] = order.split('-');

      // 메뉴 형식이 다른 경우 오류 출력
      if (!menuItem.trim() || !/^[a-zA-Z가-힣\s]+-\d+$/.test(order.trim())) {
        Console.print(orderErrorMessage);
        return this.getOrderSummary(menu);
      }

      // 메뉴가 메뉴판에 없는 경우 오류 출력
      if (!menu.isValidMenuItem(menuItem.trim())) {
        Console.print(orderErrorMessage);
        return this.getOrderSummary(menu);
      }

      // 중복 메뉴 입력 시 오류 출력
      if (uniqueMenus.has(menuItem.trim())) {
        Console.print(orderErrorMessage);
        return this.getOrderSummary(menu);
      }

      // 메뉴의 개수가 1 이상의 숫자가 아닌 경우 오류 출력
      if (!/^[1-9]\d*$/.test(quantity.trim())) {
        Console.print(orderErrorMessage);
        return this.getOrderSummary(menu);
      }

      uniqueMenus.add(menuItem.trim());
      totalOrderCount += parseInt(quantity.trim(), 10);
      orderSummary += `${menuItem.trim()} ${quantity.trim()}개\n`;
    }

    // 주문한 메뉴의 총 합이 20개를 초과하는 경우 오류 출력
    if (totalOrderCount > 20) {
      Console.print('[ERROR] 한 번에 주문할 수 있는 메뉴의 총 합은 20개입니다. 다시 입력해 주세요.');
      return this.getOrderSummary(menu);
    }

    const isAllDrinks = orders.every(order => menu.isDrinkItem(order.split('-')[0].trim()));

    if (isAllDrinks) {
      Console.print('[ERROR] 음료만 주문할 수 없습니다. 음식도 함께 주문해 주세요.');
      return this.getOrderSummary(menu);
    }

    // getTotalPrice 함수를 사용하여 주문 총액을 계산
    const totalOrderPrice = menu.getTotalPrice(orders);

    let christmasDiscount = this.calculateChristmasDiscount(parseInt(this.day));

    // 주중 또는 주말 할인 계산
    let isWeekend = [5, 6].includes(new Date().getDay());
    let weekdayOrWeekendDiscount = this.calculateWeekdayOrWeekendDiscount(isWeekend);

    // 특별 할인 계산
    let specialDiscount = this.calculateSpecialDiscount();

    // 특별 할인 계산
    let bonusMenu = totalOrderPrice >= 120000 ? '샴페인 1개' : '없음';

    // 총 할인 계산
    const totalDiscount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount;

    // 총 혜택 계산
    let totalBenefitAmount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount + (totalOrderPrice >= 120000 ? 25000 : 0);

    Console.print(`12월 ${this.day} 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);


    Console.print('<주문 메뉴>');
    Console.print(orderSummary.trim());

    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${totalOrderPrice.toLocaleString()}원`);

    Console.print('\n<증정 메뉴>');
    Console.print(bonusMenu);

    Console.print('\n<혜택 내역>');
    if (totalOrderPrice >= 10000) {

      if (christmasDiscount !== 0) {
        Console.print(`크리스마스 디데이 할인: -${christmasDiscount.toLocaleString()}원`);
      }

      if (weekdayOrWeekendDiscount !== 0) {
        Console.print(`평일/주말 할인: -${weekdayOrWeekendDiscount.toLocaleString()}원`);
      }

      if (specialDiscount !== 0) {
        Console.print('특별 할인: -1,000원');
      }

      if (totalOrderPrice >= 120000) {
        Console.print('증정 이벤트: -25,000원');
      }
    } else {
      Console.print("없음");
      totalBenefitAmount = 0;
    }

    Console.print('\n<총혜택 금액>');
    if (`${totalBenefitAmount}` > 0) {
      Console.print(`-${totalBenefitAmount.toLocaleString()}원`);
    } else {
      weekdayOrWeekendDiscount = 0;
      specialDiscount = 0;
      christmasDiscount = 0;
      totalBenefitAmount = 0;
      Console.print(`${totalBenefitAmount.toLocaleString()}원`);
    }

    Console.print('\n<할인 후 예상 결제 금액>');
    const discountedTotalOrderPrice = totalOrderPrice - totalDiscount;
    // console.log(`-----------------------${totalOrderPrice}, ${totalDiscount}`);

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

  calculateChristmasDiscount(selectedDay) {
    const today = new Date();
    const christmasDay = new Date(today.getFullYear(), 11, 25); // 11: 12월
    const daysUntilChristmas = Math.ceil((christmasDay - today) / (1000 * 60 * 60 * 24));
  
    // selectedDay가 크리스마스 이후인 경우 할인을 적용하지 않음
    if (selectedDay > daysUntilChristmas) {
      return 0;
    }
  
    // 할인 시작일부터 할인 금액을 계산
    const discountAmount = (selectedDay * 100) - 1000;
  
    // 최대 할인 금액은 3400원으로 제한
    return discountAmount <= 3400 ? discountAmount : 3400;
  }
  calculateWeekdayOrWeekendDiscount(isWeekend) {
    const discountPerMenu = 2023;

    return isWeekend ? discountPerMenu : discountPerMenu * 2;
  }

  calculateSpecialDiscount() {
    const isSpecialEvent = this.checkSpecialEvent();

    return isSpecialEvent ? 1000 : 0;
  }

  checkSpecialEvent() {
    const isStarMarkedOnCalendar = true;
    return isStarMarkedOnCalendar;
  }
}

export default App;
