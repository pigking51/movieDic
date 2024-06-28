// const $jQ = jQuery.noConflict();

// $jQ(document).ready(function () {
//   $jQ(".FAQ-wrap > ul").each(function (index, item) {
//     $jQ(item).click(function () {
//       $jQ(this).next(".Answer").stop().slideToggle(500);
//     });
//   });
// });

// let question = "";
// let answer = "";

// // 데이터 불러오기
// const url = "http://localhost:8080/faq";
// function callFaq() {
//   axios
//     .get(url, { withCredentials: true })
//     .then((response) => {
//       console.log("FAQ 동작확인 :", response.data);
//       const faqWrap = document.querySelector(".FAQ-wrap");
//       faqWrap.firstElementChild;
//       faqWrap.lastElementChild;

//       question = response.data[0].question;
//       answer = response.data[0].answer;
//       faqWrap.firstElementChild.firstElementChild.nextElementSibling.textContent =
//         question;
//       faqWrap.firstElementChild.lastElementChild.textContent = "2023.03.05";

//       faqWrap.lastElementChild.firstElementChild.textContent = answer;

//       const answerWrap = document.querySelector(".Answer");
//       for (i = 1; i < response.data.length; i++) {
//         question = response.data[i].question;
//         answer = response.data[i].answer;
//         // question 생성
//         const ul = document.createElement("ul");
//         const QLiTag = document.createElement("li");
//         QLiTag.textContent = `Q`;
//         const questionTag = document.createElement("li");
//         questionTag.classList.add("question");
//         questionTag.textContent = question;
//         const dateTag = document.createElement("li");
//         dateTag.textContent = "2023.03.05";
//         ul.appendChild(QLiTag);
//         ul.appendChild(questionTag);
//         ul.appendChild(dateTag);
//         faqWrap.appendChild(ul);
//         // question 생성
//         const answerDiv = document.createElement("div");
//         const answerPTag = document.createElement("p");
//         answerDiv.classList.add("Answer");
//         answerPTag.textContent = answer;
//         answerDiv.appendChild(answerPTag);
//         faqWrap.appendChild(answerDiv);

//         ul.addEventListener("click", () => {
//           if (answerDiv.classList.contains("active")) {
//             return;
//           } else {
//             answerDiv.classList.add("active");
//           }
//         });
//       }
//     })
//     .catch((error) => {
//       console.log("오류발생: ", error);
//     });
// }

// callFaq();

document.addEventListener("DOMContentLoaded", () => {
  // 데이터베이스에서 FAQ 데이터를 가져오는 함수
  function fetchFAQs() {
    axios
      .get("http://localhost:8080/faq")
      .then((response) => {
        const faqs = response.data;
        renderFAQs(faqs);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }

  // FAQ 데이터를 HTML에 렌더링하는 함수
  function renderFAQs(faqs) {
    const faqWrap = document.querySelector(".FAQ-wrap");
    faqWrap.innerHTML = ""; // 기존 내용 초기화

    faqs.forEach((faq) => {
      const faqItem = document.createElement("div");
      faqItem.classList.add("FAQ-item");

      const question = document.createElement("div");
      question.classList.add("question");
      question.textContent = faq.question;
      question.addEventListener("click", () => {
        answer.classList.toggle("hidden");
      });

      const answer = document.createElement("div");
      answer.classList.add("answer", "hidden");
      answer.textContent = faq.answer;

      faqItem.appendChild(question);
      faqItem.appendChild(answer);
      faqWrap.appendChild(faqItem);
    });
  }

  // FAQ 데이터 불러오기
  fetchFAQs();
});
