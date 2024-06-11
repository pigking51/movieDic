const url = "http://localhost:8080/csat/survey";
const urlShow = "http://localhost:8080/user/show";

let answer1 = 0;
let answer2 = "";
let answer3 = "";
let answer4 = "";
let answer5 = "";

// 1번 항목 radio 태그선택
document.querySelector("#s_10").addEventListener("click", (e) => {
  answer1 = e.target.value;
  console.log(answer1);
});
document.querySelector("#s_20").addEventListener("click", (e) => {
  answer1 = e.target.value;
  console.log(answer1);
});
document.querySelector("#s_30").addEventListener("click", (e) => {
  answer1 = e.target.value;
  console.log(answer1);
});
document.querySelector("#s_40").addEventListener("click", (e) => {
  answer1 = e.target.value;
  console.log(answer1);
});
document.querySelector("#s_50").addEventListener("click", (e) => {
  answer1 = e.target.value;
});

// 2번 항목 radio 태그선택
document.querySelector("#male").addEventListener("click", (e) => {
  answer2 = e.target.value;
});
document.querySelector("#female").addEventListener("click", (e) => {
  answer2 = e.target.value;
});
document.querySelector("#nothing").addEventListener("click", (e) => {
  answer2 = e.target.value;
});

// 3번 항목 radio 태그선택
document.querySelector("#c_verygood").addEventListener("click", (e) => {
  answer3 = e.target.value;
});
document.querySelector("#c_good").addEventListener("click", (e) => {
  answer3 = e.target.value;
});
document.querySelector("#c_normal").addEventListener("click", (e) => {
  answer3 = e.target.value;
});
document.querySelector("#c_bad").addEventListener("click", (e) => {
  answer3 = e.target.value;
});
document.querySelector("#c_verybad").addEventListener("click", (e) => {
  answer3 = e.target.value;
});

// 4번 항목 radio 태그선택
document.querySelector("#a_verygood").addEventListener("click", (e) => {
  answer4 = e.target.value;
});
document.querySelector("#a_good").addEventListener("click", (e) => {
  answer4 = e.target.value;
});
document.querySelector("#a_normal").addEventListener("click", (e) => {
  answer4 = e.target.value;
});
document.querySelector("#a_bad").addEventListener("click", (e) => {
  answer4 = e.target.value;
});
document.querySelector("#a_verybad").addEventListener("click", (e) => {
  answer4 = e.target.value;
});

// 5번 항목 radio 태그선택
document.querySelector("#p_verygood").addEventListener("click", (e) => {
  answer5 = e.target.value;
});
document.querySelector("#p_good").addEventListener("click", (e) => {
  answer5 = e.target.value;
});
document.querySelector("#p_normal").addEventListener("click", (e) => {
  answer5 = e.target.value;
});
document.querySelector("#p_bad").addEventListener("click", (e) => {
  answer5 = e.target.value;
});
document.querySelector("#p_verybad").addEventListener("click", (e) => {
  answer5 = e.target.value;
});

// 현재 유저Id 가져오기
let nowUserId = "";
let userId = "";

document.querySelector(".surveyBtn").addEventListener("click", () => {
  // 현재 로그인 정보확인
  // axios.get("urlShow").then((response) => {
  //   console.log("데이터: ", response.data);
  //   for (i = 0; i < response.data.length; i++) {
  //     if (response.data[i].userId == userId) {
  //     }
  //   }
  // });

  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        console.log("세션 유지");
        nowUserId = response.data.userId;
        console.log(nowUserId);

        const data = {
          answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          answer4: answer4,
          answer5: answer5,
          userid: nowUserId,
        };
        console.log(data);
        axios
          .post("http://localhost:8080/csat/survey", data, {
            withCredentials: true,
          })
          .then((response) => {
            console.log("데이터: ", response.data);
            alert("설문에 응해주셔서 감사합니다!!");
          })
          .catch((error) => {
            console.log("에러발생 : ", error);
            alert("post쪽 에러!!");
          });
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});
