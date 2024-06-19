const url = "http://localhost:8080/user/modify/";
const urlCur = "http://localhost:8080/user/current";
const urlShow = "http://localhost:8080/user/show";

// 창 전환

document.querySelector(".myclass").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "block";
  document.querySelector(".user-modify").style.display = "none";
});

document.querySelector(".userEdit").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "none";
  document.querySelector(".user-modify").style.display = "block";
});

// 변수선언

let nickname = "";
let password = "";
let passwordcheck = "";
let email = "";
let Rname = "";
let gender = "";

// 변수에 정보 담기

document.querySelector(".nickname").addEventListener("change", (e) => {
  nickname = e.target.value;
});
document.querySelector(".password").addEventListener("change", (e) => {
  password = e.target.value;
});
document.querySelector(".passwordcheck").addEventListener("change", (e) => {
  passwordcheck = e.target.value;
});

document.querySelector(".email").addEventListener("change", (e) => {
  email = e.target.value;
});
document.querySelector(".name").addEventListener("change", (e) => {
  Rname = e.target.value;
});
document.querySelector("#male").addEventListener("click", (e) => {
  gender = e.target.value;
});
document.querySelector("#female").addEventListener("click", (e) => {
  gender = e.target.value;
});

// 중복확인

document.querySelector(".nick_check").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      for (i = 0; i < response.data.length; i++) {
        if (response.data[i].userId == nickname) {
          alert(`중복된 ID입니다!
        다른 ID를 입력해주세요!!!`);
          break;
        } else if (document.querySelector(".nickname").value == "") {
          alert("ID를 입력해주세요!!!");
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userId != nickname
        ) {
          if (
            !confirm(`사용 가능한 ID입니다
          해당 ID를 사용하시겠습니까?`)
          ) {
            document.querySelector(".nickname").value = "";
          }
          break;
        }
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("ID 중복체크 실패");
    });
});

// email 중복체크

document.querySelector(".email_check").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      for (i = 0; i < response.data.length; i++) {
        console.log(response.data[0].email);
        if (response.data[i].email == email) {
          alert(`이미 등록된 email이 존재합니다!
        다른 email을 입력해주세요!!!`);
          break;
        } else if (document.querySelector(".email").value == "") {
          alert("email을 입력해주세요!!!");
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userEmail != email
        ) {
          if (
            !confirm(`사용 가능한 email입니다
          해당 email을 사용하시겠습니까?`)
          ) {
            document.querySelector(".email").value = "";
          }
          break;
        }
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("email 중복체크 실패");
    });
});

// 갱신 등록
document.querySelector(".register").addEventListener("click", () => {
  // 공백여부 확인
  if (document.querySelector(".nickname").value == "") {
    alert("ID를 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".password").value == "") {
    alert("비밀번호를 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".name").value == "") {
    alert("이름을 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".email").value == "") {
    alert(" email을 입력하지 않았습니다!");
    return false;
  }

  // 비밀번호 일치 확인
  if (passwordcheck != password) {
    document.querySelector(".passwordcheck").style.border = `4px solid red`;
    alert(`비밀번호가 일치하지 않습니다`);
    return false;
  }

  axios
    .get(urlCur)
    .then((response) => {
      console.log("데이터: ", response.data);
      const data = {
        // userId: nickname,
        password: password,
        email: email,
        username: Rname,
        gender: gender,
      };

      let id = response.data.userId;
      axios
        .patch(url + `${id}`, data)
        .then((response) => {
          console.log("데이터: ", response.data);
          console.log("갱신완료");
          alert("갱신이 완료되었습니다");
          window.location.reload();
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
          console.log("갱신실패");
        });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });
});

// 강의 현황
const purchaseUrl = "http://localhost:8080/products/purchase/";

let purchaseId = "";

// 내 강의
const myLecture = document.querySelector(".lectureWrap");

const LectureP = document.createElement("p");
if (myLecture) {
  myLecture.forEach((e) => {
    e.remove();
  });
}

// 구매이력 많은 순으로 강좌 나열(상위 4개만)
