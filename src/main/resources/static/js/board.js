const url = "http://localhost8080/post/getallposts";

let keyword = "";

// 검색 값 넣기
document.querySelector(".keyword").addEventListener("click", (e) => {
  keyword = e.target.value;
});

// post 전체내용 불러오기
axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    searchByKeyword(response.data);
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 결과창 요소 생성

// 1. ~에 대한 검색결과 나타내는 부분
const resultWrap = document.querySelector(".result_box");
const resultBox = document.createElement("div");
const pTag = document.createElement("p");
// 2. 테이블에 검색결과 나타내는 부분
const index = document.createElement("p");
const postTitle = document.createElement("p");
const createdAt = document.createElement("p");

const tr = document.createElement("tr");
const td = document.createElement("td");

// 처리할 함수

function searchByKeyword(posts) {
  // 해당되는 각 post를 꺼내기
  if (posts.postTitle.indexOf(keyword)) {
    forEach((post) => {
      // 가져온 post내용 p태그에 넣기
      index.textContent = `post.postId`;
      postTitle.textContent = `post.postTitle`;
      createdAt.textContent = `post.createdAt`;

      // 넣은 p태그를
    });
  }
}
