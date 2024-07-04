// 동작코드 시작
const $jQ = jQuery.noConflict();

$jQ(".teacher>div:first-child").click(function () {
  $jQ("#pop_up").addClass("active");
});
$jQ(".image-btn>button").click(function () {
  $jQ("#pop_up").removeClass("active");
});

$jQ(document).ready(function () {
  $jQ(".slidemenu").css("right", "-300px");

  $jQ(".hamburger").click(function () {
    $jQ(".slidemenu").stop(true, true).delay(100).animate({ right: "0" }, 1000);
  });

  $jQ(".closeSideMenu > button").click(function () {
    $jQ(".slidemenu")
      .stop(true, true)
      .delay(100)
      .animate({ right: "-300px" }, 1000);
  });
});

// 동작코드 끝

// 기존 모달위치 선언
const firstwrap = document.querySelector(".alert");
// 모달 내용 변경
const cancletext = document.querySelector(".cancle-wrap").firstElementChild;
const xbtn = document.querySelector(".cancle-wrap").lastElementChild;
const modalcontentsSpan =
  document.querySelector(".modal-contents").firstElementChild;
const btnWrap = document.querySelector(".btn-wrap");

// 모달 속 확인 취소 기능 넣기
const yes = document.querySelector(".btn-wrap").firstElementChild;
const no = document.querySelector(".btn-wrap").lastElementChild;

yes.classList.add("yes");
no.classList.add("no");
xbtn.classList.add("closebtn");

// lectureDetail 혹은 mypage에서 클릭 시 해당 정보에 맞는 데이터 로드
const urlParams = new URLSearchParams(window.location.search);
const uId = urlParams.get("user");
const id = urlParams.get("id");
console.log("Lecture ID: ", id);
console.log("User ID: ", uId);

const url = "http://localhost:8080/lectures/getalllectures/" + id;
const nowUrlPart = `http://localhost:8080/movieDic/streaming.html`;

const changeId = parseInt(id, 10);

const showVideo = document.querySelector("#my-video_html5_api");
const myVideo = document.getElementById("my-video");
const vjsPoster = document.getElementsByClassName("vjs-poster");

axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    document.querySelector(".lectureTitle").textContent = "";
    document.querySelector(".lectureTitle").textContent =
      response.data.lectureTitle;
    myVideo.poster = response.data.image;
    Array.from(vjsPoster).forEach((pos) => {
      pos.style.display = `none`;
    });
    showVideo.poster = response.data.image;
    showVideo.src = response.data.lectureUrl;
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
    console.log("강좌 데이터 출력 실패");
  });

// 데이터 로드 끝

// 뒤로가기
document.querySelector(".left").addEventListener("click", () => {
  window.history.go(-1);
});

// 본인이 소유한 lecture 강의이동

document
  .querySelector(".up-down")
  .firstElementChild.addEventListener("click", () => {
    prevMyLecture(changeId);
  });
document
  .querySelector(".up-down")
  .lastElementChild.addEventListener("click", () => {
    nextMyLecture(changeId);
  });

// 구매목록 들고와서 배열의 길이를 반환하는 함수

function prevMyLecture(lecId) {
  axios
    .get("http://localhost:8080/api/products/purchase/current")
    .then((response) => {
      console.log("데이터: ", response.data);
      const lecList = response.data;

      for (i = 0; i < lecList.length; i++) {
        if (lecList[0].lecture.lectureId == lecId) {
          ifFirstLecture();
          break;
        } else if (lecList[i].lecture.lectureId == lecId) {
          console.log("이전으로 이동");
          window.location.href = `${nowUrlPart}?user=${uId}&id=${
            lecList[i - 1].lecture.lectureId
          }`;
        }
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("리스트 출력 실패");
    });
}

function nextMyLecture(lecId) {
  axios
    .get("http://localhost:8080/api/products/purchase/current")
    .then((response) => {
      console.log("데이터: ", response.data);
      const lecList = response.data;
      console.log(lecList[lecList.length - 1].lecture.lectureId == lecId);
      console.log(lecList[lecList.length - 1].lecture.lectureId);
      console.log(lecId);
      for (i = 0; i < lecList.length; i++) {
        if (lecList[lecList.length - 1].lecture.lectureId == lecId) {
          ifLastLecture();
          break;
        } else if (lecList[i].lecture.lectureId == lecId) {
          console.log("다음으로 이동");

          window.location.href = `${nowUrlPart}?user=${uId}&id=${
            lecList[i + 1].lecture.lectureId
          }`;
        }
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("리스트 출력 실패");
    });
}

// 강의 처음과 마지막에 모달 달기

// // 모달 생성
// function moveLectureModal() {}

// 강의가 처음일때
function ifFirstLecture() {
  // 기존 모달위치 선언
  const firstwrap = document.querySelector(".first");
  // 모달 내용 변경
  const cancletext = document.querySelector(".cancle-wrap").firstElementChild;
  const xbtn = document.querySelector(".cancle-wrap").lastElementChild;
  const modalcontentsSpan =
    document.querySelector(".modal-contents").firstElementChild;
  const btnWrap = document.querySelector(".btn-wrap");
  cancletext.textContent = "첫번째 강의";
  xbtn.textContent = "x";
  modalcontentsSpan.textContent = "첫번째 강의입니다!";

  xbtn.classList.add("closebtn");
  // 모달 만드는 함수(jQuery)

  $jQ(".first").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".first").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".first").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".first").removeClass("active");
  });
}

// 강의가 마지막일떄
function ifLastLecture() {
  // 기존 모달위치 선언
  const firstwrap = document.querySelector(".first");
  // 모달 내용 변경
  const cancletext = document.querySelector(".cancle-wrap").firstElementChild;
  const xbtn = document.querySelector(".cancle-wrap").lastElementChild;
  const modalcontentsSpan =
    document.querySelector(".modal-contents").firstElementChild;
  const btnWrap = document.querySelector(".btn-wrap");
  cancletext.textContent = "마지막 강의";
  xbtn.textContent = "x";
  modalcontentsSpan.textContent = "마지막 강의입니다!";

  xbtn.classList.add("closebtn");
  // 모달 만드는 함수(jQuery)

  $jQ(".first").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".first").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".first").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".first").removeClass("active");
  });

  // btnWrap.addEventListener("click", () => {
  //   modalwrap.classList.remove("active");
  // });
}

// 현재 로그인을 하지 않고 접속한 경우
const urlCur = "http://localhost:8080/user/current";

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response.data);
      if (response.status == 200) {
        console.log("로그인 상태입니다."); // 로그인 확인 메시지 수정(0618)
      }
    })
    .catch((error) => {
      console.log("현재 로그인 상태가 아닙니다.: ", error); // 오류 메시지 수정(0618)
      // 기존 모달위치 선언
      const firstwrap = document.querySelector(".first");
      const xbtn = document.querySelector(".cancle-wrap").lastElementChild;
      xbtn.classList.add("closebtn");

      $jQ(".first").addClass("active");
      $jQ(".closebtn").click(function () {
        window.location.href = "mainpage.html";
      });
      $jQ(".yes").click(function () {
        $jQ(".alert").removeClass("active");
        window.location.href = "mainpage.html";
      });
      $jQ(".no").click(function () {
        $jQ(".alert").removeClass("active");
        window.location.href = "mainpage.html";
      });
    });
}

sessionCurrent();
