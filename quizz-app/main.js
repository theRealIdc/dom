import "./style.css";

const app = document.querySelector("#app");
const colors = ["red", "green", "blue"];

let i = 0;
setInterval(() => {
  app.style.background = colors[i];
  i++;
  if (i > colors.length - 1) {
    i = 0;
  }
}, 2000);
// setTimeout(() => {
//   app.style.background = "blue";
// }, 3000);
console.log(app);
