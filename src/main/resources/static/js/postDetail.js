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
    displayBoardDetails(response.data);
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function displayBoardDetails(data) {
  const contents = document.querySelector(".contents");

  // 태그 요소 생성
  const bTitle = document.createElement("div");
  const bContent = document.createElement("div");
  const pId = document.createElement("p");
  const pTitle = document.createElement("p");
  const pTime = document.createElement("p");
  const pContent = document.createElement("p");
  const uId = document.createElement("p");

  // 요소에 내용 삽입
  data.forEach((e) => {
    // 제목부분
    pId.textContent = e[0];
    pTitle.textContent = e[1];
    uId.textContent = e[2];
    pTime.textContent = e[3];
    // 내용부분
    pContent.textContent = e[4];

    // div에 삽입
    bTitle.appendChild(pId);
    bTitle.appendChild(pTitle);
    bTitle.appendChild(uId);
    bTitle.appendChild(pTime);

    bContent.appendChild(pContent);

    contents.appendChild(bTitle);
    contents.appendChild(bContent);
  });
}
