import { IsNumber, IsNumberInRange } from "../src/Utils.js";

describe("IsNumber", () => {
  it("숫자 테스트 ", () => {
    expect(IsNumber("12345")).toBe(true);
  });

  it("문자 테스트", () => {
    expect(IsNumber("123a45")).toBe(false);
  });

  it("빈 문자 테스트", () => {
    expect(IsNumber("")).toBe(false);
  });
});

describe("IsNumberInRange", () => {
  const min = 10;
  const max = 20;

  it("target이 범위 내에 있음", () => {
    expect(IsNumberInRange(15, min, max)).toBe(true);
  });

  it("target이 범위 보다 작음", () => {
    expect(IsNumberInRange(5, min, max)).toBe(false);
  });

  it("target이 범위 보다 큼", () => {
    expect(IsNumberInRange(25, min, max)).toBe(false);
  });

  it("target이 숫자가 아님", () => {
    expect(IsNumberInRange("ㅁ", min, max)).toBe(false);
  });

  it("모든 Argument가 숫자가 아님", () => {
    expect(IsNumberInRange("ㅁ", "!", "1")).toBe(false);
  });
});
