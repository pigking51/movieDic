const url = "http://localhost:8080/post/write";
const urlcurrent = "http://localhost:8080/user/current";
const urlBoard = "http://localhost:8080/board/allboards";

let board = 1;
let title = "";
let contents = "";
let userId = "";

document.querySelector(".selBoard").addEventListener("click", (e) => {
  if (e.target.value == "자유게시판") {
    board = 1;
  } else if (e.target.value == "토론게시판") {
    board = 2;
  } else if (e.target.value == "무인도") {
    board = 3;
  }

  console.log(board);
});

document.querySelector("#writetitle").addEventListener("change", (e) => {
  title = e.target.value;
  console.log(title);
});

document.querySelector(".subject").addEventListener("change", (e) => {
  contents = e.target.value;
  console.log(contents);
});

document.querySelector(".submit-Btn").addEventListener("click", () => {
  axios
    .get(urlcurrent)
    .then((response) => {
      console.log("데이터: ", response.data);
      userId = response.data.userId;
      console.log(userId);

      data = {
        boardId: board,
        userId: userId,
        postTitle: title,
        postContent: contents,
      };

      console.log(data);

      axios
        .post(url, data, { withCredentials: true })
        .then((response) => {
          console.log("데이터: ", response.data);
          console.log("전송성공");
          title = "";
          contents = "";
          window.location.href = "board.html";
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
        });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      alert("로그인이 필요한 서비스입니다.");
    });
});
