const url = "http://localhost:8080/post/write";
const urlcurrent = "http://localhost:8080/user/current";
const urlBoard = "http://localhost:8080/board/allboards";

let board = 0;
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

      axios
        .get(urlBoard)
        .then((response) => {
          console.log("데이터: ", response.data);
          for (i = 0; i < response.data.length; i++) {
            let found = false;
            if (board == response.data[i].boardName) {
              board = response.data[i].boardId;
              found = true;
              break;
            }
          }
          console.log(board);

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
            })
            .catch((error) => {
              console.log("오류 발생: ", error);
            });
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
        });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      alert("내부에서 문제!");
    });
});
