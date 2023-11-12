import DecemberBenefit from "./DecemberBenefit";
import OutputView from "../Interface/OutputView";
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
    const totalOrderAmount = this.orderInstance.TotalOrderAmount();
    OutputView.printTotalOrderAmount(totalOrderAmount);
  }

  Giveaway() {
    const gift = this.#decemberBenefit.getGiveaway();
    OutputView.printGiftMenu(gift);
  }

  BenefitDetails() {
    const christmasDiscount =
      this.#decemberBenefit.getDiscountAmountChristmasDDay();
    const weeksDiscount = this.#decemberBenefit.getDiscountWeekdayOrWeekend();
    const specialDiscount = this.#decemberBenefit.getDiscountSpecial();
    const giftPrice = this.#decemberBenefit.getGiveawayPrice();
    OutputView.printTotalDiscount({
      christmasDiscount,
      weeksDiscount,
      specialDiscount,
      giftPrice,
    });
  }

  TotalDiscountAmount() {
    const totalDiscount = this.#decemberBenefit.getTotalBenefitPrice();
    OutputView.printTotalDiscountAmount(totalDiscount);
  }
  FinalPayment() {
    const finalPayment =
      this.orderInstance.TotalOrderAmount() -
      this.#decemberBenefit.getTotalBenefitPrice();
    OutputView.printFinalPayment(finalPayment);
  }
  EventBadge() {
    const totalOrderAmount = this.orderInstance.TotalOrderAmount();
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
