const url = "http://localhost:8080/post/getallposts";
const urlTitle = "http://localhost:8080/post/getallpoststitle";
const urlArr = "http://localhost:8080/post/getallpostsarrays";
const urlpart = "http://localhost:8080/post/getallpostsparts";

// post전체 호출해서 table에 보여주기
axios
  .get(urlpart)
  .then((response) => {
    console.log("데이터: ", response.data);
    response.data.forEach((data) => {
      // 2. 테이블에 검색결과 나타내는 부분
      const index = document.createElement("td");
      const postTitle = document.createElement("td");
      const userId = document.createElement("td");
      const createdAt = document.createElement("td");

      const tr = document.createElement("tr");
      // const td = document.createElement("td");
      const tbody = document.querySelector("tbody");

      tr.classList.add("basic");
      // 가져온 post내용 p태그에 넣기
      // 해당되는 각 post를 꺼내기
      index.textContent = data[0];
      postTitle.textContent = data[1];
      userId.textContent = data[2];
      createdAt.textContent = data[3];

      // 넣은 p태그를 table에 넣기
      tr.appendChild(index);
      tr.appendChild(postTitle);
      tr.appendChild(userId);
      tr.appendChild(createdAt);
      tbody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

let keyword = "";

// 검색 값 넣기
document.querySelector(".keyword").addEventListener("change", (e) => {
  keyword = e.target.value;
  console.log(keyword);
});

document.querySelector(".search-btn").addEventListener("click", () => {
  // ~에 대한 결과 창 생성
  const ResultKeyword = document.querySelector(".showResultKeyword");
  const keywordPtag = document.createElement("p");

  // ~에 대한 결과 창 class 추가
  keywordPtag.classList.add("keywordResult");

  // 이전내용 있을시 삭제
  const pResult = document.querySelector(".keywordResult");
  if (pResult.textContent != "") {
    pResult.remove();
  }

  keywordPtag.textContent = `${keyword}에 대한 결과입니다.`;
  console.log(keywordPtag.textContent);

  // ResultKeyword.style.border = `4px solid #00d1fe`;
  ResultKeyword.style.cssText = `border: 4px solid #00d1fe;
  display: flex; justify-content: center; align-items: center`;
  keywordPtag.style.cssText = `width: fit-content; padding-top: 0.5rem`;

  ResultKeyword.appendChild(keywordPtag);

  if (keyword == "") {
    return false;
  }
  // 이전내용 있을시 삭제
  const trResult = document.querySelectorAll(".result");
  if (document.getElementsByClassName("result")) {
    trResult.forEach((e) => {
      e.remove();
    });
  }

  // post 전체내용 불러오기
  axios
    .get(urlpart)
    .then((response) => {
      console.log("데이터: ", response.data);
      searchByKeyword(response.data);
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });
});

// 처리할 함수

function searchByKeyword(posts) {
  // 기본 테이블 삭제

  const basic = document.querySelectorAll(".basic");
  if (document.getElementsByClassName("basic")) {
    basic.forEach((e) => {
      e.remove();
      console.log("삭제완료");
    });
  }
  // 결과값 정의
  let results = [];
  // 1. ~에 대한 검색결과 나타내는 부분
  const resultWrap = document.querySelector(".result_box");
  const resultBox = document.createElement("div");
  const pTag = document.createElement("p");

  posts.forEach((post) => {
    if (post[1].indexOf(keyword) != -1) {
      results.push(post);
    }
    console.log(results);
    if (keyword == "") {
      alert("");
    }
  });
  results.forEach((result) => {
    // 2. 테이블에 검색결과 나타내는 부분
    const index = document.createElement("td");
    const postTitle = document.createElement("td");
    const userId = document.createElement("td");
    const createdAt = document.createElement("td");

    const tr = document.createElement("tr");
    // const td = document.createElement("td");
    const tbody = document.querySelector("tbody");

    tr.classList.add("result");
    // 가져온 post내용 p태그에 넣기
    // 해당되는 각 post를 꺼내기
    index.textContent = result[0];
    postTitle.textContent = result[1];
    userId.textContent = result[2];
    createdAt.textContent = result[3];

    // 넣은 p태그를 table에 넣기
    tr.appendChild(index);
    tr.appendChild(postTitle);
    tr.appendChild(userId);
    tr.appendChild(createdAt);
    tbody.appendChild(tr);
  });
}
