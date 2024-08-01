const url = "http://localhost:8080/post/getallposts";
const urlpart = "http://localhost:8080/post/getallpostsparts";
const urlcomment = "http://localhost:8080/comment/write";
const urlCoAll = "http://localhost:8080/comment/commentAll";
const urlCur = "http://localhost:8080/user/current";
const urlLike = "http://localhost:8080/like/save";
const urlLikeAll = "http://localhost:8080/like/all";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("Post ID: ", id);

const urls = "http://localhost:8080/post/getallpostsparts/" + id;
const edit = document.querySelector(".edit-btn");

let boardId = 1;
let postId = 0;
let userId = "";
let comment = "";
let commentId = 0;

let checked = false;

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
//const yes = document.querySelector(".btn-wrap").firstElementChild;
//const no = document.querySelector(".btn-wrap").lastElementChild;

//yes.classList.add("yes");
//no.classList.add("no");

btnWrap.firstElementChild.classList.add("yes");
btnWrap.lastElementChild.classList.add("no");

xbtn.classList.add("closebtn");

axios
  .get(urls)
  .then((response) => {
    console.log("데이터: ", response.data);
    const nowPostD = response.data;
    displayBoardDetails(response.data);
    rewriteMainContent(response.data);
    postId = response.data.postId;
    boardId = response.data.board.boardId;

    // 댓글달기
    document.querySelector(".commentInput").addEventListener("change", (e) => {
      comment = e.target.value;
      console.log(comment);
    });
    document.querySelector(".upload-btn").addEventListener("click", () => {
      axios
        .get(urlCur)
        .then((response) => {
          console.log("데이터: ", response.data);
          userId = response.data.userId;

          if (!nowPostD.user.userId == userId) {
            edit.style.display = `none`;
          }
          const data = {
            boardId: boardId,
            postId: postId,
            userId: userId,
            commentContent: comment,
          };
          axios
            .post(urlcomment, data, { withCredentials: true })
            .then((response) => {
              console.log("데이터: ", response.data);
              console.log("댓글달기 성공!");
              window.location.reload();
            })
            .catch((error) => {
              console.log("오류 발생: ", error);
              console.log("comment 서버전송 실패");
            });
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
          console.log("현재 post의 comment 추가 실패");
        });
    });
    // 현재 댓글
    axios
      .get(urlCoAll)
      .then((response) => {
        console.log("데이터: ", response.data);
        const allCData = response.data;
        getAllComment(response.data);

        // current 하나 더 생성
        axios
          .get(urlCur)
          .then((response) => {
            console.log("데이터: ", response.data);
            // const nowUserData = response.data;
            rewriteMyComment(response.data);

            // 좋아요 추가에 필요한 데이터
            for (i = 0; i < allCData.length; i++) {
              if (response.data.userId == allCData[i].user.userId) {
                commentId = allCData[i].commentId;
                console.log(commentId);
              }
            }
            console.log(commentId);
            console.log(postId);
            console.log(response.data.userId);

            const likeData = {
              commentId: commentId,
              postId: postId,
              userId: response.data.userId,
            };

            plusLike(likeData);
          })
          .catch((error) => {
            console.log("오류 발생: ", error);
          });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });

    // 현재 댓글 생성 함수
    const commentList = document.querySelector(".comment-list");
    function getAllComment(comments) {
      let nowPostCom = [];
      for (i = 0; i < comments.length; i++) {
        if (comments[i].post.postId == nowPostD.postId) {
          nowPostCom.push(comments[i]);
        }
      }
      nowPostCom.forEach((comment) => {
        // 요소 생성
        const div = document.createElement("div");
        const uId = document.createElement("p");
        const cComment = document.createElement("p");
        const cCreatedAt = document.createElement("p");

        // commentId 추가
        const hiddenId = document.createElement("p");
        hiddenId.textContent = comment.commentId;
        hiddenId.style.display = `none`;

        // 요소에 데이터 추가
        uId.textContent = comment.user.userId;
        cComment.textContent = comment.commentContent;
        cCreatedAt.textContent = comment.createdAt.substring(0, 10);
        // 아래꺼는 시간

        // 클래스 추가
        div.classList.add("comments");

        // 요소 넣기
        div.appendChild(hiddenId);
        div.appendChild(uId);
        div.appendChild(cComment);
        div.appendChild(cCreatedAt);
        commentList.appendChild(div);
      });
    }
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function displayBoardDetails(data) {
  const contents = document.querySelector(".contents");
  const postTitle = document.querySelector(".postTitle");
  const postContent = document.querySelector(".postContent");

  // 태그 요소 생성
  const bTitle = document.createElement("div");
  const bContent = document.createElement("div");
  const pId = document.createElement("p");
  const pTitle = document.createElement("p");
  const pTime = document.createElement("p");
  const pContent = document.createElement("p");
  const uId = document.createElement("p");

  // 요소에 내용 삽입

  // 제목부분
  pId.textContent = data.postId;
  pTitle.textContent = data.postTitle;
  uId.textContent = data.user.userId;
  pTime.textContent = data.createdAt.substring(0, 10);
  // 내용부분
  pContent.textContent = data.postContent;

  // div에 삽입
  postTitle.appendChild(pId);
  postTitle.appendChild(pTitle);
  postTitle.appendChild(uId);
  postTitle.appendChild(pTime);

  // postTitle.appendChild(bTitle);
  postContent.appendChild(pContent);
}

// 좋아요 저장 및 표시

// 현재 좋아요 수 표시
let likeCount = 0;
axios
  .get("http://localhost:8080/like/all", { withCredentials: true })
  .then((response) => {
    console.log("데이터: ", response.data);
    // likeCount = response.data.length;
    const likeRD = response.data;
    console.log(likeRD[0].post.postId);
    document.querySelector(".count").textContent = likeCount;
    axios
      .get(urls, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response.data);
        console.log(response.data.postId);
        for (i = 0; i < likeRD.length; i++) {
          if (response.data.postId == likeRD[i].post.postId) {
            likeCount++;
            console.log(likeCount);
            document.querySelector(".count").textContent = likeCount;
          }
        }
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

function plusLike(data) {
  document.querySelector(".like").addEventListener("click", () => {
    axios
      .get(urlCur)
      .then((response) => {
        console.log("데이터: ", response.data);
        nowUserData2 = response.data;

        axios
          .get("http://localhost:8080/like/all", { withCredentials: true })
          .then((response) => {
            console.log("데이터: ", response.data);
            likeData = response.data;
            likeCount = response.data.length;

            nowPostLike = likeData.filter(
              (likeData) => likeData.post.postId == parseInt(id, 10)
            );
            nowPostLikeCount = nowPostLike.length;

            console.log(nowPostLike);
            console.log(nowPostLikeCount);
            // console.log(nowUserData2.authority[0].authority);
            // console.log(likeCount);
            // 추천 클릭 시 중복 불가 설정(관리자는 예외)
            for (i = 0; i < nowPostLikeCount; i++) {
              if (
                nowUserData2.userId == nowPostLike[i].user.userId &&
                nowUserData2.authority[0].authority == "ROLE_USER"
              ) {
                console.log("이미 추천하셨습니다");
                notdupliThumbs();
                return;
              } else {
                console.log("추천가능");
              }
            }

            // 데이터 저장
            axios
              .post(urlLike, data, { withCredentials: true })
              .then((response) => {
                console.log("데이터: ", response.data);
                console.log("추천 완료");
                thumbsUp();
              })
              .catch((error) => {
                console.log("오류 발생: ", error);
              });
          })
          .catch((error) => {
            console.log("오류 발생", error);
          });
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  });
}

// 내 댓글 수정
function rewriteMyComment(myComment) {
  const myComments = document.getElementsByClassName("comments");

  Array.from(myComments).forEach((commen, index) => {
    commen.addEventListener("click", () => {
      if (checked == true) {
        return;
      }
      checked = true;
      // 취소 버튼 만들기
      const cancel = document.createElement("span");
      cancel.classList.add("cancel");
      cancel.textContent = `수정`;
      // 요소 생성
      const submit = document.createElement("button");
      submit.classList.add("Edit");
      submit.textContent = `수정확인`;
      const uId = document.createElement("p");
      const reComment = document.createElement("input");
      reComment.type = `text`;
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = `삭제`;
      const reCancel = document.createElement("button");
      reCancel.textContent = `수정취소`;
      reCancel.addEventListener("click", () => {
        window.location.reload();
      });

      axios
        .get(urlCoAll)
        .then((response) => {
          console.log("데이터: ", response.data);
          console.log(myComment.authority[0].authority);
          console.log(response.data[index].user.userId);
          console.log(myComment.userId);

          // 전체댓글에서 해당 게시글 댓글만 불러오기
          const postCoAll = response.data;
          const nowPostCoAll = postCoAll.filter(
            (postCoAll) => postCoAll.post.postId == parseInt(id, 10)
          );
          console.log(nowPostCoAll);

          if (
            myComment.authority[0].authority == "ROLE_ADMIN" ||
            nowPostCoAll[index].user.userId == myComment.userId
          ) {
            commen.style.cssText = `grid-template-columns: 1fr 5fr 2fr 1fr 1fr;`;
            commen.appendChild(cancel);
            commen.appendChild(deleteBtn);
            cancel.style.display = `block`;
            commentId = parseInt(commen.firstElementChild.textContent, 10);

            deleteBtn.addEventListener("click", () => {
              deleteMyComment(commentId);
            });

            cancel.addEventListener("click", () => {
              cancel.style.display = `none`;

              if (
                myComment.userId == nowPostCoAll[index].user.userId ||
                myComment.authority[0].authority == "ROLE_ADMIN"
              ) {
                commen.innerHTML = "";
                uId.textContent = nowPostCoAll[index].user.userId;

                commen.appendChild(uId);
                commen.appendChild(reComment);
                commen.appendChild(submit);
                commen.appendChild(reCancel);
              }
            });

            // data에 현재 userId 담기
            userId = myComment.userId;
            reComment.addEventListener("change", (el) => {
              comment = el.target.value;
            });

            submit.addEventListener("click", () => {
              const patchData = {
                commentContent: comment,
                userId: userId,
              };

              axios
                .patch(
                  `http://localhost:8080/comment/changecomment2/${commentId}`,
                  patchData,
                  { withCredentials: true }
                )
                .then((response) => {
                  console.log("데이터: ", response.data);
                  console.log("갱신 성공!!");
                  reComment.textContent = "";
                  commen.style.cssText = `grid-template-columns: 2fr 6fr 2fr;`;
                  window.location.reload();
                })
                .catch((error) => {
                  console.log("오류 발생: ", error);
                });
            });
          } else {
            console.log("수정할 권한 없음");
          }
        })
        .catch((error) => {
          console.log("오류 발생: ", error);
          console.log("갱신위한 전체댓글 출력 오류");
        });
    });
  });
}

// 본문 글 수정
function rewriteMainContent(data) {
  const sectionWrap = document.querySelector(".section-wrap");
  const editMain = document.querySelector(".edit-btn");
  const editTitle = document.querySelector(".postTitle");
  const editContent = document.querySelector(".postContent");

  // 수정할 input 태그 추가
  const editTInput = document.createElement("input");
  const editCInput = document.createElement("input");
  const patchPostBtn = document.createElement("button");
  const deletePostBtn = document.createElement("button");
  const cancelPostBtn = document.createElement("button");
  const likebox = document.querySelector(".like-box");
  editTInput.type = `text`;
  editCInput.type = `text`;
  editCInput.cssText = `width: 100%; minHeight: 600px;`;
  patchPostBtn.textContent = `변경하기`;
  patchPostBtn.style.display = `none`;
  deletePostBtn.textContent = `삭제하기`;
  deletePostBtn.style.display = `none`;
  cancelPostBtn.textContent = `수정취소`;
  cancelPostBtn.style.display = `none`;

  editMain.addEventListener("click", () => {
    // 글 작성자 Or 관리자가 아닐 경우 권한없음 모달 출력
    axios
      .get(urlCur)
      .then((response) => {
        console.log(response.data);
        console.log(data.user.userId);
        console.log(response.data.userId);
        console.log(response.data.authority[0].authority);
        if (
          !(
            data.user.userId == response.data.userId ||
            response.data.authority[0].authority == "ROLE_ADMIN"
          )
        ) {
          notAthorizon();
          return;
        }
      })
      .catch((error) => {
        console.log("권한없음 출력 오류");
      });

    editMain.style.display = `none`;
    patchPostBtn.style.display = `block`;
    deletePostBtn.style.display = `block`;
    cancelPostBtn.style.display = `block`;
    editTitle.firstElementChild.nextElementSibling.remove();
    editTitle.firstElementChild.nextElementSibling.remove();
    editTitle.firstElementChild.nextElementSibling.remove();
    editContent.textContent = "";
    sectionWrap.appendChild(patchPostBtn);
    sectionWrap.appendChild(deletePostBtn);
    sectionWrap.appendChild(cancelPostBtn);
    editTitle.appendChild(editTInput);
    editContent.appendChild(editCInput);
    likebox.appendChild(patchPostBtn);
    likebox.appendChild(deletePostBtn);
    likebox.appendChild(cancelPostBtn);
  });

  let patchTitle = "";
  let patchContent = "";
  editTInput.addEventListener("change", (e) => {
    patchTitle = e.target.value;
  });
  editCInput.addEventListener("change", (e) => {
    patchContent = e.target.value;
  });

  patchPostBtn.addEventListener("click", () => {
    const patchData = {
      postTitle: patchTitle,
      postContent: patchContent,
    };
    if (patchTitle == "") {
      notNullTitle();
      return;
    } else if (patchContent == "") {
      notNullContent();
      return;
    }
    patchThePost(patchData);
  });

  deletePostBtn.addEventListener("click", () => {
    deleteThePost();
  });

  cancelPostBtn.addEventListener("click", () => {
    window.location.reload();
  });
}
let findPostId = parseInt(id, 10);

// 본문 수정 함수
function patchThePost(patchData) {
  axios
    .patch(`http://localhost:8080/post/rewrite/${findPostId}`, patchData, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("데이터: ", response.data);
      console.log("갱신 성공!!!");
      window.location.reload();
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });
}

// 본문 삭제 함수
function deleteThePost() {
  axios
    .delete(`http://localhost:8080/post/delete/${findPostId}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("데이터: ", response.data);
      console.log("삭제성공");
      window.location.href = `board.html`;
    })
    .catch((error) => {
      console.log("오류 발생: ", error);
    });
}

// 댓글 삭제
function deleteMyComment(data) {
  axios
    .delete(`http://localhost:8080/comment/deletecomment/${data}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("데이터: ", response.data);
      console.log("댓글삭제 완료");
      window.location.reload();
    })
    .catch((error) => {
      console.log("삭제오류: ", error);
    });
}

// 추천완료 모달창 만들기
function thumbsUp() {
  cancletext.textContent = "추천하셨습니다.";
  modalcontentsSpan.textContent = "추천 완료";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
    window.location.reload();
  });
  $jQ(".btn-wrap").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  yes.addEventListener("click", () => {
    window.location.reload();
  });
  no.addEventListener("click", () => {
    window.location.reload();
  });
}

function notdupliThumbs() {
  cancletext.textContent = "중복추천 방지";
  modalcontentsSpan.textContent = "이미 추천하셨습니다";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
    window.location.reload();
  });

  // yes.addEventListener("click", () => {
  //   console.log("yes 반응 확인");
  //   window.location.reload();
  // });

  $jQ(".btn-wrap").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".yes").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  // no.addEventListener("click", () => {
  //   console.log("no 반응 확인");
  //   window.location.reload();
  // });
  $jQ(".no").click(function () {
    console.log("no 반응 확인2");
    window.location.reload();
  });
}

function notAthorizon() {
  cancletext.textContent = "수정권한 없음";
  modalcontentsSpan.textContent = "수정할 권한이 없습니다.";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
    window.location.reload();
  });

  $jQ(".btn-wrap").click(function () {
    console.log("yes 반응 확인");
    window.location.reload();
  });

  $jQ(".yes").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".no").click(function () {
    console.log("no 반응 확인2");
    window.location.reload();
  });
}

function notNullTitle() {
  cancletext.textContent = "본문작성 오류";
  modalcontentsSpan.textContent = "제목을 입력하지 않았습니다.";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
    window.location.reload();
  });

  $jQ(".btn-wrap").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".yes").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".no").click(function () {
    console.log("no 반응 확인2");
    window.location.reload();
  });
}

function notNullContent() {
  cancletext.textContent = "본문작성 오류";
  modalcontentsSpan.textContent = "본문을 입력하지 않았습니다.";
  $jQ(".alert").addClass("active");
  $jQ(".closebtn").click(function () {
    $jQ(".alert").removeClass("active");
    window.location.reload();
  });

  $jQ(".btn-wrap").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".yes").click(function () {
    console.log("yes 반응 확인2");
    window.location.reload();
  });

  $jQ(".no").click(function () {
    console.log("no 반응 확인2");
    window.location.reload();
  });
}
