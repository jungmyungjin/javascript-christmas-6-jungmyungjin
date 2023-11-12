import Menu from "./Menu.js";

class DecemberBenefit {
  #order;
  #menu;
  #date;
  #startDate = [
    "2023-12-03",
    "2023-12-10",
    "2023-12-17",
    "2023-12-24",
    "2023-12-25",
    "2023-12-31",
  ];
  #giftMenu = "샴페인";

  constructor(orderInstance, day) {
    this.#menu = new Menu();
    this.#order = orderInstance;
    const [year, monthIndex] = [2023, 11];
    this.#date = new Date(Date.UTC(year, monthIndex, day));
  }
  getDiscountAmountChristmasDDay() {
    const [eventStartDate, eventEndDate] = [
      new Date("2023-12-1"),
      new Date("2023-12-25"),
    ];
    if (eventEndDate < this.#date || this.#date < eventStartDate) return 0;
    const DDay = Math.floor(
      Math.abs(eventEndDate - this.#date) / (1000 * 3600 * 24)
    );
    return 1000 + (24 - DDay) * 100;
  }
  getDiscountWeekdayOrWeekend() {
    const day = this.#date.getDay();
    const isWeekend = 4 <= day && day <= 5;
    const discountAmountPerUnit = 2023;
    const discountCategory = isWeekend ? "main" : "dessert";
    const orderSheet = this.#order.getOrderSheet();
    let totalDiscount = 0;
    for (let orderMenu in orderSheet) {
      if (this.#menu.getMenuCategory(orderMenu) === discountCategory) {
        totalDiscount += discountAmountPerUnit * orderSheet[orderMenu];
      }
    }
    return totalDiscount;
  }
  getDiscountSpecial() {
    const isSpecialDay = this.#startDate.some(
      (eventDay) => this.#date.getTime() === new Date(eventDay).getTime()
    );
    if (isSpecialDay) return 1000;
    return 0;
  }
  getGiveaway() {
    const minimumPurchaseAmount = 120000;
    if (minimumPurchaseAmount <= this.#order.getTotalOrderAmount()) {
      return this.#giftMenu;
    }
    return 0;
  }
  getGiveawayPrice() {
    const minimumPurchaseAmount = 120000;
    if (minimumPurchaseAmount <= this.#order.getTotalOrderAmount()) {
      return this.#menu.getMenuPrice(this.#giftMenu);
    }
    return 0;
  }
  getTotalBenefitPrice() {
    const christmasDDayBenefit = this.getDiscountAmountChristmasDDay();
    const weekOrWeekendBenefit = this.getDiscountWeekdayOrWeekend();
    const specialBenefit = this.getDiscountSpecial();
    const giveawayPrice = this.getGiveawayPrice();
    return (
      christmasDDayBenefit +
      weekOrWeekendBenefit +
      specialBenefit +
      giveawayPrice
    );
  }
}

export default DecemberBenefit;
