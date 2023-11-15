import { Console } from "@woowacourse/mission-utils";
import Menu from "../Domain/Menu.js";
import { IsNumber, IsNumberInRange } from "../Utils.js";
import { ORDER_LIMIT, MINIMUM_AMOUNT_FOR_BENEFIT } from "../Setting.js";

class ValidationInput {
  #order;
  #menu = {};

  constructor() {
    this.#menu = new Menu();
  }
  ValidateDate(inputDay) {
    if (!IsNumber(inputDay) || !IsNumberInRange(parseInt(inputDay), 1, 31)) {
      throw Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
    }
  }
  ValidateOrder(orderIns, inputOrder) {
    this.#order = orderIns;
    this.#ValidateOrderFromStringFormat(inputOrder);
    this.#ValidateOrderMenuAndCount();
    this.#validateOrderMenuCount();
    this.#validateOrderOnlyDrink();
    this.#validateMinimumAmountForBenefit();
    return true;
  }

  #ValidateOrderFromStringFormat(inputOrder) {
    const formatRegex = /^(?:([^\-,]+)-([0-9]+,))*(?:([^\-,]+)-([0-9]+))$/s;
    if (!formatRegex.test(inputOrder))
      throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
  #ValidateOrderMenuAndCount() {
    const orderSheet = this.#order.getOrderSheet();
    for (let menu in orderSheet) {
      if (!menu || !this.#menu.checkMenuExistence(menu))
        throw new Error("[ERROR] 존재하지 않는 메뉴입니다.");
      if (parseInt(orderSheet[menu]) <= 0)
        throw new Error("[ERROR] 메뉴의 갯수는 1 이상이여야 합니다.");
    }
  }

  #validateOrderMenuCount() {
    const orderSheet = this.#order.getOrderSheet();
    let menuCount = 0;
    for (let menu in orderSheet) {
      menuCount += orderSheet[menu];
    }
    if (ORDER_LIMIT < menuCount)
      throw new Error(
        `[ERROR] 한번에 주문 가능한 수량은 ${ORDER_LIMIT}개 입니다.`
      );
  }

  #validateOrderOnlyDrink() {
    let isOnlyDrink = true;
    const orderSheet = this.#order.getOrderSheet();
    for (let menu in orderSheet) {
      if (this.#menu.getMenuCategory(menu) !== "drink") {
        isOnlyDrink = false;
        break;
      }
    }
    if (isOnlyDrink) {
      throw new Error("[ERROR] 음료만 주문 시, 주문할 수 없습니다.");
    }
  }

  #validateMinimumAmountForBenefit() {
    const totalOrderAmount = this.#order.getTotalOrderAmount();
    if (totalOrderAmount <= MINIMUM_AMOUNT_FOR_BENEFIT) {
      Console.print(
        `12월 이벤트 혜택은 총 주문 금액 ${MINIMUM_AMOUNT_FOR_BENEFIT.toLocaleString(
          "ko-KR"
        )}원 이상 부터 적용됩니다.`
      );
    }
  }
}

export default ValidationInput;
