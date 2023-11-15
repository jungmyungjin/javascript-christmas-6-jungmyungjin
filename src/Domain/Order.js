import Menu from "./Menu.js";

class Order {
  #menu;
  #orderSheet = {};

  constructor(stringOrder) {
    this.#menu = new Menu();
    this.setOrderFromString(stringOrder);
  }

  setOrderFromString(stringOrder) {
    const parseRegex = /([^\-,]+)-([0-9]+)/g;
    const matches = [...stringOrder.matchAll(parseRegex)];
    for (const match of matches) {
      const [orderMenu, orderCount] = [match[1], parseInt(match[2])];
      this.#orderSheet[orderMenu] = orderCount;
    }
  }

  getOrderSheet() {
    return this.#orderSheet;
  }

  getTotalOrderAmount() {
    if (!this.#orderSheet) return 0;
    let totalAmount = 0;
    for (let orderMenu in this.#orderSheet) {
      totalAmount =
        totalAmount +
        this.#menu.getMenuPrice(orderMenu) * this.#orderSheet[orderMenu];
    }
    return totalAmount;
  }
}

export default Order;
