import DecemberBenefit from "./DecemberBenefit.js";
import OutputView from "../Interface/OutputView.js";
class PaymentStatement {
  #order;
  #decemberBenefit;
  #minimumBadgePurchase = { 5000: "별", 10000: "트리", 20000: "산타" };

  constructor(orderInstance, day) {
    this.#order = orderInstance;
    this.#decemberBenefit = new DecemberBenefit(this.#order, day);
  }

  printPaymentStatement() {
    OutputView.printPreviewPaymentStatement();
    this.OrderMenu();
    this.TotalOrderAmount();
    this.Giveaway();
    this.BenefitDetails();
    this.TotalDiscountAmount();
    this.FinalPayment();
    this.EventBadge();
  }

  OrderMenu() {
    OutputView.printMenu(this.#order.getOrderSheet());
  }

  TotalOrderAmount() {
    const totalOrderAmount = this.#order.getTotalOrderAmount();
    OutputView.printTotalOrderAmount(totalOrderAmount);
  }

  Giveaway() {
    const gift = this.#decemberBenefit.getGiveaway();
    OutputView.printGiftMenu(gift);
  }

  BenefitDetails() {
    const { isWeekend, totalWeekDiscount } =
      this.#decemberBenefit.getDiscountWeekdayOrWeekend();
    if (this.#decemberBenefit.getDiscountAmountChristmasDDay === 0) {
      OutputView.printTotalDiscount();
      return;
    }
    OutputView.printBenefitDetails({
      "크리스마스 디데이 할인":
        this.#decemberBenefit.getDiscountAmountChristmasDDay(),
      [isWeekend === true ? "주말 할인" : "평일 할인"]: totalWeekDiscount,
      "특별 할인": this.#decemberBenefit.getDiscountSpecial(),
      "증정 이벤트": this.#decemberBenefit.getGiveawayPrice(),
    });
  }

  TotalDiscountAmount() {
    const totalDiscount = this.#decemberBenefit.getTotalBenefitPrice();
    OutputView.printTotalDiscountAmount(totalDiscount);
  }
  FinalPayment() {
    const finalPayment =
      this.#order.getTotalOrderAmount() -
      this.#decemberBenefit.getTotalDiscountPrice();
    OutputView.printFinalPayment(finalPayment);
  }
  EventBadge() {
    const totalOrderAmount = this.#order.getTotalOrderAmount();
    const sortedKeys = Object.keys(this.#minimumBadgePurchase)
      .map(Number)
      .sort((a, b) => b - a);
    let badge = "";
    for (const amount of sortedKeys) {
      if (parseInt(amount) <= totalOrderAmount) {
        badge = this.#minimumBadgePurchase[amount];
        break;
      }
    }
    OutputView.printEventBadge(badge);
  }
}

export default PaymentStatement;
