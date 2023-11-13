import { Console } from "@woowacourse/mission-utils";
const OutputView = {
  printMenu(orderSheet) {
    Console.print("<주문 메뉴>");
    let printResult = "";
    for (const menu in orderSheet) {
      if (!orderSheet[menu]) continue;
      printResult += `${menu} - ${orderSheet[menu]}개\n`;
    }
    Console.print(printResult);
  },
  printPreviewPaymentStatement() {
    Console.print("12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n");
  },
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },
  printTotalOrderAmount(totalOrderAmount) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${totalOrderAmount.toLocaleString("ko-KR")}원\n`);
  },
  printGiftMenu(giveaway) {
    Console.print("<증정 메뉴>");
    if (!giveaway) {
      Console.print("없음\n");
      return;
    }
    let printResult = "";
    for (const gift in giveaway) {
      printResult += `${gift} ${giveaway[gift]}개\n`;
    }
    Console.print(printResult);
  },
  printBenefitDetails(benefits) {
    Console.print("<혜택 내역>");
    if (!benefits) {
      Console.print("없음\n");
      return;
    }
    let printResult = "";
    for (const title in benefits) {
      if (!benefits[title]) continue;
      printResult += `${title}: -${benefits[title].toLocaleString(
        "ko-KR"
      )}원\n`;
    }
    Console.print(printResult);
  },
  printTotalDiscountAmount(totalDiscount) {
    Console.print("<총혜택 금액>");
    if (!totalDiscount) {
      Console.print("없음\n");
      return;
    }
    Console.print(`${totalDiscount.toLocaleString("ko-KR")}원\n`);
  },
  printFinalPayment(finalPayment) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${finalPayment.toLocaleString("ko-KR")}원\n`);
  },
  printEventBadge(badge) {
    Console.print("<12월 이벤트 배지>");
    Console.print(badge + "\n");
  },
};

export default OutputView;
