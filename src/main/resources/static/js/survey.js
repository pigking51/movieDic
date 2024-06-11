const url = "localhost:8080/csat/survey";

let firstData = [];
let surveyQuestion = "";
let answer1 = "";
let answer2 = "";
let answer3 = "";
let answer4 = "";
let answer5 = "";
let userId = "";

// 1번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer1 != "") {
    answer1 = "";
  }
  answer1 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer1 != "") {
    answer1 = "";
  }
  answer1 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer1 != "") {
    answer1 = "";
  }
  answer1 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer1 != "") {
    answer1 = "";
  }
  answer1 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer1 != "") {
    answer1 = "";
  }
  answer1 = e.target.value;
});

// 2번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer2 != "") {
    answer2 = "";
  }
  answer2 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer2 != "") {
    answer2 = "";
  }
  answer2 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer2 != "") {
    answer2 = "";
  }
  answer2 = e.target.value;
});

// 3번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer3 != "") {
    answer3 = "";
  }
  answer3 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer3 != "") {
    answer3 = "";
  }
  answer3 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer3 != "") {
    answer3 = "";
  }
  answer3 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer3 != "") {
    answer3 = "";
  }
  answer3 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer3 != "") {
    answer3 = "";
  }
  answer3 = e.target.value;
});

// 4번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer4 != "") {
    answer4 = "";
  }
  answer4 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer4 != "") {
    answer4 = "";
  }
  answer4 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer4 != "") {
    answer4 = "";
  }
  answer4 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer4 != "") {
    answer4 = "";
  }
  answer4 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer4 != "") {
    answer4 = "";
  }
  answer4 = e.target.value;
});

// 5번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer5 != "") {
    answer5 = "";
  }
  answer5 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer5 != "") {
    answer5 = "";
  }
  answer5 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer5 != "") {
    answer5 = "";
  }
  answer5 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer5 != "") {
    answer5 = "";
  }
  answer5 = e.target.value;
});
document.querySelector("#s_10").addEventListener("click", (e) => {
  if (answer5 != "") {
    answer5 = "";
  }
  answer5 = e.target.value;
});

// 현재 로그인 정보확인(여기서 user정보 가져와서 userId에 담기)
function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        console.log("세션 유지");
        // 로그인 성공 시 아래 주소로 이동(메인화면 완성되면 바꿀 것!)
        window.location.href = "index.html";

        // 로그인 했을때 login-box와 전환되면서 나오는 박스
        // 해당기능도 0610기준 필요없어서 주석처리함
        // if (response.status == 200) {
        //   document.querySelector(".login-box").classList.add("hidden");
        //   document.querySelector(".user-box").classList.remove("hidden");
        //   document.querySelector(".user-box p").textContent =
        //     response.data.userId + "님 환영합니다.";
        // }
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
}
