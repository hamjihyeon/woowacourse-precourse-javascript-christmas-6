import { Console } from '@woowacourse/mission-utils';
import Calculate from './Calculate.js'
import App from './App.js';

const OutputView = {
    printMenu(orders) {
        Console.print("<주문 메뉴>");
        let orderSummary = [];
        for (const order of orders) {
            const [menuItem, quantity] = order.split('-');
            Console.print(`${menuItem.trim()} ${quantity.trim()}개`);
        }
    },
    printTotalOrderPrice(menu, orders) {
        // getTotalPrice 함수를 사용하여 주문 총액을 계산
        const totalOrderPrice = menu.getTotalPrice(orders);
        Console.print('\n<할인 전 총주문 금액>');
        Console.print(`${totalOrderPrice.toLocaleString()}원`);
        return totalOrderPrice;
    },
    printBonusMenu(price) {
        // 특별 할인 계산
        let bonusMenu = price >= 120000 ? '샴페인 1개' : '없음';
        Console.print('\n<증정 메뉴>');
        Console.print(bonusMenu);
    },
    printBenifitAmount(price, day, calculate) {
        let christmasDiscount = calculate.calculateChristmasDiscount(parseInt(day));

        // 주중 또는 주말 할인 계산
        let isWeekend = [5, 6].includes(new Date().getDay());
        let weekdayOrWeekendDiscount = calculate.calculateWeekdayOrWeekendDiscount(isWeekend);
        // 특별 할인 계산
        let specialDiscount = calculate.calculateSpecialDiscount();

        // 총 할인 계산
        let totalDiscount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount;

        // 총 혜택 계산
        let totalBenefitAmount = christmasDiscount + weekdayOrWeekendDiscount + specialDiscount + (price >= 120000 ? 25000 : 0);

        Console.print('\n<혜택 내역>');
        if (price >= 10000) {

            if (christmasDiscount !== 0) {
                Console.print(`크리스마스 디데이 할인: -${christmasDiscount.toLocaleString()}원`);
            }

            if (weekdayOrWeekendDiscount !== 0) {
                Console.print(`평일/주말 할인: -${weekdayOrWeekendDiscount.toLocaleString()}원`);
            }

            if (specialDiscount !== 0) {
                Console.print('특별 할인: -1,000원');
            }

            if (price >= 120000) {
                Console.print('증정 이벤트: -25,000원');
            }
        } else {
            Console.print("없음");
            christmasDiscount = 0;
            weekdayOrWeekendDiscount = 0;
            totalBenefitAmount = 0;
        }
        return totalBenefitAmount;
    },
    printTotalBenefitAmount(benefitAmount) {
        Console.print('\n<총혜택 금액>');
        if (`${benefitAmount}` > 0) {
            Console.print(`-${benefitAmount.toLocaleString()}원`);
        } else {
            this.weekdayOrWeekendDiscount = 0;
            this.specialDiscount = 0;
            this.christmasDiscount = 0;
            this.totalBenefitAmount = 0;
            this.totalDiscount = 0;
            Console.print(`${benefitAmount.toLocaleString()}원`);
        }
    },
    printDiscountOrderPrice(price, calculate, day) {
        let isWeekend = [5, 6].includes(new Date().getDay());
        let weekdayOrWeekendDiscount = calculate.calculateWeekdayOrWeekendDiscount(isWeekend);
        Console.print('\n<할인 후 예상 결제 금액>');
        const discountedTotalOrderPrice = price - calculate.calculateChristmasDiscount(parseInt(day)) - calculate.calculateSpecialDiscount() - weekdayOrWeekendDiscount;

        Console.print(`${discountedTotalOrderPrice.toLocaleString()}원`);
    },
    printEvent(benefitAmount) {
        Console.print('\n<12월 이벤트 배지>');
        if (benefitAmount >= 5000 && benefitAmount < 10000) {
            Console.print('별');
        } else if (benefitAmount >= 10000 && benefitAmount < 20000) {
            Console.print('트리');
        } else if (benefitAmount >= 20000) {
            Console.print('산타');
        } else {
            Console.print('없음');
        }
    }
}

export default OutputView;