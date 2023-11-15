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
    },
    async readMenu(menu) {
        const menuInput = await Console.readLineAsync('주문하실 메뉴를 메뉴와 개수를 알려 주세요. (예: 해산물파스타-2, 레드와인-1, 초코케이크-1)\n');

        // 빈 입력 체크
        if (!menuInput.trim()) {
            Console.print('[ERROR] 주문할 메뉴를 입력해 주세요.');
            return this.readMenu(menu);
        }

        const orders = menuInput.split(',');

        // 주문 갯수 체크
        if (orders.length > 20) {
            Console.print('[ERROR] 한 번에 20개까지만 주문 가능합니다. 다시 입력해 주세요.');
            return this.readMenu(menu);
        }

        // let orderSummary = '';
        let uniqueMenus = new Set();
        let totalOrderCount = 0;
        const orderErrorMessage = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';

        for (const order of orders) {
            const [menuItem, quantity] = order.split('-');

            // 메뉴 형식이 다른 경우 오류 출력
            if (!menuItem.trim() || !/^[a-zA-Z가-힣\s]+-\d+$/.test(order.trim())) {
                Console.print(orderErrorMessage);
                return this.readMenu(menu);
            }

            // 메뉴가 메뉴판에 없는 경우 오류 출력
            if (!menu.isValidMenuItem(menuItem.trim())) {
                Console.print(orderErrorMessage);
                return this.readMenu(menu);
            }

            // 중복 메뉴 입력 시 오류 출력
            if (uniqueMenus.has(menuItem.trim())) {
                Console.print(orderErrorMessage);
                return this.readMenu(menu);
            }

            // 메뉴의 개수가 1 이상의 숫자가 아닌 경우 오류 출력
            if (!/^[1-9]\d*$/.test(quantity.trim())) {
                Console.print(orderErrorMessage);
                return this.readMenu(menu);
            }

            uniqueMenus.add(menuItem.trim());
            totalOrderCount += parseInt(quantity.trim(), 10);
            // orderSummary += `${menuItem.trim()} ${quantity.trim()}개\n`;
        }

        // 주문한 메뉴의 총 합이 20개를 초과하는 경우 오류 출력
        if (totalOrderCount > 20) {
            Console.print('[ERROR] 한 번에 주문할 수 있는 메뉴의 총 합은 20개입니다. 다시 입력해 주세요.');
            return this.readMenu(menu);
        }

        const isAllDrinks = orders.every(order => menu.isDrinkItem(order.split('-')[0].trim()));

        if (isAllDrinks) {
            Console.print('[ERROR] 음료만 주문할 수 없습니다. 음식도 함께 주문해 주세요.');
            return this.readMenu(menu);
        }
        // return orderSummary.trim();
        return orders;
    }
}

export default InputView;