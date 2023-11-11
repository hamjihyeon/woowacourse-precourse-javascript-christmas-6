import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js"
import OutputView from "./OutputView.js"
import Menu from "./Menu.js";

class App {
  async run() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    const day = await this.validDay();
    const menus = new Menu();
    const order = await this.getOrderSummary(menus);
    Console.print(`12월 ${day} 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
    Console.print('<주문 메뉴>');
    Console.print(`${order}\n`);
  }

  async validDay() {
    const day = Number(await Console.readLineAsync('12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n'));
    if (day < 1 || day > 31 || isNaN(day)) {
      Console.print('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요');
      return this.validDay();
    }
    return day;
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

    for (const order of orders) {
      const [menuItem, quantity] = order.split('-');

      // 메뉴 형식이 다른 경우 오류 출력
      if (!menuItem.trim() || !/^[a-zA-Z가-힣\s]+-\d+$/.test(order.trim())) {
        Console.print('[ERROR] 유효하지 않은 주문 형식입니다. 다시 입력해 주세요.');
        return this.getOrderSummary(menu);
      }

      // 메뉴가 메뉴판에 없는 경우 오류 출력
      if (!menu.isValidMenuItem(menuItem.trim())) {
        Console.print('[ERROR] 유효하지 않은 주문 형식입니다. 다시 입력해 주세요.');
        return this.getOrderSummary(menu);
      }

      // 중복 메뉴 입력 시 오류 출력
      if (uniqueMenus.has(menuItem.trim())) {
        Console.print('[ERROR] 유효하지 않은 주문 형식입니다. 다시 입력해 주세요.');
        return this.getOrderSummary(menu);
      }

      // 메뉴의 개수가 1 이상의 숫자가 아닌 경우 오류 출력
      if (!/^[1-9]\d*$/.test(quantity.trim())) {
        Console.print('[ERROR] 유효하지 않은 주문 형식입니다. 다시 입력해 주세요.');
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

    if (totalOrderPrice === 0) {
      Console.print('[ERROR] 주문할 메뉴를 입력해 주세요.');
      return this.getOrderSummary(menu);
    }

    let bonusMenu = totalOrderPrice >= 120000 ? '샴페인 1개' : '없음';

    orderSummary += `\n<할인 전 총주문 금액>\n${totalOrderPrice.toLocaleString()}원\n`;
    orderSummary += `\n<증정 메뉴>\n${bonusMenu}\n`;

    return orderSummary.trim();
  }
}

export default App;
