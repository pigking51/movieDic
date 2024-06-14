const url = "http://localhost:8080/lectures/getalllectures";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Lecture ID: ", id);

const urls = "http://localhost:8080/lectures/getalllectures/" + id;

axios
  .get(urls)
  .then((response) => {
    console.log("데이터: ", response.data);
    displaylectureDetails(response.data);
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function displaylectureDetails(data) {
  const contents = document.querySelector(".contents");

  // 태그 요소 생성
  const lecture = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const lectureUrl = document.createElement("p");
  const major = document.createElement("p");
  const price = document.createElement("p");
  const text = document.createElement("p");
  const lowBox = document.createElement("div");
  const left = document.createElement("div");
  const right = document.createElement("div");
  const cartBtn = document.createElement("button");

  // 클래스 이름 생성
  lecture.classList.add("lecture");
  img.classList.add("image");
  lowBox.classList.add("low-box");
  cartBtn.classList.add("cart-btn");

  // 태그 속성 추가
  img.src = data.image;
  title.textContent = "강좌명: " + data.lectureTitle;
  major.textContent = "전공: " + data.major;
  price.textContent = "가격: " + data.price;
  text.textContent = data.text;
  lecture.style.setProperty("box-shadow", "initial", "important");
  lecture.style.setProperty("transform", "initial", "important");
  lecture.style.setProperty("cursor", "initial", "important");
  cartBtn.textContent = "장바구니담기";

  // appendChild 자식위치 설정
  right.appendChild(cartBtn);
  left.appendChild(title);
  left.appendChild(major);
  left.appendChild(price);
  left.appendChild(text);
  lowBox.appendChild(left);
  lowBox.appendChild(right);
  lecture.appendChild(img);
  lecture.appendChild(lowBox);
  contents.appendChild(lecture);

  document.querySelector(".cart-btn").addEventListener("click", () => {
    sessionCurrent(data);
    if (confirm("구매완료 장바구니로 가시겠습니까?")) {
      window.location.href = "http://localhost:8080/movieDic/cart.html";
    } else {
      window.location.href = "http://localhost:8080/movieDic/lecture.html";
    }
  });
}

function sessionCurrent(data) {
  axios
    .get("http://localhost:8080/user/current", { widthCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 200) {
        const userId = response.data.userId;
        let cartItems = JSON.parse(localStorage.getItem(userId));
        if (!cartItems) {
          cartItems = [];
        }
        cartItems.push(data);
        localStorage.setItem(userId, JSON.stringify(cartItems));
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      alert("로그인해주세요!!");
    });
}
