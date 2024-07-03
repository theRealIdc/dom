import "./style.css";

const app = document.querySelector("#app");
const colors = ["red", "green", "blue"];

// app.innerHTML = '<div class="box">Hello World Ehhhh</div>';
// let i = 0;
// setInterval(() => {
//   app.style.background = colors[i];
//   i++;
//   if (i > colors.length - 1) {
//     i = 0;
//   }
// }, 2000);
// setTimeout(() => {
//   app.style.background = "blue";
// }, 3000);
console.log(app);

const div = document.createElement("div");
const h1 = document.createElement("h1");
h1.textContent = "<p>Hello World</p>";
div.appendChild(h1);

console.log(div);

console.log("BEFORE", {
  parent: div.parentElement,
  content: div.innerHTML,
});

app.appendChild(div);

console.log("AFTER", {
  parent: div.parentElement,
  content: div.innerHTML,
});
