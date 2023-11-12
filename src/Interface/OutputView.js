import { Console } from "@woowacourse/mission-utils";
const OutputView = {
  printMenu() {
    Console.print("<주문 메뉴>");
    // ...
  },
  print() {
    Console.print("12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!");
  },
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },
  printTotalOrderAmount() {
    Console.print("<할인 전 총주문 금액>");
  },
  printGiftMenu(gift) {
    Console.print("<증정 메뉴>");
    if (!gift) {
      Console.print("없음");
    }
  },
  printTotalDiscount(Discount) {
    Console.print("<총혜택 금액>");
    if (!Discount) {
      Console.print("없음");
    }
  },
  printFinalPayment() {
    Console.print("<할인 후 예상 결제 금액>");
  },
  printEventBadge() {
    Console.print("<12월 이벤트 배지>");
  },
};

export default OutputView;
