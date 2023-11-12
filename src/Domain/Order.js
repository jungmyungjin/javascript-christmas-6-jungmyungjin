import Menu from "./Menu.js";
import { Console } from "@woowacourse/mission-utils";

class Order {
  #menu;
  #OrderSheet = {};

  constructor(stringOrder) {
    this.#menu = new Menu();
    this.setOrderFromString(stringOrder);
  }

  // 주문 내용을 읽어오는 함수
  setOrderFromString(stringOrder) {
    const formatRegex = /^(?:([^\-,]+)-([0-9]+,))*(?:([^\-,]+)-([0-9]+))$/s;
    if (!formatRegex.test(stringOrder)) {
      throw new Error("[ERROR] 형식에 맞지 않습니다.");
    }
    const parseRegex = /([^\-,]+)-([0-9]+)/g;
    const matches = [...stringOrder.matchAll(parseRegex)];
    for (const match of matches) {
      const [orderMenu, orderCount] = [match[1], match[2]];
      if (orderMenu && this.#menu.checkMenuExistence(orderMenu)) {
        this.#OrderSheet[orderMenu] = parseInt(orderCount);
      }
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
