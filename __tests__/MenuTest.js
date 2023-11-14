import Menu from "../src/Domain/Menu";

describe("Menu 클래스 테스트", () => {
  let menuInstance;
  const menu = {
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
  const NotExistMenu = [
    "빼빼로",
    "된장찌개",
    "12345",
    "!@#$",
    " 타파스",
    "크 리 스 마스 파스 타",
    "",
    " ",
    1321,
    null,
    undefined,
  ];

  // 각 테스트 전에 Menu 인스턴스 생성
  beforeEach(() => {
    menuInstance = new Menu();
  });

  describe("checkMenuExistence", () => {
    const trueCase = Object.keys(menu);

    test.each(trueCase)("존재하는 메뉴 체크", (item) => {
      expect(menuInstance.checkMenuExistence(item)).toBeTruthy();
    });
    test.each(NotExistMenu)("존재하지 않은 메뉴 체크", (item) => {
      expect(menuInstance.checkMenuExistence(item)).toBeFalsy();
    });
  });

  describe("checkMenuExistence", () => {
    const menuEntries = Object.entries(menu);

    test.each(menuEntries)("존재 하는 메뉴의 가격 체크", (item) => {
      expect(menuInstance.getMenuPrice(item)).toBe(menu[item].price);
    });
    test.each(NotExistMenu)("존재하지 않은 메뉴 체크", (item) => {
      expect(menuInstance.getMenuPrice(item)).toBe(0);
    });
  });

  describe("getMenuCategory", () => {
    const menuEntries = Object.entries(menu);

    test.each(menuEntries)("존재 하는 메뉴의 카테고리 체크", (item) => {
      expect(menuInstance.getMenuCategory(item)).toBe(menu[item].category);
    });
    test.each(NotExistMenu)("존재하지 않은 카테고리 체크", (item) => {
      expect(menuInstance.getMenuCategory(item)).toBe("");
    });
  });
});
