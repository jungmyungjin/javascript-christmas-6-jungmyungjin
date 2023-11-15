import DecemberBenefit from "./DecemberBenefit.js";
import OutputView from "../Interface/OutputView.js";
import { MINIMUM_BADGE_PURCHASE } from "../Setting.js";
class PaymentStatement {
  #order;
  #decemberBenefit;

  constructor(orderInstance, date) {
    this.#order = orderInstance;
    this.#decemberBenefit = new DecemberBenefit(this.#order, date);
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
    if (this.#decemberBenefit.getTotalBenefitPrice() === 0) {
      OutputView.printBenefitDetails(null);
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
    const totalBenefitPrice = this.#decemberBenefit.getTotalBenefitPrice();
    const sortedKeys = Object.keys(MINIMUM_BADGE_PURCHASE)
      .map(Number)
      .sort((a, b) => b - a);
    let badge = "";
    for (const amount of sortedKeys) {
      if (parseInt(amount) <= totalBenefitPrice) {
        badge = MINIMUM_BADGE_PURCHASE[amount];
        break;
      }
    }
    OutputView.printEventBadge(badge);
  }
}

export default PaymentStatement;
