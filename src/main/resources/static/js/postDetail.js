const url = "http://localhost:8080/post/getallposts";
const urlpart = "http://localhost:8080/post/getallpostsparts";
const urlcomment = "http://localhost:8080/comment/write";
const urlCoAll = "http://localhost:8080/comment/show";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Post ID: ", id);

const urls = "http://localhost:8080/post/getallpostsparts" + id;

let boardId = "";
let postId = "";
let userId = "";
let comment = "";

axios
  .get(urlpart)
  .then((response) => {
    console.log("데이터: ", response.data);
    displayBoardDetails(response.data[id - 1]);
    postId = response.data[0];
    userId = response.data[2];
    boardId = response.data[5];
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
  pId.textContent = data[0];
  pTitle.textContent = data[1];
  uId.textContent = data[2];
  pTime.textContent = data[3].substring(0, 10);
  // 내용부분
  pContent.textContent = data[4];

  // div에 삽입
  postTitle.appendChild(pId);
  postTitle.appendChild(pTitle);
  postTitle.appendChild(uId);
  postTitle.appendChild(pTime);

  // postTitle.appendChild(bTitle);
  postContent.appendChild(pContent);
}

// 좋아요 저장 및 표시

let likeCount = 0;

document.querySelector(".like").addEventListener("click", () => {
  likeCount++;
  document.querySelector(".count").textContent = likeCount;
});
document.querySelector(".unlike").addEventListener("click", () => {
  likeCount--;
  document.querySelector(".count").textContent = likeCount;
});

// 설정된 like 개념 잘 모르겠음

// 댓글달기

document.querySelector(".commentInput").addEventListener("change", (e) => {
  comment = e.target.value;
  console.log(comment);
});
document.querySelector(".upload-btn").addEventListener("click", () => {
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
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
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
  comments.forEach((comment) => {
    // 요소 생성
    const div = document.createElement("div");
    const uId = document.createElement("p");
    const cComment = document.createElement("p");
    const cCreatedAt = document.createElement("p");

    // 요소에 데이터 추가
    uId.textContent = comment.userId;
    cComment.textContent = comment.commentContent;
    cCreatedAt.textContent = comment.CreatedAt;

    // 클래스 추가
    div.classList.add("comments");

    // 요소 넣기
    div.appendChild(uId);
    div.appendChild(cComment);
    div.appendChild(cCreatedAt);
    commentList.appendChild(div);
  });
}
