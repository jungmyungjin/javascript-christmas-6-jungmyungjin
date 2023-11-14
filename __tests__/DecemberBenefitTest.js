import DecemberBenefit from "../src/Domain/DecemberBenefit.js";
import Menu from "../src/Domain/Menu.js";
import Order from "../src/Domain/Order.js";

jest.mock("../src/Domain/Menu.js");
jest.mock("../src/Domain/Order.js");

describe("DecemberBenefit", () => {
  let mockMenu;
  let menu = {
    양송이수프: { price: 6000, category: "appetizer" },
    타파스: { price: 5500, category: "appetizer" },
    시저샐러드: { price: 8000, category: "appetizer" },
    티본스테이크: { price: 55000, category: "main" },
    바비큐립: { price: 54000, category: "main" },
    해산물파스타: { price: 35000, category: "main" },
    크리스마스파스타: { price: 25000, category: "main" },
    초코케이크: { price: 15000, category: "dessert" },
    아이스크림: { price: 5000, category: "dessert" },
    제로콜라: { price: 3000, category: "drink" },
    레드와인: { price: 60000, category: "drink" },
    샴페인: { price: 25000, category: "drink" },
  };

  beforeEach(() => {
    mockMenu = new Menu();
    mockMenu.getMenuPrice.mockImplementation((item) => {
      let price = {};
      for (const menuItem in menu) {
        const categoryName = menu[menuItem].price;
        price[menuItem] = categoryName;
      }
      return price[item] || 0;
    });
    mockMenu.getMenuCategory.mockImplementation((item) => {
      let category = {};
      for (const menuItem in menu) {
        const categoryName = menu[menuItem].category;
        category[menuItem] = categoryName;
      }
      return category[item] || "";
    });

    // mockOrder = new Order("티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1");
    // decemberBenefitPass = new DecemberBenefit(
    //   mockOrder,
    //   new Date("2023-12-03")
    // );
  });

  const mockOrderList = [
    new Order("티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"),
    new Order("제로콜라-1,아이스크림-4,샴페인-1"),
    new Order("타파스-1"),
  ];

  const decemberBenefit = [
    [0, new DecemberBenefit(mockOrderList[0], new Date(Date.UTC(2023, 12, 3)))],
    [
      1,
      new DecemberBenefit(mockOrderList[0], new Date(Date.UTC(2023, 12, 31))),
    ],
    [
      2,
      new DecemberBenefit(mockOrderList[0], new Date(Date.UTC(2023, 12, 22))),
    ],
    [
      3,
      new DecemberBenefit(mockOrderList[0], new Date(Date.UTC(2023, 12, 27))),
    ],
  ];
  describe("getDiscountAmountChristmasDDay", () => {
    const matched = [22, 0, 3, 0];
    test.each(decemberBenefit)(
      "getDiscountAmountChristmasDDay - 크리스마스 D-Day 계산 메서드",
      (idx, benefitInstance) => {
        expect(benefitInstance.getDiscountAmountChristmasDDay()).toBe(
          matched[idx]
        );
      }
    );
  });

  describe("getDiscountWeekdayOrWeekend", () => {
    // Test cases here
  });

  describe("getDiscountSpecial", () => {
    // Test cases here
  });

  describe("getGiveaway", () => {
    // Test cases here
  });

  describe("getGiveawayPrice", () => {
    // Test cases here
  });

  describe("getTotalBenefitPrice", () => {
    // Test cases here
  });

  describe("getTotalDiscountPrice", () => {
    // Test cases here
  });

  // Add any additional tests for edge cases or additional methods
});
