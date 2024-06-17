const url = "http://localhost:8080/api/products/purchaseList";

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data.userId);
      if (response.status == 200) {
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (cartItems) {
          displayCart(cartItems);
          const data = cartItems.map((lectures) => {
            // purchase객체를 만들어서 리턴
            return {
              lectures: lectures,
              user: {
                userId: userId,
                authority: { authorityName: authority },
              },
            };
          });
          document
            .querySelector(".pay-button")
            .addEventListener("click", () => {
              if (confirm("진짜 구매하시겠습니까?")) {
                axios
                  .post(url, data, { withCredentials: true })
                  .then((response) => {
                    console.log("데이터: ", response.data);
                    localStorage.removeItem(userId);
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.log("오류 발생: ", error);
                  });
              }
            });
        }
      } else {
        alert("ㅇㅇㅇ");
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      alert("로그인해주세요.");
      window.location.href = `login.html`;
    });
}

function displayCart(lectures) {
  const list = document.querySelector(".cartList");
  const noEmpty = document.querySelector(".noEmpty");
  const cartBody = document.querySelector(".cart-body");
  list.style.display = `none`;
  noEmpty.style.display = `block`;

  let totalPrice = 0;

  lectures.forEach((lecture, index) => {
    // 기존 cartList에 있는 것 삭제

    // 태그 요소 생성
    const tr = document.createElement("tr");
    const imgtd = document.createElement("td");
    const title = document.createElement("td");
    const major = document.createElement("td");
    const price = document.createElement("td");
    const img = document.createElement("img");
    const cancel = document.createElement("td");
    const cBtn = document.createElement("div");

    // 클래스 이름 생성
    imgtd.classList.add("imgtd");
    img.classList.add("image");
    cBtn.classList.add("deleteBtn");

    // 태그 속성 추가
    img.src = lecture.image;
    title.textContent = lecture.lectureTitle;
    major.textContent = lecture.major;
    price.textContent = lecture.price + "원";

    // appendChild 부모자식 위치 설정
    // → 이건 순서상 제일 아래에 작성할 것
    imgtd.appendChild(img);
    tr.appendChild(imgtd);
    tr.appendChild(title);
    tr.appendChild(major);
    tr.appendChild(price);
    cancel.appendChild(cBtn);
    tr.appendChild(cancel);
    cartBody.appendChild(tr);

    cBtn.style.margin = `0 auto`;
    cBtn.textContent = `삭제`;

    cBtn.addEventListener("click", () => {
      deleteIndex(index);
      console.log("삭제완료");
    });

    totalPrice = totalPrice + lecture.price;
  });
  document.querySelector(".totalPrice").textContent = "";
  document.querySelector(".totalPrice").textContent =
    "총 " + totalPrice + "원 입니다.";

  // 삭제버튼 만들기
}

function deleteIndex(Index) {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터:", response.data);
      if (response.status == 200) {
        const userId = response.data.userId;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (cartItems[Index]) {
          cartItems.splice(Index, 1);
          alert("작동되나 확인!!!");
        }
        window.location.reload();
        localStorage.setItem(userId, JSON.stringify(cartItems));
      }
    })
    .catch((error) => {
      console.log("오류발생:", error);
    });
}
// 페이지 로딩시에 즉시 세션여부 확인
sessionCurrent();
