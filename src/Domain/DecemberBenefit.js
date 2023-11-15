import Menu from "./Menu.js";

class DecemberBenefit {
  #order;
  #menu;
  #date;
  #startDate = [
    [2023, 11, 3],
    [2023, 11, 10],
    [2023, 11, 17],
    [2023, 11, 24],
    [2023, 11, 25],
    [2023, 11, 31],
  ];
  #giftMenu = { 샴페인: 1 };
  #minAmountForDiscount = 10000;

  constructor(orderInstance, date) {
    this.#menu = new Menu();
    this.#order = orderInstance;
    this.#date = date;
  }
  getDiscountAmountChristmasDDay() {
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const [eventStartDate, eventEndDate] = [
      new Date(Date.UTC(2023, 11, 1)),
      new Date(Date.UTC(2023, 11, 25)),
    ];
    if (eventEndDate < this.#date || this.#date < eventStartDate) return 0;
    const DDay = Math.floor(
      Math.abs(eventEndDate - this.#date) / (1000 * 3600 * 24)
    );
    return 1000 + (24 - DDay) * 100;
  }
  getDiscountWeekdayOrWeekend() {
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const day = this.#date.getDay();
    const isWeekend = 5 <= day;
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
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const isSpecialDay = this.#startDate.some(
      ([year, month, day]) =>
        this.#date.getTime() === new Date(Date.UTC(year, month, day)).getTime()
    );
    if (isSpecialDay) return 1000;
    return 0;
  }
  getGiveaway() {
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const minimumPurchaseAmount = 120000;
    if (minimumPurchaseAmount <= this.#order.getTotalOrderAmount()) {
      return this.#giftMenu;
    }
    return 0;
  }
  getGiveawayPrice() {
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
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
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const christmasDDayBenefit = this.getDiscountAmountChristmasDDay();
    const { totalWeekDiscount } = this.getDiscountWeekdayOrWeekend();
    const specialBenefit = this.getDiscountSpecial();
    const giveawayPrice = this.getGiveawayPrice();
    return (
      christmasDDayBenefit + totalWeekDiscount + specialBenefit + giveawayPrice
    );
  }
  getTotalDiscountPrice() {
    if (this.#order.getTotalOrderAmount < this.#minAmountForDiscount) return 0;
    const christmasDDayBenefit = this.getDiscountAmountChristmasDDay();
    const { totalWeekDiscount } = this.getDiscountWeekdayOrWeekend();
    const specialBenefit = this.getDiscountSpecial();
    return christmasDDayBenefit + totalWeekDiscount + specialBenefit;
  }
}

export default DecemberBenefit;
