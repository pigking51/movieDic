const url = "http://localhost:8080/post/getallposts";
const urlTitle = "http://localhost:8080/post/getallpoststitle";
const urlArr = "http://localhost:8080/post/getallpostsarrays";
const urlpart = "http://localhost:8080/post/getallpostsparts";

// 게시물 10개 넘었을때 다음페이지로 변경
document.querySelector(".hidden").style.display = `none`;
document.querySelector(".block").style.display = `table`;
const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");
const tbody1 = document.querySelector(".body1");
const tbody2 = document.querySelector(".body2");

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
      // const tbody = document.querySelector("tbody");

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

      if (data[0] > 10) {
        tbody2.appendChild(tr);
      } else {
        tbody1.appendChild(tr);
      }
      // 해당 게시물 클릭 시 상세로 넘어가는 코드

      tr.addEventListener("click", () => {
        alert(`해당 페이지로 이동`);
        window.location.href = `postDetail.html?id=` + data[0];
      });
    });
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 검색 값 넣기
let keyword = "";

document.querySelector(".keyword").addEventListener("change", (e) => {
  keyword = e.target.value;
  console.log(keyword);
});

// ~에 대한 결과 창 생성
const ResultKeyword = document.querySelector(".showResultKeyword");
const keywordPtag = document.createElement("p");
const basic = document.querySelectorAll(".basic");
const result = document.querySelectorAll(".result");
// result.style.cssText = `border-top:1px solid #00d1fe;`;

document.querySelector(".search-btn").addEventListener("click", () => {
  // 이전내용 있을시 삭제
  keywordPtag.textContent = ``;

  if (keyword == "") {
    keywordPtag.textContent = `검색결과가 없습니다.`;
    ResultKeyword.style.cssText = `border: 4px solid #00d1fe;
    display: flex; justify-content: center; align-items: center`;
    keywordPtag.style.cssText = `width: fit-content; padding-top: 0.5rem`;
    ResultKeyword.appendChild(keywordPtag);

    // 기본 테이블 삭제

    if (document.getElementsByClassName("basic")) {
      basic.forEach((e) => {
        e.remove();
        console.log("삭제완료");
      });
    }
    if (document.getElementsByClassName("result")) {
      result.forEach((e) => {
        e.remove();
        console.log("삭제완료");
      });
    }

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
          // const tbody = document.querySelector("tbody");

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

          if (data[0] > 10) {
            tbody2.appendChild(tr);
          } else {
            tbody1.appendChild(tr);
          }

          // 해당 게시물 클릭 시 상세로 넘어가는 코드

          tr.addEventListener("click", () => {
            alert(`해당 페이지로 이동`);
            window.location.href = `postDetail.html?id=` + data[0];
          });
          // const basic = document.querySelectorAll(".basic");
          // basic.forEach((tr) => {
          //   tr.addEventListener("click", () => {
          //     window.location.href = "boardDetail.html?id=" + data[0];
          //   });
          // });
        });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });

    return false;
  }

  // 이전내용 있을시 삭제
  keywordPtag.textContent = ``;

  // ~에 대한 결과 창 class 추가
  keywordPtag.classList.add("keywordResult");

  keywordPtag.textContent = `${keyword}에 대한 결과입니다.`;
  console.log(keywordPtag.textContent);

  ResultKeyword.style.cssText = `border: 4px solid #00d1fe;
  display: flex; justify-content: center; align-items: center`;
  keywordPtag.style.cssText = `width: fit-content; padding-top: 0.5rem`;

  ResultKeyword.appendChild(keywordPtag);

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
    tbody1.appendChild(tr);

    // 10개 넘어가면 다음페이지로 만드는 코드인데
    // 전체 post 수의 배열번호로 받아서 안나오는 경우도 있어 닫아둠
    // if (result[0] > 10) {
    //   tbody2.appendChild(tr);
    // } else {
    //   tbody1.appendChild(tr);
    // }
  });
}

// 날짜순

// 추천수

// 댓글+제목

// 번호추가되면 추후 활성화할 코드

// document.querySelector(".page1").addEventListener("click", () => {
//   if (table1.classList.contains("none")) {
//     return false;
//   }
//   document.querySelector(".table1").classList.remove("block");
//   document.querySelector(".table1").classList.add("none");
// });
// document.querySelector(".page2").addEventListener("click", () => {
//   if (table2.classList.contains("none")) {
//     return false;
//   }
//   document.querySelector(".table2").classList.remove("none");
//   document.querySelector(".table2").classList.add("block");
// });
