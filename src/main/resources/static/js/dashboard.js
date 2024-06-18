const url = "http://localhost:8080/user/show";

const clock = document.querySelector(".clock");
const today = document.querySelector(".today");

let male = 0;
let female = 0;
let age1x = 0;
let age2x = 0;
let age3x = 0;
let age4x = 0;
let age5x = 0;

axios
  .get(url)
  .then((response) => {
    console.log("데이터: ", response.data);
    for (i = 0; i < response.data.length; i++) {
      if (response.data[i].gender == "MALE") {
        male = male + 1;
      } else {
        female = female + 1;
      }
    }
    console.log(male);
    console.log(female);
    for (i = 0; i < response.data.length; i++) {
      if (
        timeDiff(response.data[i].birthday) > 9 &&
        timeDiff(response.data[i].birthday) < 20
      ) {
        age1x = age1x + 1;
        console.log(timeDiff(response.data[i].birthday));
      } else if (
        timeDiff(response.data[i].birthday) > 19 &&
        timeDiff(response.data[i].birthday < 30)
      ) {
        age2x = age2x + 1;
        console.log(response.data[i].birthday);
        console.log(timeDiff(response.data[i].birthday));
      } else if (
        timeDiff(response.data[i].birthday) > 29 &&
        timeDiff(response.data[i].birthday) < 40
      ) {
        age3x = age3x + 1;
        // console.log(response.data[i].birthday);
      } else if (
        timeDiff(response.data[i].birthday) > 39 &&
        timeDiff(response.data[i].birthday) < 50
      ) {
        age4x = age4x + 1;
        // console.log(response.data[i].birthday);
      } else if (timeDiff(response.data[i].birthday) > 49) {
        age5x = age5x + 1;
        // console.log(response.data[i].birthday);
      }
    }
    console.log(age1x);
    console.log(age2x);
    console.log(age3x);
    console.log(age4x);
    console.log(age5x);
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 날짜 구하는 함수
function timeDiff(date) {
  date = Math.floor(new Date(date).getTime() / 1000);
  let nowDate = Math.floor(Date.now() / 1000);
  return Math.floor((nowDate - date) / (60 * 60 * 24));
}

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds} `;
}

getClock();
setInterval(getClock, 1000);

function getToday() {
  const todaydate = new Date();
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "긑요일",
    "토요일",
  ];
  const days_num = todaydate.getDay();

  const year = todaydate.getFullYear();
  const month = todaydate.getMonth() + 1;
  const date = todaydate.getDate();
  const day = days[days_num];

  today.innerText = `${year}년 ${month}월 ${date}일 ${day}`;
}
getToday();

console.log(male);
console.log(female);

const doughnutChartCtx = document
  .querySelector(`#doughnutChart`)
  .getContext(`2d`);
const doughnutChart = new Chart(doughnutChartCtx, {
  type: "doughnut",

  data: {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [`${male}`, `${female}`],
        backgroundColor: ["rgba(0, 209, 254 , 1)", "rgba(247, 186, 197, 1)"],
        borderColor: ["rgba(0 , 209 , 254, 1)", "rgba(247, 186, 197, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    cutout: "50%",
  },
});

const ctx = document.querySelector(`#myBarChart`).getContext(`2d`);
const myBarChart = new Chart(ctx, {
  type: `bar`,
  data: {
    labels: [`10대`, `20대`, `30대`, `40대`, `50대이상`],
    datasets: [
      {
        label: `Ages`,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
        ],
        borderColor: [
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
          `rgb(0, 209, 254)`,
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtzero: true,
      },
    },
  },
});

const lineExample = document.querySelector(`#lineExample`).getContext(`2d`);
const lineExampleChart = new Chart(lineExample, {
  type: `line`,
  data: {
    labels: [`1월`, `2월`, `3월`, `4월`, `5월`, `6월`],
    datasets: [
      {
        label: `Month of User Sign Up`,
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: `rgb(0, 209, 254)`,
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        beginAtzero: true,
      },
      y: {
        beginAtzero: true,
      },
    },
  },
});
