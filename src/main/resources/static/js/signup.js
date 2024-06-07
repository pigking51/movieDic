const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlsignUp = "http://localhost:8080/user/signup";
const url = "http://localhost:8080/products";
const urlShow = "http://localhost:8080/user/show";

let userId = "";
let password = "";
let userName = "";
let userEmail = "";
let gender = "";
let age = 0;
let birthday = "";

// document.querySelector("#userId2").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   // 확인해보면 엄청 길게 나오는데 여기서 value 값이 필요(입력한 값 나와있음)
//   //  → e.target.value 사용
//   userId = e.target.value;
// });

document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector("#password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector("#userName").addEventListener("change", (e) => {
  console.log(e.target.value);
  userName = e.target.value;
});

document.querySelector("#male").addEventListener("click", (e) => {
  if (!gender == "") {
    gender = "";
    console.log("있던거 삭제", gender);
  }
  console.log(e.target.value);
  gender = e.target.value;
});
document.querySelector("#female").addEventListener("click", (e) => {
  if (!gender == "") {
    gender = "";
    console.log("있던거 삭제", gender);
  }
  console.log(e.target.value);
  gender = e.target.value;
});

document.querySelector("#userEmail").addEventListener("change", (e) => {
  console.log(e.target.value);
  userEmail = e.target.value;
});
document.querySelector("#age").addEventListener("change", (e) => {
  console.log(e.target.value);
  age = e.target.value;
});
document.querySelector("#birthday").addEventListener("change", (e) => {
  console.log(e.target.value);
  birthday = e.target.value;
});

const upUserId = document.querySelector("#userId2");
const upUserPW = document.querySelector("#password2");
const upUserName = document.querySelector("#userName");
const upUserEM = document.querySelector("#userEmail");

document.querySelector(".register").addEventListener("click", () => {
  const data = {
    userId: userId,
    password: password,
    userName: userName,
    userEmail: userEmail,
    gender: gender,
    age: age,
    birthday,
  };
  axios
    .post(urlsignUp, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
    .then((response) => {
      console.log("데이터 :", response);
      if (response.status == 201) {
        alert("회원가입 완료");
        document.querySelector("#userId2").value = "";
        document.querySelector("#password2").value = "";
        document.querySelector("#userName").value = "";
        document.querySelector("#userEmail").value = "";
        document.querySelector(".signUp-box").classList.add("hidden");
        document.querySelector(".login-box").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
    });
});
