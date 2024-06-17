const url = "http://localhost:8080/post/getallposts";
const urlpart = "http://localhost:8080/post/getallpostsparts";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Post ID: ", id);

const urls = "http://localhost:8080/post/getallpostsparts" + id;

axios
  .get(urlpart)
  .then((response) => {
    console.log("데이터: ", response.data);
    displayBoardDetails(response.data[id - 1]);
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
