const urlLogin = "http://localhost:8080/user/login";
const urlsignUp = "http://localhost:8080/user/signup";
const urlShow = "http://localhost:8080/user/show";

let userId = "";
let password = "";
let userName = "";
let userEmail = "";

// 모달 요소 선언
// jQ 선언
const $jQ = jQuery.noConflict();
// 기존 모달위치 선언
const firstwrap = document.querySelector(".alert");
// 모달 내용 변경
const cancletext = document.querySelector(".cancle-wrap").firstElementChild;
const xbtn = document.querySelector(".cancle-wrap").lastElementChild;
const modalcontentsSpan =
  document.querySelector(".modal-contents").firstElementChild;
const btnWrap = document.querySelector(".btn-wrap");
xbtn.classList.add("closebtn");

// 모달 속 확인 취소 기능 넣기
const yes = document.querySelector(".btn-wrap").firstElementChild;
const no = document.querySelector(".btn-wrap").lastElementChild;

yes.classList.add("yes");
no.classList.add("no");

// input내용 담기
document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
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

document.querySelector(".loginBtn").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      const allUserName = [];
      response.data.forEach((member) => {
        if (member.userId == userId) {
          allUserName.push(member.realName);
        }
      });

      const data = {
        userId: userId,
        password: password,
      };
      if (
        document.querySelector("#userId").value == "" &&
        document.querySelector("#password").value == ""
      ) {
        IDAndPWIsNull();
        document.querySelector("#userId").style.border = `4px solid red`;
        document.querySelector(".password_wrap").style.border = `4px solid red`;
        return false;
      } else if (document.querySelector("#userId").value == "") {
        IDIsNull();
        document.querySelector("#userId").style.border = `4px solid red`;
        return false;
      } else if (document.querySelector("#password").value == "") {
        PWIsNull();
        document.querySelector(".password_wrap").style.border = `4px solid red`;
        return false;
      }

      axios
        .post(urlLogin, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
        .then((response) => {
          console.log("데이터 :", response);
          sessionCurrent();
          welcome(allUserName);

          document.querySelector("#userId").value = "";
          document.querySelector("#password").value = "";
          document.querySelector("#userId").style.border = `2px solid #00d1fe;`;
          document.querySelector(
            "#password"
          ).style.border = `2px solid #00d1fe;`;
        })
        .catch((error) => {
          console.log("에러발생 : ", error);
          IDOrPWIsNull();
        });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("회원이름 출력 오류 ");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = sessionStorage.getItem("loggedIn-User");
  const currentPage = window.location.pathname.split("/").pop();
  if (loggedInUser && currentPage === "login.html") {
    alert("잘못된 접근입니다.");
    window.location.href = "mainpage.html"; // 메인 페이지 주소로 변경
  }
});

// 각 상황별 모달창 만들기
cancletext.textContent = "로그인 오류";
function IDAndPWIsNull() {
  modalcontentsSpan.textContent = "ID와 비밀번호 둘다 입력하지 않았습니다!!!";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function IDOrPWIsNull() {
  modalcontentsSpan.textContent = "ID 혹은 비밀번호가 잘못되었습니다!";
  document.querySelector("#userId").style.border = `4px solid red`;
  document.querySelector(".password_wrap").style.border = `4px solid red`;
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function IDIsNull() {
  modalcontentsSpan.textContent = "ID를 입력하지 않았습니다!";
  if (
    document.querySelector(".password_wrap").style.border != `2px solid #00d1fe`
  ) {
    document.querySelector(".password_wrap").style.border = `2px solid #00d1fe`;
  }
  document.querySelector("#userId").style.border = `4px solid red`;
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function PWIsNull() {
  modalcontentsSpan.textContent = "비밀번호를 입력하지 않았습니다!";
  if (document.querySelector("#userId").style.border != `2px solid #00d1fe`) {
    document.querySelector("#userId").style.border = `2px solid #00d1fe`;
  }
  document.querySelector(".password_wrap").style.border = `4px solid red`;
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function welcome(allUserName) {
  cancletext.textContent = "로그인 성공";
  modalcontentsSpan.textContent = `${allUserName}님 환영합니다!`;
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    window.location.href = "mainpage.html";
  });
  $jQ(".no").click(function () {
    window.location.href = "mainpage.html";
  });
}
function unAccptableAccess() {
  cancletext.textContent = "접근오류";
  modalcontentsSpan.textContent = "잘못된 접근입니다.";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
