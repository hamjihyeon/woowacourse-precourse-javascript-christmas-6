class Menu {
    constructor() {
        this.appetizers = [
            { name: '양송이수프', price: 6000 },
            { name: '타파스', price: 5500 },
            { name: '시저샐러드', price: 8000 },
        ];

        this.mainDishes = [
            { name: '티본스테이크', price: 55000 },
            { name: '바비큐립', price: 54000 },
            { name: '해산물파스타', price: 35000 },
            { name: '크리스마스파스타', price: 25000 },
        ];

        this.desserts = [
            { name: '초코케이크', price: 15000 },
            { name: '아이스크림', price: 5000 },
        ];

        this.drinks = [
            { name: '제로콜라', price: 3000 },
            { name: '레드와인', price: 60000 },
            { name: '샴페인', price: 25000 },
        ];
    }

    isValidMenuItem(menuItemName) {
        const allItems = [
            ...this.appetizers,
            ...this.mainDishes,
            ...this.desserts,
            ...this.drinks,
        ];

        return allItems.some(item => item.name === menuItemName);
    }

    getPrice(menuItem) {
        const menuItems = [
          ...this.appetizers,
          ...this.mainDishes,
          ...this.desserts,
          ...this.drinks,
        ];
    
        const selectedMenuItem = menuItems.find(item => item.name === menuItem);
    
        return selectedMenuItem ? selectedMenuItem.price : 0;
      }
    
      getTotalPrice(orderDetails) {
        let totalPrice = 0;
    
        for (const orderDetail of orderDetails) {
          const [menuItem, quantity] = orderDetail.split('-');
          const price = this.getPrice(menuItem.trim());
          totalPrice += price * parseInt(quantity.trim(), 10);
        }
    
        return totalPrice;
      }
}

export default Menu;