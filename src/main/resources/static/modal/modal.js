const modalwrap = document.createElement("div");
const canclewrap = document.createElement("div");
const cancletext = document.createElement("span");
const modalcontents = document.createElement("div");
const modalcontentsSpan = document.createElement("span");
const xbtn = document.createElement("button");
const btnwrap = document.createElement("div");
const btnwrapA = document.createElement("a");
const btnwrapA2 = document.createElement("a");
const btnwrapP = document.createElement("p");
const btnwrapP2 = document.createElement("p");

modalwrap.appendChild(canclewrap);
canclewrap.appendChild(cancletext);
canclewrap.appendChild(xbtn);
modalwrap.appendChild(modalcontents);
modalcontents.appendChild(modalcontentsSpan);
modalcontents.appendChild(btnwrap);
btnwrap.appendChild(btnwrapA);
btnwrap.appendChild(btnwrapA2);
btnwrapA.appendChild(btnwrapP);
btnwrapA2.appendChild(btnwrapP2);

canclewrap.classList.add("cancle-wrap");
modalwrap.classList.add("modal-wrap");
modalcontents.classList.add("modal-contents");
btnwrap.classList.add("btn-wrap");

cancletext.textContent = "로그인 오류";
xbtn.textContent = "x";
modalcontentsSpan.textContent = "ID와 비밀번호를 입력하세요!";
btnwrapP.textContent = "확인";
btnwrapP2.textContent = "취소";
