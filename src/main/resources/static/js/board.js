const url = "http://localhost:8080/post/getallposts";
const urlTitle = "http://localhost:8080/post/getallpoststitle";
const urlArr = "http://localhost:8080/post/getallpostsarrays";
const urlpart = "http://localhost:8080/post/getallpostsparts";

// 게시물 10개 넘었을때 다음페이지로 변경
document.querySelector(".block").style.display = `table`;
const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");

const tbody1 = document.querySelector(".body1");
const tbody2 = document.querySelector(".body2");
const numWarp = document.querySelector(".numberNation");

let count = 2;

// post전체 호출해서 table에 보여주기
axios
  .get(urlpart)
  .then((response) => {
    console.log("데이터: ", response.data);

    const tbody3 = document.getElementsByClassName("body3");
    response.data.forEach((data, index) => {
      // 2. 테이블에 검색결과 나타내는 부분
      const indexNum = document.createElement("td");
      const postTitle = document.createElement("td");
      const userId = document.createElement("td");
      const createdAt = document.createElement("td");

      const tr = document.createElement("tr");
      // const td = document.createElement("td");
      // const tbody = document.querySelector("tbody");

      tr.classList.add("basic");
      // 가져온 post내용 p태그에 넣기
      // 해당되는 각 post를 꺼내기
      indexNum.textContent = index + 1;
      postTitle.textContent = data[1];
      userId.textContent = data[2];
      createdAt.textContent = data[3].substring(0, 10);

      // 넣은 p태그를 table에 넣기
      tr.appendChild(indexNum);
      tr.appendChild(postTitle);
      tr.appendChild(userId);
      tr.appendChild(createdAt);

      if (index > 9) {
        for (i = 0; i < response.data.length / 10; i++) {
          if (index == 9 * (i + 2)) {
            const tbody = document.createElement("tbody");
            tbody.classList.add("body3");
            tbody.classList.add("hidden");
            table1.appendChild(tbody);
            count++;
            const innerNum = document.createElement("span");
            innerNum.classList.add("b-active");
            innerNum.textContent = count;
            numWarp.appendChild(innerNum);
          }
          if (index > 9 * (i + 2) + 1 && index < 9 * (i + 3) + 2) {
            console.log("해당되는 것 확인하기");
            tbody3[index].appendChild(tr);
          } else if (index < 20) {
            tbody2.appendChild(tr);
          }
        }
      } else {
        tbody1.appendChild(tr);
      }

      // 해당 게시물 클릭 시 상세로 넘어가는 코드

      tr.addEventListener("click", () => {
        window.location.href = `postDetail.html?id=` + data[0];
      });
    });
    changeTable();
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 검색 값 넣기
let keyword = "";

// ~에 대한 결과 창 생성
const ResultKeyword = document.querySelector(".showResultKeyword");
const keywordPtag = document.createElement("p");
const result = document.querySelectorAll(".result");

document.querySelector(".keyword").addEventListener("change", (e) => {
  keyword = e.target.value;
  console.log(keyword);
});

// result.style.cssText = `border-top:1px solid #00d1fe;`;

document.querySelector(".search-btn").addEventListener("click", () => {
  // 이전내용 있을시 삭제
  keywordPtag.textContent = ``;

  if (document.getElementsByClassName("result") && keyword == "") {
    keywordPtag.textContent = `검색결과가 없습니다.`;
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

    const basic = document.querySelectorAll(".basic");
    if (document.getElementsByClassName("basic")) {
      basic.forEach((e) => {
        e.remove();
        console.log("삭제완료");
      });
    }

    // post전체 호출해서 table에 보여주기
    axios
      .get(urlpart)
      .then((response) => {
        console.log("데이터: ", response.data);
        response.data.forEach((data, index) => {
          // 2. 테이블에 검색결과 나타내는 부분
          const indexNum = document.createElement("td");
          const postTitle = document.createElement("td");
          const userId = document.createElement("td");
          const createdAt = document.createElement("td");

          const tr = document.createElement("tr");
          // const td = document.createElement("td");
          // const tbody = document.querySelector("tbody");

          tr.classList.add("basic");
          // 가져온 post내용 p태그에 넣기
          // 해당되는 각 post를 꺼내기
          indexNum.textContent = index + 1;
          postTitle.textContent = data[1];
          userId.textContent = data[2];
          createdAt.textContent = data[3].substring(0, 10);

          // 넣은 p태그를 table에 넣기
          tr.appendChild(indexNum);
          tr.appendChild(postTitle);
          tr.appendChild(userId);
          tr.appendChild(createdAt);

          if (index > 9) {
            tbody2.appendChild(tr);
          } else {
            tbody1.appendChild(tr);
          }

          // 해당 게시물 클릭 시 상세로 넘어가는 코드

          tr.addEventListener("click", () => {
            alert(`해당 페이지로 이동`);
            window.location.href = `postDetail.html?id=` + index;
          });
        });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
    return false;
  } else if (keyword == "") {
    keywordPtag.textContent = `검색결과가 없습니다.`;
    ResultKeyword.style.cssText = `border: 4px solid #00d1fe;
    display: flex; justify-content: center; align-items: center`;
    keywordPtag.style.cssText = `width: fit-content; padding-top: 0.5rem`;
    ResultKeyword.appendChild(keywordPtag);

    //기존 테이블 삭제

    return false;
  }

  // post전체 호출해서 table에 보여주기
  axios
    .get(urlpart)
    .then((response) => {
      console.log("데이터: ", response.data);
      response.data.forEach((data, index) => {
        // 2. 테이블에 검색결과 나타내는 부분
        const indexNum = document.createElement("td");
        const postTitle = document.createElement("td");
        const userId = document.createElement("td");
        const createdAt = document.createElement("td");

        const tr = document.createElement("tr");
        // const td = document.createElement("td");
        // const tbody = document.querySelector("tbody");

        tr.classList.add("basic");
        // 가져온 post내용 p태그에 넣기
        // 해당되는 각 post를 꺼내기
        indexNum.textContent = index + 1;
        postTitle.textContent = data[1];
        userId.textContent = data[2];
        createdAt.textContent = data[3].substring(0, 10);

        // 넣은 p태그를 table에 넣기
        tr.appendChild(indexNum);
        tr.appendChild(postTitle);
        tr.appendChild(userId);
        tr.appendChild(createdAt);

        if (index > 9) {
          tbody2.appendChild(tr);
        } else {
          tbody1.appendChild(tr);
        }

        // 해당 게시물 클릭 시 상세로 넘어가는 코드

        tr.addEventListener("click", () => {
          alert(`해당 페이지로 이동`);
          window.location.href = `postDetail.html?id=` + index;
        });
      });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });

  //검색결과 이전내용 있을시 삭제
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

  const basic = document.querySelectorAll(".basic");
  if (document.getElementsByClassName("basic")) {
    basic.forEach((e) => {
      e.remove();
      console.log("삭제완료");
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
  });
  results.forEach((result, index) => {
    // 2. 테이블에 검색결과 나타내는 부분
    const indexNum = document.createElement("td");
    const postTitle = document.createElement("td");
    const userId = document.createElement("td");
    const createdAt = document.createElement("td");

    const tr = document.createElement("tr");
    // const td = document.createElement("td");

    tr.classList.add("result");

    // 가져온 post내용 p태그에 넣기
    // 해당되는 각 post를 꺼내기
    indexNum.textContent = index + 1;
    postTitle.textContent = result[1];
    userId.textContent = result[2];
    createdAt.textContent = result[3].substring(0, 10);

    // 넣은 p태그를 table에 넣기
    tr.appendChild(indexNum);
    tr.appendChild(postTitle);
    tr.appendChild(userId);
    tr.appendChild(createdAt);
    tbody1.appendChild(tr);

    // 해당 게시물 클릭 시 상세로 넘어가는 코드

    tr.addEventListener("click", () => {
      alert(`해당 페이지로 이동`);
      window.location.href = `postDetail.html?id=` + index;
    });

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

// 아래 번호 누르는거 구현 실패(시도중)
function changeTable() {
  const allTbody = document.querySelectorAll("tbody");
  const bActive = document.querySelectorAll(".b-active");
  const allTbodyArray = Array.from(allTbody);
  let show = false;
  console.log(bActive.length);
  Array.from(bActive).forEach((active, index) => {
    active.addEventListener("click", () => {
      console.log(`번호확인 ${index + 1}`);

      for (i = 0; i < allTbody.length; i++) {
        const partTbodyArray = allTbodyArray.pop(allTbodyArray[i]);
        const partTbodyArray2 = Array.from(allTbody).pop(allTbody[i]);
        console.log(partTbodyArray);
        console.log(partTbodyArray2);
        console.log(allTbody[0].className);
        if (allTbody[i].className.indexOf("hidden")) {
          allTbody[i].classList.remove("hidden");
          partTbodyArray.forEach((PTA) => {
            if (PTA.className.indexOf("hidden")) {
              PTA.classList.add("hidden");
            }
          });
        } else if (allTbody[i].className.indexOf("hidden")) {
          allTbody[i].classList.add("hidden");
          partTbodyArray.forEach((PTA) => {
            if (PTA.className.indexOf("hidden")) {
              PTA.classList.remove("hidden");
            }
          });
        } else {
          console.log("if조건 문제");
          return;
        }
      }
    });
  });
}
