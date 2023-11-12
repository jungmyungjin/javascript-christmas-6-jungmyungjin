class Menu {
  #menu = {
    양송이수프: { price: 6000, category: "appetizer" },
    타파스: { price: 5500, category: "appetizer" },
    시저샐러드: { price: 8000, category: "appetizer" },
    티본스테이크: { price: 55000, category: "main" },
    바비큐립: { price: 54000, category: "main" },
    해산물파스타: { price: 35000, category: "main" },
    크리스마스파스타: { price: 25000, category: "main" },
    초코케이크: { price: 15000, category: "dessert" },
    아이스크림: { price: 5000, category: "dessert" },
    제로콜라: { price: 3000, category: "drink" },
    레드와인: { price: 60000, category: "drink" },
    샴페인: { price: 25000, category: "drink" },
  };

  constructor() {}

  checkMenuExistence(target) {
    if (!this.#menu[target]) {
      throw new Error("[ERROR] 존재하지 않는 메뉴입니다.");
    }
    return true;
  }
  getMenuPrice(target) {
    this.checkMenuExistence(target);
    return this.#menu[target].price;
  }
}

export default Menu;
