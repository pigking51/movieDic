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
          alert("첫번째 강의입니다.");
          break;
        } else if (lecList[i].lecture.lectureId == lecId) {
          // alert("이동");
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
          alert("마지막 강의입니다.");
          break;
        } else if (lecList[i].lecture.lectureId == lecId) {
          // alert("이동");
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
