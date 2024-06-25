const url = "http://localhost:8080/post/getallposts";
const urlpart = "http://localhost:8080/post/getallpostsparts";
const urlcomment = "http://localhost:8080/comment/write";
const urlCoAll = "http://localhost:8080/comment/commentAll";
const urlCur = "http://localhost:8080/user/current";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Post ID: ", id);

const urls = "http://localhost:8080/post/getallpostsparts/" + id;
const edit = document.querySelector(".edit-btn");

let boardId = "";
let postId = "";
let userId = "";
let comment = "";

axios
  .get(urls)
  .then((response) => {
    console.log("데이터: ", response.data);
    const nowPostD = response.data;
    displayBoardDetails(response.data);
    postId = response.data.postId;
    boardId = response.data.board.boardId;

    // 댓글달기
    document.querySelector(".commentInput").addEventListener("change", (e) => {
      comment = e.target.value;
      console.log(comment);
    });
    document.querySelector(".upload-btn").addEventListener("click", () => {
      axios
        .get(urlCur)
        .then((response) => {
          console.log("데이터: ", response.data);
          userId = response.data.userId;
          if (!nowPostD.user.userId == userId) {
            edit.style.display = `none`;
          }
          const data = {
            boardId: boardId,
            postId: postId,
            userId: userId,
            commentContent: comment,
          };
          axios
            .post(urlcomment, data, { withCredentials: true })
            .then((response) => {
              console.log("데이터: ", response.data);
              console.log("댓글달기 성공!");
            })
            .catch((error) => {
              console.log("오류 발생: ", error);
              console.log("comment 서버전송 실패");
            });
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
          console.log("현재 post의 comment 추가 실패");
        });
    });
    // 현재 댓글
    axios
      .get(urlCoAll)
      .then((response) => {
        console.log("데이터: ", response.data);
        getAllComment(response.data);
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });

    // 현재 댓글 생성 함수
    const commentList = document.querySelector(".comment-list");
    function getAllComment(comments) {
      let nowPostCom = [];
      for (i = 0; i < comments.length; i++) {
        if (comments[i].post.postId == nowPostD.postId) {
          nowPostCom.push(comments[i]);
        }
      }
      nowPostCom.forEach((comment) => {
        // 요소 생성
        const div = document.createElement("div");
        const uId = document.createElement("p");
        const cComment = document.createElement("p");
        const cCreatedAt = document.createElement("p");

        // 요소에 데이터 추가
        uId.textContent = comment.user.userId;
        cComment.textContent = comment.commentContent;
        cCreatedAt.textContent = comment.createdAt.substring(0, 10);
        // 아래꺼는 시간
        // cCreatedAt.textContent = comment.createdAt.substring(12, 18);

        // 클래스 추가
        div.classList.add("comments");

        // 요소 넣기
        div.appendChild(uId);
        div.appendChild(cComment);
        div.appendChild(cCreatedAt);
        commentList.appendChild(div);
      });

      // 내 댓글 수정
      // const myComments = document.querySelectorAll(".comments").addEventListener("click", () =>{
      //   if(

      //   )
      // })
    }
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function displayBoardDetails(data) {
  const contents = document.querySelector(".contents");
  const postTitle = document.querySelector(".postTitle");
  const postContent = document.querySelector(".postContent");

  // 태그 요소 생성
  const bTitle = document.createElement("div");
  const bContent = document.createElement("div");
  const pId = document.createElement("p");
  const pTitle = document.createElement("p");
  const pTime = document.createElement("p");
  const pContent = document.createElement("p");
  const uId = document.createElement("p");

  // 요소에 내용 삽입

  // 제목부분
  pId.textContent = data.postId;
  pTitle.textContent = data.postTitle;
  uId.textContent = data.user.userId;
  pTime.textContent = data.createdAt.substring(0, 10);
  // 내용부분
  pContent.textContent = data.postContent;

  // div에 삽입
  postTitle.appendChild(pId);
  postTitle.appendChild(pTitle);
  postTitle.appendChild(uId);
  postTitle.appendChild(pTime);

  // postTitle.appendChild(bTitle);
  postContent.appendChild(pContent);
}

// 좋아요 저장 및 표시

const add = (function () {
  let likeCount = 0;
  return function () {
    likeCount += 1;
    return likeCount;
  };
})();

document.querySelector(".like").addEventListener("click", () => {
  document.querySelector(".count").textContent = add();

  // rgb로 출력되는 랜덤 색상값
  const r = Math.floor(Math.random() * 256) - 1;
  const g = Math.floor(Math.random() * 256) - 1;
  const b = Math.floor(Math.random() * 256) - 1;

  // 16진수로 출력되는 랜덤 색상값
  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  document.querySelector(
    ".like"
  ).firstElementChild.style.filter = `drop-shadow(0 0 0 ${getRandomColor()})`;
});

// 설정된 like 개념 잘 모르겠음
