import PaymentStatement from "./Domain/PaymentStatement.js";
import { Console } from "@woowacourse/mission-utils";
import Input from "./Interface/Input.js";

class App {
  async run() {
    try {
      const input = new Input();
      await input.start();
      const [date, order] = [input.getInputDate(), input.getInputOrder()];
      const paymentStatementInstance = new PaymentStatement(order, date);
      paymentStatementInstance.printPaymentStatement();
    } catch (error) {
      Console.print(error.message);
    }
  }
}
export default App;
