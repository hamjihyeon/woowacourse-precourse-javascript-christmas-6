import { Console } from '@woowacourse/mission-utils';

const OutputView = {
    printMenu(orders) {
        Console.print("<주문 메뉴>");
        let orderSummary = [];
        for (const order of orders)
        {
            const [menuItem, quantity] = order.split('-');
            Console.print(`${menuItem.trim()} ${quantity.trim()}개`);
        }
    },
    printTotalOrderPrice(menu, orders) {
        // getTotalPrice 함수를 사용하여 주문 총액을 계산
        const totalOrderPrice = menu.getTotalPrice(orders);
        Console.print('\n<할인 전 총주문 금액>');
        Console.print(`${totalOrderPrice.toLocaleString()}원`);
    },
    // printOrderSummary(orders) {
    //     let orderSummary = [];
    //     for (const order of orders)
    //     {
    //         const [menuItem, quantity] = order.split('-');
    //         Console.print(`${menuItem.trim()} ${quantity.trim()}개`);
    //     }
    // }
}

export default OutputView;