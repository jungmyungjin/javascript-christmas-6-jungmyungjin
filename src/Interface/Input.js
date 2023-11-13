import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import ValidationInput from "../ValidationInput.js";
import Order from "../Domain/Order.js";
import { Console } from "@woowacourse/mission-utils";

class Input {
  #order = null;
  #date = null;
  #validationInput;
  constructor() {
    OutputView.printGreeting();
    this.#validationInput = new ValidationInput();
  }

  async start() {
    while (true) {
      try {
        if (!this.#date) await this.#inputDate();
        if (!this.#order) await this.#inputOrder();
        if (this.#date && this.#order) break;
      } catch (error) {
        Console.print(error.message);
        break;
      }
    }
  }

  async #inputDate() {
    if (this.#date !== null) return true;
    const [year, monthIndex] = [2023, 11];
    const inputDay = await InputView.readDate();
    this.#validationInput.ValidateDate(inputDay);
    this.#date = new Date(Date.UTC(year, monthIndex, inputDay));
    return true;
  }
  async #inputOrder() {
    if (this.#order !== null) return true;
    const inputMenu = await InputView.readMenu();
    const order = new Order(inputMenu);
    this.#validationInput.ValidateOrder(order, inputMenu);
    this.#order = order;
    return true;
  }

  getInputOrder() {
    return this.#order;
  }
  getInputDate() {
    return this.#date;
  }
}

export default Input;
