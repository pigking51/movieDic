const url = "http://localhost:8080/user/modify/";
const urlCur = "http://localhost:8080/user/current";
const urlShow = "http://localhost:8080/user/show";

// const urlParams = new URLSearchParams(window.location.search);
// const pId = urlParams.get("id");
// console.log("Post ID: ", Id);

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

// document.querySelector(".nickname").addEventListener("change", (e) => {
//   nickname = e.target.value;
// });

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

// 아이디는 수정 안하는 것!!!

// document.querySelector(".nick_check").addEventListener("click", () => {
//   axios
//     .get(urlShow)
//     .then((response) => {
//       console.log("데이터: ", response.data);
//       for (i = 0; i < response.data.length; i++) {
//         if (response.data[i].userId == nickname) {
//           alert(`중복된 ID입니다!
//         다른 ID를 입력해주세요!!!`);
//           break;
//         } else if (document.querySelector(".nickname").value == "") {
//           alert("ID를 입력해주세요!!!");
//           break;
//         } else if (
//           i == response.data.length - 1 &&
//           response.data[i].userId != nickname
//         ) {
//           if (
//             !confirm(`사용 가능한 ID입니다
//           해당 ID를 사용하시겠습니까?`)
//           ) {
//             document.querySelector(".nickname").value = "";
//           }
//           break;
//         }
//       }
//     })
//     .catch((error) => {
//       console.log("오류 발생: ", error);
//       console.log("ID 중복체크 실패");
//     });
// });

// email 중복체크

document.querySelector(".email_check").addEventListener("click", () => {
  axios
    .get(urlShow)
    .then((response) => {
      console.log("데이터: ", response.data);
      for (i = 0; i < response.data.length; i++) {
        console.log(response.data[0].email);
        if (response.data[i].email == email) {
          alert(`이미 등록된 email이 존재합니다!
        다른 email을 입력해주세요!!!`);
          break;
        } else if (document.querySelector(".email").value == "") {
          alert("email을 입력해주세요!!!");
          break;
        } else if (
          i == response.data.length - 1 &&
          response.data[i].userEmail != email
        ) {
          if (
            !confirm(`사용 가능한 email입니다
          해당 email을 사용하시겠습니까?`)
          ) {
            document.querySelector(".email").value = "";
          }
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
    alert("비밀번호를 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".name").value == "") {
    alert("이름을 입력하지 않았습니다!");
    return false;
  } else if (document.querySelector(".email").value == "") {
    alert(" email을 입력하지 않았습니다!");
    return false;
  }

  // 비밀번호 일치 확인
  if (passwordcheck != password) {
    document.querySelector(".passwordcheck").style.border = `4px solid #f2bfde`;
    alert(`비밀번호가 일치하지 않습니다`);
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
        realname: Rname,
        gender: gender,
      };

      let id = response.data.userId;
      axios
        .patch(url + `${id}`, data)
        .then((response) => {
          console.log("데이터: ", response.data);
          console.log("갱신완료");
          alert("갱신이 완료되었습니다");
          window.location.reload();
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
let userId = "";

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

//// 내 강의 클릭 시 해당 주소로 이동
//document.addEventListener("DOMContentLoaded", () => {
//  preLectureBox.forEach((goLecture, index) => {
//    goLecture.addEventListener("click", () => {
//      window.location.href = `streaming.html`;
//      alert("반응하는지 확인!!!");
//    });
//  });
//});

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
