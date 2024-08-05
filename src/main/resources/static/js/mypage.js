const url = "http://localhost:8080/user/modify/";
const urlCur = "http://localhost:8080/user/current";
const urlShow = "http://localhost:8080/user/show";

// 모달 요소 선언
// jQ 선언
const $jQ = jQuery.noConflict();
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

// 현재 접속한 유저에 따라 관리자 대시보드 식별여부 구분
const userOrAdmin =
  document.querySelector(".user-info").firstElementChild.lastElementChild;
axios
  .get(urlCur)
  .then((response) => {
    console.log("데이터: ", response.data);
    if (response.data.authority[0].authority != "ROLE_ADMIN") {
      userOrAdmin.style.display = `none`;
    }
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 창 전환

document.querySelector(".myclass").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "block";
  document.querySelector(".user-modify").style.display = "none";
});

document.querySelector(".userEdit").addEventListener("click", () => {
  document.querySelector(".mylecture").style.display = "none";
  document.querySelector(".user-modify").style.display = "block";
});

// 변수선언

let password = "";
let passwordcheck = "";
let email = "";
let Rname = "";
let gender = "";

// 변수에 정보 담기

document.querySelector(".password").addEventListener("change", (e) => {
  password = e.target.value;
});
document.querySelector(".passwordcheck").addEventListener("change", (e) => {
  passwordcheck = e.target.value;
});

document.querySelector(".email").addEventListener("change", (e) => {
  email = e.target.value;
});
document.querySelector(".name").addEventListener("change", (e) => {
  Rname = e.target.value;
});
document.querySelector("#male").addEventListener("click", (e) => {
  gender = e.target.value;
});
document.querySelector("#female").addEventListener("click", (e) => {
  gender = e.target.value;
});

// 중복확인

// email 중복체크

document.querySelector(".email_check").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      for (i = 0; i < response.data.length; i++) {
        console.log(response.data[0].email);
        if (response.data[i].email == email) {
          isEmailDuplication();
          break;
        } else if (document.querySelector(".email").value == "") {
          emailIsBlank();
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userEmail != email
        ) {
          isUseThisEmail();
          break;
        }
      }
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
      console.log("email 중복체크 실패");
    });
});

// 갱신 등록
document.querySelector(".register").addEventListener("click", () => {
  // 공백여부 확인

  if (document.querySelector(".password").value == "") {
    PWIsBlank();
    return false;
  } else if (document.querySelector(".name").value == "") {
    nameIsBlank();
    return false;
  } else if (document.querySelector(".email").value == "") {
    emailIsBlank();
    return false;
  }

  // 비밀번호 일치 확인
  if (passwordcheck != password) {
    document.querySelector(".passwordcheck").style.border = `4px solid #f2bfde`;
    nonCorrectPW();
    return false;
  }

  axios
    .get(urlCur)
    .then((response) => {
      console.log("데이터: ", response.data);
      const data = {
        // userId: nickname,
        password: password,
        email: email,
        realName: Rname,
        gender: gender,
      };

      let id = response.data.userId;
      axios
        .patch(url + `${id}`, data)
        .then((response) => {
          console.log("데이터: ", response.data);
          console.log("갱신완료");
          updateYourProfile();
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
          console.log("갱신실패");
        });
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });
});

// 강의 현황
const purchaseUrl = "http://localhost:8080/api/products/purchase/current";
const purchaseUrlAll = "http://localhost:8080/api/products/purchase";
// let userId = "";

// 검색 시 해당 강의구매목록부분 강조하는 기능
let searchMyLecture = "";
document.querySelector("#found").addEventListener("change", (e) => {
  searchMyLecture = e.target.value;
  console.log(searchMyLecture);
});
document
  .querySelector(".found-search")
  .lastElementChild.addEventListener("click", () => {
    axios
      .get(purchaseUrl, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response.data);
        const myLectureList = response.data;
        const myLectureDisplay = document.querySelectorAll(".lecture-box");

        if (searchMyLecture == "") {
          myLectureDisplay.forEach((lecture) => {
            lecture.style.border = `3px solid #00d1fe`;
            lecture.style.borderBottom = `8px solid #00d1fe`;
          });
          return;
        }

        for (i = 0; i < myLectureList.length; i++) {
          if (myLectureDisplay[i].style.border != `3px solid #00d1fe`) {
            myLectureDisplay[i].style.border = `3px solid #00d1fe`;
            myLectureDisplay[i].style.borderBottom = `8px solid #00d1fe`;
          }
        }
        for (i = 0; i < myLectureList.length; i++) {
          if (
            myLectureList[i].lecture.lectureTitle.indexOf(searchMyLecture) !=
              -1 ||
            myLectureList[i].lecture.major.indexOf(searchMyLecture) != -1 ||
            myLectureList[i].lecture.text.indexOf(searchMyLecture) != -1
          ) {
            myLectureDisplay[i].style.border = `3px solid yellowGreen`;
            myLectureDisplay[i].style.borderBottom = `8px solid yellowGreen`;
          }
        }
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  });

// 내 강의

// 내 강의 box 유무 확인
const myLecture = document.querySelector(".lectureWrap");
const preLectureBox = document.querySelectorAll(".lecture-box");
if (preLectureBox) {
  preLectureBox.forEach((e) => {
    e.remove();
  });
}
axios
  .get(urlCur)
  .then((response) => {
    console.log("데이터: ", response.data);
    const userData = response.data;

    // 유저이름(~님 환영합니다 이런식으로 구현하기)
    const RuserName =
      document.querySelector(".user-info").firstElementChild.firstElementChild;

    axios
      .get(urlShow)
      .then((response) => {
        console.log("데이터: ", response.data);
        const realName = response.data;
        let showName = "";
        // 기존 디폴트 값 삭제
        RuserName.textContent = "";
        realName.forEach((member) => {
          if (member.userId == userData.userId) {
            showName = member.realName;
          }
          RuserName.textContent = showName + `님 환영합니다`;
        });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });

    axios
      .get(purchaseUrlAll)
      .then((response) => {
        console.log("데이터: ", response.data);
        const allPurchase = response.data;

        const haspurchaseArr = [];
        for (i = 0; i < allPurchase.length; i++) {
          haspurchaseArr.push(allPurchase[i].user.userId);
        }
        console.log(haspurchaseArr);
        const distintArr = haspurchaseArr.filter((Element, index) => {
          return haspurchaseArr.indexOf(Element) === index;
        });
        console.log(distintArr);
        if (distintArr.indexOf(userData.userId) == -1) {
          // 요소 생성
          const lectureBox = document.createElement("div");
          const purchaseLectures = document.createElement("button");
          // 요소 안 내용물 삽입
          lectureBox.textContent = `구매한 강의가 없습니다.`;
          purchaseLectures.textContent = `강의 구매하기`;
          purchaseLectures.classList.add("button");
          lectureBox.classList.add("lecture-box");
          // 기존 요소에 추가
          myLecture.appendChild(lectureBox);
          myLecture.appendChild(purchaseLectures);
          // 버튼 클릭시 이동
          myLecture.querySelector(".button").addEventListener("click", () => {
            window.location.href = `lecture.html`;
            return false;
          });
        } else {
          axios
            .get(purchaseUrl)
            .then((response) => {
              console.log("데이터: ", response.data);
              const lectures = response.data;
              console.log(lectures[0].lecture.lectureTitle);

              lectures.forEach((lecture, index) => {
                const lectureBox = document.createElement("div");
                lectureBox.textContent = lecture.lecture.lectureTitle;
                lectureBox.classList.add("lecture-box");
                myLecture.appendChild(lectureBox);

                lectureBox.style.cssText = `cursor: pointer;`;

                lectureBox.addEventListener("click", () => {
                  window.location.href = `streaming.html?user=${userData.userId}&id=${lecture.lecture.lectureId}`;
                });
              });
            })
            .catch((error) => {
              console.log("오류 발생: ", error);
            });
        }
        // return false;
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
        console.log("전체 구매내역 호출 실패");
      });
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
    console.log("현재 유저정보 오류: ");
  });

// 구매이력 많은 순으로 강좌 나열(상위 4개만)
const lectureUrl = "http://localhost:8080/lectures/getalllectures";
axios
  .get(lectureUrl)
  .then((response) => {
    console.log("데이터: ", response.data);
    const lectureIndex = response.data;

    axios
      .get(purchaseUrlAll)
      .then((response) => {
        console.log("데이터: ", response.data);
        const AllLectures = response.data;
        // 구매한 강의 집계
        let lecture1 = { lectureNo: 1, count: 0 };
        let lecture2 = { lectureNo: 2, count: 0 };
        let lecture3 = { lectureNo: 3, count: 0 };
        let lecture4 = { lectureNo: 4, count: 0 };
        let lecture5 = { lectureNo: 5, count: 0 };
        let lecture6 = { lectureNo: 6, count: 0 };
        let lecture7 = { lectureNo: 7, count: 0 };
        let lecture8 = { lectureNo: 8, count: 0 };
        let lecture9 = { lectureNo: 9, count: 0 };
        let lectureArr = [];

        AllLectures.forEach((lectures) => {
          if (lectures.lecture.lectureId == 1) {
            lecture1.count++;
          } else if (lectures.lecture.lectureId == 2) {
            lecture2.count++;
          } else if (lectures.lecture.lectureId == 3) {
            lecture3.count++;
          } else if (lectures.lecture.lectureId == 4) {
            lecture4.count++;
          } else if (lectures.lecture.lectureId == 5) {
            lecture5.count++;
          } else if (lectures.lecture.lectureId == 6) {
            lecture6.count++;
          } else if (lectures.lecture.lectureId == 7) {
            lecture7.count++;
          } else if (lectures.lecture.lectureId == 8) {
            lecture8.count++;
          } else if (lectures.lecture.lectureId == 9) {
            lecture9.count++;
          }
        });

        for (i = 1; i <= lectureIndex.length; i++) {
          lectureArr.push(eval(`lecture${i}`));
        }
        lectureArr.sort(function (a, b) {
          return b.count - a.count;
        });

        const lecTop4 = lectureArr.slice(0, 4);

        const picture = document.querySelectorAll(".picture");
        const subText = document.querySelectorAll(".sub-text");

        lecTop4.forEach((lec, index) => {
          // top화면에 출력할 요소 생성
          const img = document.createElement("img");
          const rankPtag = document.createElement("p");
          const titlePtag = document.createElement("p");
          const countPtag = document.createElement("p");
          lectureIndex.forEach((lecIn, number) => {
            if (lec.lectureNo == lecIn.lectureId) {
              // 기존에 있는 요소 삭제
              picture[index].textContent = "";

              // 출력할 위치에 요소 추가
              img.src = lecIn.image;
              rankPtag.textContent = `순위:  ${index + 1}위`;
              titlePtag.textContent = `강의제목: ` + lecIn.lectureTitle;
              countPtag.textContent = `수강신청 수:  ${lec.count}명`;
              picture[index].appendChild(img);
              subText[index].appendChild(rankPtag);
              subText[index].appendChild(titlePtag);
              subText[index].appendChild(countPtag);

              picture[index].addEventListener("click", () => {
                window.location.href =
                  `lectureDetail.html?id=` + lecIn.lectureId;
              });
            }
          });
        });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
        console.log("추천강좌 출력오류");
      });
  })
  .catch((error) => {
    console.log("오류 발생:", error);
  });

// 상황별 오류 alert 모달 달기
function isEmailDuplication() {
  cancletext.textContent = "중복확인 오류";
  modalcontentsSpan.textContent =
    "이미 등록된 email이 존재합니다! 다른 email을 입력해주세요!!!";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function emailIsBlank() {
  cancletext.textContent = "입력오류";
  modalcontentsSpan.textContent = "email을 입력해주세요!!!";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function isUseThisEmail() {
  cancletext.textContent = "중복확인";
  modalcontentsSpan.textContent =
    "사용 가능한 email입니다 해당 email을 사용하시겠습니까?";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function PWIsBlank() {
  cancletext.textContent = "입력오류";
  modalcontentsSpan.textContent = "비밀번호를 입력하지 않았습니다!";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function nameIsBlank() {
  cancletext.textContent = "입력오류";
  modalcontentsSpan.textContent = "이름을 입력하지 않았습니다!";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function nonCorrectPW() {
  cancletext.textContent = "입력오류";
  modalcontentsSpan.textContent = "비밀번호가 일치하지 않습니다";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
function updateYourProfile() {
  cancletext.textContent = "갱신완료";
  modalcontentsSpan.textContent = "갱신이 완료되었습니다";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
  });
  $jQ(".yes").click(function () {
    window.location.reload();
  });
  $jQ(".no").click(function () {
    $jQ(".alert").removeClass("active");
  });
}
