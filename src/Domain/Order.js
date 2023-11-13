import Menu from "./Menu.js";

class Order {
  #menu;
  #OrderSheet = {};

  constructor(stringOrder) {
    this.#menu = new Menu();
    this.setOrderFromString(stringOrder);
  }

  // 주문 내용을 읽어오는 함수
  setOrderFromString(stringOrder) {
    const parseRegex = /([^\-,]+)-([0-9]+)/g;
    const matches = [...stringOrder.matchAll(parseRegex)];
    for (const match of matches) {
      const [orderMenu, orderCount] = [match[1], parseInt(match[2])];
      this.#OrderSheet[orderMenu] = orderCount;
    }
  }
  getOrderSheet() {
    return this.#OrderSheet;
  }

  getTotalOrderAmount() {
    if (!this.#OrderSheet) return 0;
    let totalAmount = 0;
    for (let orderMenu in this.#OrderSheet) {
      totalAmount =
        totalAmount +
        this.#menu.getMenuPrice(orderMenu) * this.#OrderSheet[orderMenu];
    }
    return totalAmount;
  }
}

export default Order;
