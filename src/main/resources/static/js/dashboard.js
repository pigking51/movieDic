@ -1,254 +1,151 @@
const url = "http://localhost:8080/user/show";

const clock = document.querySelector(".clock");
const clock = document.querySelector(".clock"); 
const today = document.querySelector(".today");

// 변수 선언(통계용)
let male = 0;
let female = 0;
let age1x = 0;
let age2x = 0;
let age3x = 0;
let age4x = 0;
let age5x = 0;
let jan = 0;
let feb = 0;
let mar = 0;
let apr = 0;
let may = 0;
let jun = 0;

// 변수 선언(관리자 표시용)
let adminId = "";
let authority = "";
let email = "";

// 관리자 정보 적용

let adminD = [];

axios
  .get("http://localhost:8080/user/current")
  .then((response) => {
    console.log("데이터: ", response.data);
    adminD.push(response.data.authority[0]);
    adminD.push(response.data.userId);
    if (adminD[0].authority != "ROLE_ADMIN") {
      alert("관리자 전용 페이지입니다!!!");
      window.history.go(-1);
    }

    axios
      .get(url)
      .then((response) => {
        console.log("데이터: ", response.data);

        // 성별 통계
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].gender == "MALE") {
            male = male + 1;
          } else {
            female = female + 1;
          }
        }

        // 만나이 통계
        for (i = 0; i < response.data.length; i++) {
          if (
            timeDiff(response.data[i].birthday) > 9 &&
            timeDiff(response.data[i].birthday) < 20
          ) {
            age1x = age1x + 1;
          } else if (
            timeDiff(response.data[i].birthday) > 19 &&
            timeDiff(response.data[i].birthday) < 30
          ) {
            age2x = age2x + 1;
          } else if (
            timeDiff(response.data[i].birthday) > 29 &&
            timeDiff(response.data[i].birthday) < 40
          ) {
            age3x = age3x + 1;
          } else if (
            timeDiff(response.data[i].birthday) > 39 &&
            timeDiff(response.data[i].birthday) < 50
          ) {
            age4x = age4x + 1;
          } else if (timeDiff(response.data[i].birthday) > 49) {
            age5x = age5x + 1;
          }
        }

        // 월별 가입자 통계
        for (i = 0; i < response.data.length; i++) {
          console.log(response.data[i].dateJoined.substr(5, 2));
          if (response.data[i].dateJoined.substr(5, 2) == "01") {
            jan = jan + 1;
          } else if (response.data[i].dateJoined.substr(5, 2) == "02") {
            feb = feb + 1;
          } else if (response.data[i].dateJoined.substr(5, 2) == "03") {
            mar = mar + 1;
          } else if (response.data[i].dateJoined.substr(5, 2) == "04") {
            apr = apr + 1;
          } else if (response.data[i].dateJoined.substr(5, 2) == "05") {
            may = may + 1;
          } else if (response.data[i].dateJoined.substr(5, 2) == "06") {
            jun = jun + 1;
          }
        }
function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

        // 차트 부분

        const doughnutChartCtx = document
          .querySelector(`#doughnutChart`)
          .getContext(`2d`);
        const doughnutChart = new Chart(doughnutChartCtx, {
          type: "doughnut",

          data: {
            labels: ["Male", "Female"],
            datasets: [
              {
                data: [male, female],
                backgroundColor: [
                  "rgba(0, 209, 254 , 1)",
                  "rgba(247, 186, 197, 1)",
                ],
                borderColor: [
                  "rgba(0 , 209 , 254, 1)",
                  "rgba(247, 186, 197, 1)",
                ],
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
                data: [age1x, age2x, age3x, age4x, age5x, 3],
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
                height: 150,
                beginAtzero: true,
              },
            },
          },
        });

        const lineExample = document
          .querySelector(`#lineExample`)
          .getContext(`2d`);
        const lineExampleChart = new Chart(lineExample, {
          type: `line`,
          data: {
            labels: [`1월`, `2월`, `3월`, `4월`, `5월`, `6월`],
            datasets: [
              {
                label: `Month of User Sign Up`,
                data: [jan, feb, mar, apr, may, jun, 40],
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
        for (i = 0; i < response.data.length; i++) {
          if (adminD[1] == response.data[i].userId) {
            adminD.push(response.data[i].email);
          }
        }
        document.querySelector(".adminId").textContent =
          "Admin-Id : " + adminD[1];
        document.querySelector(".adAuthority").textContent =
          "Authority : " + adminD[0].authority;
        document.querySelector(".adEmail").textContent =
          "E-mail : " + adminD[2];
      })
      .catch((error) => {
        console.log("오류 발생: ", error);
      });
  })
  .catch((error) => {
    console.log("오류 발생: ", error);
  });

// 날짜 구하는 함수
function timeDiff(date) {
  date = Math.floor(new Date(date).getTime() / 1000);
  let nowDate = Math.floor(Date.now() / 1000);
  return Math.floor((nowDate - date) / (60 * 60 * 24 * 60 * 6));
    clock.innerText = `${hours}:${minutes}:${seconds} `;
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

    const todaydate = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '긑요일', '토요일'];
    const days_num = todaydate.getDay();

    const year = todaydate.getFullYear();
    const month = todaydate.getMonth() + 1;
    const date = todaydate.getDate();
    const day = days[days_num];


    today.innerText = `${year}년 ${month}월 ${date}일 ${day}`;

}
getToday();

const doughnutChartCtx = document.querySelector(`#doughnutChart`).getContext(`2d`);
const doughnutChart = new Chart(doughnutChartCtx, {
    type: 'doughnut',
    data: {
        labels: ['Male', 'Female'],
        datasets: [{
            data: [60, 40],
            backgroundColor: [
                'rgba(0, 209, 254 , 1)',
                'rgba(247, 186, 197, 1)'
            ],
            borderColor: [
                'rgba(0 , 209 , 254, 1)',
                'rgba(247, 186, 197, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        cutout: '50%'
    }
});

const ctx = document.querySelector(`#myBarChart`).getContext(`2d`);
const myBarChart = new Chart(ctx, {
    type: `bar`,
    data: {
        labels:[`10대`,`20대`,`30대`,`40대`,`50대이상`],
        datasets: [{
            label: `Ages`,
            data: [12,19,3,5,2,3],
            backgroundColor: [
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`
            ],
            borderColor:[
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`
            ],
            borderWidth : 1
        }]
    },
    options: {
        scales:{
            y:{
                beginAtzero:true
            }
        }
    }
});

const lineExample = document.querySelector(`#lineExample`).getContext(`2d`);
const lineExampleChart = new Chart(lineExample, {
    type: `line`,
    data : {
        labels : [`1월`,`2월`,`3월`,`4월`,`5월`,`6월`],
        datasets: [{
            label : `Month of User Sign Up`,
            data : [65,59,80,81,56,55,40],
            borderColor: `rgb(0, 209, 254)`,
            borderWidth: 1,
            fill:false
        }]
    },
    options: {
        scales: {
            x: {
                beginAtzero:true
            },
            y: {
                beginAtzero:true
            }
        }
    }
});

const ctx2 = document.querySelector(`#myBarChart2`).getContext(`2d`);
const myBarChart2 = new Chart(ctx2, {
    type: `bar`,
    data: {
        labels:[`1st`,`2nd`,`3tr`,`4th`,`5th`],
        datasets: [{
            label: `Recently registered`,
            data: [19,12,9,7,3,2],
            backgroundColor: [
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`
            ],
            borderColor:[
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`,
                `rgb(0, 209, 254)`
            ],
            borderWidth : 1
        }]
    },
    options: {
        indexAxis : 'y',
        scales:{
            y:{
                beginAtzero:true
            }
        }
    }
});