const urlLogout = "http://localhost:8080/user/logout";

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 200) {
        console.log("로그인 상태입니다."); // 로그인 확인 메시지 수정(0618)
        const userId = response.data.userId;
        const authority = response.data.authority[0].authority;
        sessionStorage.setItem(
          // 로그인에 성공할 시 sessionStorage에 loggedIn-User라는 key의 아래 정보를 담음(0618)
          "loggedIn-User",
          JSON.stringify({ userId, authority })
        );
        // 로그인 성공 시 아래 주소로 이동(메인화면 완성되면 바꿀 것!)
        // window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log("현재 로그인 상태가 아닙니다.: ", error); // 오류 메시지 수정(0618)
    });
}

function checkLoggedInUser() {
  const loggedInUser = sessionStorage.getItem("loggedIn-User");
  if (loggedInUser) {
    document.querySelector(".logoutBtn").classList.remove("hidden_logout");
  } else {
    document.querySelector(".logoutBtn").classList.add("hidden_logout");
  }
}

document.querySelector(".logoutBtn").addEventListener("click", () => {
  axios
    .post(urlLogout, {}, { withCredentials: true })
    .then((response) => {
      console.log("로그아웃: ", response);
      sessionStorage.removeItem("loggedIn-User");
      document.querySelector(".logoutBtn").classList.add("hidden_logout");
      window.location.reload();
      alert("로그아웃되셨습니다.");
    })
    .catch((error) => {
      console.log("로그아웃 실패: ", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    });
});

function goToMyPage() {
  const loggedInUser = sessionStorage.getItem("loggedIn-User");
  if (loggedInUser) {
    const myPageElement = document.querySelector("#myPage");
    if (myPageElement) {  // 요소가 존재하는지 확인
      myPageElement.addEventListener("click", (event) => {
        event.preventDefault(); // 기본 링크 이동 방지
        window.location.href = "myPage.html";
      });
    } else {
      console.error('myPage 이름을 가진 id를 찾을 수 없습니다. html을 확인하세요.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
  goToMyPage();
  sessionCurrent();
});
