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
  #giftMenu = { 샴페인: 1 };

  constructor(orderInstance, date) {
    this.#menu = new Menu();
    this.#order = orderInstance;
    this.#date = date;
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
    let totalWeekDiscount = 0;
    for (let orderMenu in orderSheet) {
      if (this.#menu.getMenuCategory(orderMenu) === discountCategory) {
        totalWeekDiscount += discountAmountPerUnit * orderSheet[orderMenu];
      }
    }
    return { isWeekend, totalWeekDiscount };
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
      let totalPrice = 0;
      for (const gift in this.#giftMenu) {
        totalPrice += this.#menu.getMenuPrice(gift) * this.#giftMenu[gift];
      }
      return totalPrice;
    }
    return 0;
  }
  getTotalBenefitPrice() {
    const christmasDDayBenefit = this.getDiscountAmountChristmasDDay();
    const { totalWeekDiscount } = this.getDiscountWeekdayOrWeekend();
    const specialBenefit = this.getDiscountSpecial();
    const giveawayPrice = this.getGiveawayPrice();
    return (
      christmasDDayBenefit + totalWeekDiscount + specialBenefit + giveawayPrice
    );
  }
  getTotalDiscountPrice() {
    const christmasDDayBenefit = this.getDiscountAmountChristmasDDay();
    const { totalWeekDiscount } = this.getDiscountWeekdayOrWeekend();
    const specialBenefit = this.getDiscountSpecial();
    return christmasDDayBenefit + totalWeekDiscount + specialBenefit;
  }
}

export default DecemberBenefit;
