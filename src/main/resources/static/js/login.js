const urlLogin = "http://localhost:8080/user/login";
const urlLogout = "http://localhost:8080/user/logout";
const urlsignUp = "http://localhost:8080/user/signup";
const urlShow = "http://localhost:8080/user/show";

let userId = "";
let password = "";
let userName = "";
let userEmail = "";

// input내용 담기
document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  // 확인해보면 엄청 길게 나오는데 여기서 value 값이 필요(입력한 값 나와있음)
  //  → e.target.value 사용
  userId = e.target.value;
});

document.querySelector("#password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector(".togBtn").addEventListener("click", () => {
  if (document.querySelector("#password").type != `text`) {
    document.querySelector("#password").type = `text`;
  } else {
    document.querySelector("#password").type = `password`;
  }
  document.querySelector(".togBtn").classList.toggle("revealBtn");
  document.querySelector(".togBtn").classList.toggle("hideBtn");
});

// document.querySelector(".hideBtn").addEventListener("click", () => {
//   document.querySelector("#password").type = `password`;
//   document.querySelector(".togBtn").classList.toggle("hideBtn");
//   document.querySelector(".togBtn").classList.toggle("revealBtn");
// });

document.querySelector(".loginBtn").addEventListener("click", () => {
  const data = {
    userId: userId,
    password: password,
  };
  if (
    document.querySelector("#userId").value == "" &&
    document.querySelector("#password").value == ""
  ) {
    alert("ID와 비밀번호 둘다 입력하지 않았습니다!!!");
    document.querySelector("#userId").style.border = `4px solid red`;
    document.querySelector("#password").style.border = `4px solid red`;
    return false;
  } else if (document.querySelector("#userId").value == "") {
    alert("ID를 입력하지 않았습니다!");
    document.querySelector("#userId").style.border = `4px solid red`;
    return false;
  } else if (document.querySelector("#password").value == "") {
    alert("비밀번호를 입력하지 않았습니다!");
    document.querySelector("#password").style.border = `4px solid red`;
    return false;
  }

  axios
    .post(urlLogin, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
    .then((response) => {
      console.log("데이터 :", response);
      sessionCurrent();
      alert(`${userId}님 환영합니다!`);
      sessionStorage.setItem(
        // 로그인에 성공할 시 sessionStorage에 loggedIn-User라는 key의 아래 정보를 담음(0618)
        "loggedIn-User",
        JSON.stringify({ userId, authority })
      );
      document.querySelector("#userId").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#userId").style.border = `2px solid #00d1fe;`;
      document.querySelector("#password").style.border = `2px solid #00d1fe;`;
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
      alert("ID 혹은 비밀번호가 잘못되었습니다!");
    });
});

// 로그아웃 (0610기준 현재는 없는 것 같으니 추후 필요한 곳에 넣기)
// document.querySelector(".logoutBtn").addEventListener("click", () => {
//   if (confirm("로그아웃 하시겠습니까?")) {
//     axios
//       .post(urlLogout, {}, { withCredentials: true })
//       .then((response) => {
//         console.log("데이터: ", response);
//         if (response.status == 200) {
//           document.querySelector(".login-box").classList.remove("hidden");
//           document.querySelector(".user-box").classList.add("hidden");
//         }
//       })
//       .catch((error) => {
//         console.log("오류 발생: ", error);
//       });
//   }
// });

// 회원가입&이전화면 버튼(0610기준 필요없는 기능이라 주석처리함)
// document.querySelector(".goToSignUp").addEventListener("click", () => {
//   document.querySelector(".login-box").classList.add("hidden");
//   document.querySelector(".signUp-box").classList.remove("hidden");
// });
// document.querySelector(".prevBtn").addEventListener("click", () => {
//   document.querySelector(".signUp-box").classList.add("hidden");
//   document.querySelector(".login-box").classList.remove("hidden");
// });

// document.querySelector("#password2").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   password = e.target.value;
// });

// document.querySelector("#userName").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   userName = e.target.value;
// });

// document.querySelector("#userEmail").addEventListener("change", (e) => {
//   console.log(e.target.value);
//   userEmail = e.target.value;
// });

// const upUserId = document.querySelector("#userId2");
// const upUserPW = document.querySelector("#password2");
// const upUserName = document.querySelector("#userName");
// const upUserEM = document.querySelector("#userEmail");

// document.querySelector(".register").addEventListener("click", () => {
//   const data = {
//     userId: userId,
//     password: password,
//     userName: userName,
//     userEmail: userEmail,
//   };
//   axios
//     .post(urlsignUp, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
//     .then((response) => {
//       console.log("데이터 :", response);
//       if (response.status == 201) {
//         alert("회원가입 완료");
//         document.querySelector("#userId2").value = "";
//         document.querySelector("#password2").value = "";
//         document.querySelector("#userName").value = "";
//         document.querySelector("#userEmail").value = "";
//         document.querySelector(".signUp-box").classList.add("hidden");
//         document.querySelector(".login-box").classList.remove("hidden");
//       }
//     })
//     .catch((error) => {
//       console.log("에러발생 : ", error);
//     });
// });

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        console.log("로그인 상태입니다."); // 로그인 확인 메시지 수정(0618)
        // 로그인 성공 시 아래 주소로 이동(메인화면 완성되면 바꿀 것!)
        // window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log("현재 로그인 상태가 아닙니다.: ", error); // 오류 메시지 수정(0618)
      alert("로그인 해주세요.");
    });
}

// 유저 총 인원 확인할때 사용할 것!!!

// axios
//   .get(urlShow)
//   .then((response) => {
//     console.log("응답 Response :", response);
//     console.log(response.data);
//     displayUserSum(response.data);
//   })
//   .catch((error) => {
//     console.log("에러 발생 :", error);
//   });

// function displayUserSum(gameData) {
//   const userSum = document.querySelector(".userSum");
//   const gageBar = document.querySelector(".gageBar");
//   userSum.style.width = `${gameData.length}px`;
//   const uma = document.createElement("p");
//   uma.textContent = `현재 회원 수 : ${gameData.length}명!`;
//   gageBar.appendChild(uma);
// }

// js 파일이 로드될 때 호출됨
sessionCurrent();
