import Order from "../src/Domain/Order";
import Menu from "../src/Domain/Menu";

jest.mock("../src/Domain/Menu");

describe("Order 클래스 테스트", () => {
  beforeEach(() => {
    Menu.mockClear();
    Menu.prototype.getMenuPrice = jest.fn().mockImplementation((item) => {
      const prices = { 양송이수프: 6000, 타파스: 5500 };
      return prices[item] || 0;
    });
  });

  it("getOrderSheet 메서드", () => {
    const order = new Order("양송이수프-2,타파스-3");
    expect(order.getOrderSheet()).toEqual({ 양송이수프: 2, 타파스: 3 });
  });

  it("getTotalOrderAmount 메서드", () => {
    const order = new Order("양송이수프-2,타파스-3");
    expect(order.getTotalOrderAmount()).toBe(6000 * 2 + 5500 * 3);
  });
});
