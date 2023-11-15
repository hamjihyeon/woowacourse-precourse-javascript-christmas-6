class Calculate {
    calculateChristmasDiscount(selectedDay) {
        const today = new Date();
        const christmasDay = new Date(today.getFullYear(), 11, 25); // 11: 12월
        const daysUntilChristmas = Math.ceil((christmasDay - today) / (1000 * 60 * 60 * 24));

        // selectedDay가 크리스마스 이후인 경우 할인을 적용하지 않음
        if (selectedDay > daysUntilChristmas) {
            return 0;
        }

        // 할인 시작일부터 할인 금액을 계산
        const discountAmount = 1000 + (selectedDay * 100) - 100;

        // 최대 할인 금액은 3400원으로 제한
        return Math.min(discountAmount, 3400);
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

export default Calculate;