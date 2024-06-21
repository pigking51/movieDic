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

axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    document.querySelector(".lectureTitle").textContent = "";
    document.querySelector(".lectureTitle").textContent =
      response.data.lectureTitle;
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
    console.log("강좌 데이터 출력 실패");
  });

// 데이터 로드 끝

// 뒤로가기
document.querySelector(".logo").addEventListener("click", () => {
  window.history.go(-1);
});

// 본인이 소유한 lecture 강의이동
document
  .querySelector(".up-down")
  .firstElementChild.addEventListener("click", () => {
    // window.location.href = `${nowUrl}user=${uId}&id=${}`
  });
document
  .querySelector(".up-down")
  .lastElementChild.addEventListener("click", () => {
    // window.location.href = ``;
  });
