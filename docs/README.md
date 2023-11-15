# 🎯 3주차 미션

- 미션 제출 기간 : **2023년 11월 7일 15시 00분(목) ~ 2023년 11월 8일 23시 59분(수)**
- 미션 깃허브 : https://github.com/woowacourse-precourse/javascript-lotto-6
- Node.js 버전 : 18.17.1

### 🎯 목표

1. **클래스(객체)를 분리하는 연습**
2. **도메인 로직에 대한 단위 테스트를 작성하는 연습**



## 도메인

- **Menu : 메뉴판**

  - 해당 메뉴가 존재하는지 확인

  - 해당 메뉴의 값을 가져옴
  - 해당 메뉴의 카테고리를 가져옴

- **Order : 주문 내역**
  - 주문 내역 설정
  - 주문 내역 가져옴
  - 총 주문 금액 가져옴
- **DecemberBenefit : 주문에 대한 12월 혜택 적용사항**
  - 크리스마스 D-Day 할인 금액 가져옴
  - 평일/주말 할인금액 가져옴
  - 특별할인 금액 가져옴
  - 증정품 금액 가져옴
  - 총 혜택 금액 가져옴
  - 총 할인 금약 가져옴
- **PaymentStatement** : 명세서 출력내용



## 인터페이스

- **Input : 사용자 입력**
  - InputValidationInput, InputView 객체를 사용
- **InputValidationInput : 사용자 입력값 검증**
- **InputView : 사용자 입력라인**
- **OutputView: 사용자 출력 메시지**

