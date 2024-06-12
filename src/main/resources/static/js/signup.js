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
let birthday = "";

let passChk = "";

// input 내용 담기
document.querySelector(".nickname").addEventListener("change", (e) => {
  console.log(e.target.value);
  userId = e.target.value;
});

document.querySelector(".password").addEventListener("change", (e) => {
  console.log(e.target.value);
  password = e.target.value;
});

document.querySelector(".birth").addEventListener("change", (e) => {
  console.log(e.target.value);
  birthday = e.target.value;
});
document.querySelector(".email").addEventListener("change", (e) => {
  console.log(e.target.value);
  userEmail = e.target.value;
});

document.querySelector(".name").addEventListener("change", (e) => {
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

document.querySelector(".passwordcheck").addEventListener("change", (e) => {
  console.log(e.target.value);
  passChk = e.target.value;
});

//중복체크

// id 중복체크

document.querySelector(".nick_check").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      for (i = 0; i < response.data.length; i++) {
        if (response.data[i].userId == userId) {
          alert(`중복된 ID입니다!
        다른 ID를 입력해주세요!!!`);
          break;
        } else if (document.querySelector(".nickname").value == "") {
          alert("ID를 입력해주세요!!!");
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userId != userId
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
        if (response.data[i].email == userEmail) {
          alert(`이미 등록된 email이 존재합니다!
        다른 email을 입력해주세요!!!`);
          break;
        } else if (document.querySelector(".email").value == "") {
          alert("email을 입력해주세요!!!");
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userEmail != userEmail
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
    });
});
// 뒤로가기
document.querySelector(".backBtn").addEventListener("click", () => {
  alert("뒤로이동!");
  window.history.go(-1);
});

// 회원가입 등록

document.querySelector(".register").addEventListener("click", () => {
  const data = {
    userId: userId,
    password: password,
    birthda: birthday,
    userEmail: userEmail,
    userName: userName,
    gender: gender,
  };
  // 비밀번호 일치 확인

  if (passChk != password) {
    document.querySelector(".passwordcheck").style.border = `4px solid red`;
    alert(`비밀번호가 일치하지 않습니다`);
    return false;
  }
  if (document.querySelector(".nickname").value == "") {
    alert("ID를 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".birth").value == "") {
    alert("생일을 입력하지 않았습니다!");
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

  axios
    .post(urlsignUp, data, { withCredentials: true }) // url 옆에 전송할 객체 넣음
    .then((response) => {
      console.log("데이터 :", response);
      if (response.status == 201) {
        alert("회원가입 완료");
        document.querySelector(".nickname").value = "";
        document.querySelector(".birth").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".passwordcheck").value = "";
        document.querySelector(".name").value = "";
        document.querySelector(".email").value = "";
      }
    })
    .catch((error) => {
      console.log("에러발생 : ", error);
    });
});
