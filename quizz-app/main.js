import "./style.css";
import { Questions } from "./question";

console.log(Questions);

const app = document.querySelector("#app");

const h1 = document.querySelector("h1");

const btn = document.querySelector("#btn");

btn.addEventListener("click", startQuizz);

function startQuizz(event) {
  console.log(event);
  event.stopPropagation();
  let currentQuestion = 0;
  let score = 0;

  console.log("First Element before", app.firstElementChild);
  displayQuestion(currentQuestion);

  console.log("First Element after", btn);

  function clean() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
    const progress = displayProgressBar(Questions.length, currentQuestion);
    app.appendChild(progress);
  }
  function displayProgressBar(max, value) {
    const progress = document.createElement("progress");
    progress.setAttribute("max", max);
    progress.setAttribute("value", value);

    return progress;
  }
  function displayQuestion(index) {
    clean();
    const question = Questions[index];
    if (!question) {
      displayFinishMessage();
      return;
    }
    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answerDiv = createAnswers(question.answers);
    app.appendChild(answerDiv);

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    app.appendChild(submitBtn);

    submitBtn.addEventListener("click", submit);
  }
  function disableAllAnswer() {
    const radios = document.querySelectorAll('input[type="radio"]');

    for (const radio of radios) {
      radio.disabled = true;
    }
  }
  function submit() {
    const answer = document.querySelector('input[name="answer"]:checked').value;
    console.log(answer);

    disableAllAnswer();
    const value = answer;
    const question = Questions[currentQuestion];
    const isCorrect = answer === question.correct;

    if (isCorrect) {
      score++;

      console.log("score", score);
    }
    showFeedback(isCorrect, question.correct, value);
    const feedback = getFeedBackMessage(isCorrect, question.correct);
    app.appendChild(feedback);
    displayNextQuestionButton();
  }
  function displayNextQuestionButton() {
    const TIMEOUT = 3000;
    let remingTimeOUt = TIMEOUT;

    app.querySelector("button").remove();

    const nextBtn = document.createElement("button");
    nextBtn.innerText = `Next ${remingTimeOUt / 1000}s`;
    app.appendChild(nextBtn);
    const interval = setInterval(() => {
      remingTimeOUt -= 1000;
      nextBtn.innerText = `Next ${remingTimeOUt / 1000}s`;
    }, 1000);

    const timeout = setTimeout(() => {
      handleNextQuestion();
    }, TIMEOUT);

    const handleNextQuestion = () => {
      currentQuestion++;
      clearInterval(interval);
      displayQuestion(currentQuestion);
    };

    nextBtn.addEventListener("click", () => {
      clearTimeout(timeout);
      handleNextQuestion();
    });
  }

  function createAnswers(answers) {
    const answerDiv = document.createElement("div");
    answerDiv.style.display = "flex";
    answerDiv.style.flexDirection = "column";

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answerDiv.appendChild(label);
    }
    return answerDiv;
  }

  function getTitleElement(text) {
    const title = document.createElement("h2");
    title.style.fontSize = "1.2rem";
    title.innerText = text;
    return title;
  }

  function getAnswerElement(text) {
    const label = document.createElement("label");
    label.innerText = text;
    const input = document.createElement("input");
    const id = text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
    input.id = id;
    label.htmlFor = id;
    input.setAttribute("type", "radio");
    input.setAttribute("name", "answer");
    input.setAttribute("value", text);
    label.appendChild(input);

    return label;
  }

  function showFeedback(isCorrect, correctAnswer, answer) {
    const correctAnswerId = correctAnswer
      .replaceAll(" ", "-")
      .replaceAll('"', "'")
      .toLowerCase();
    const correctAnswerElement = document.querySelector(
      `label[for="${correctAnswerId}"]`
    );

    const selectAnswerId = answer.replaceAll(" ", "-").toLowerCase();
    const selectAnswerElement = document.querySelector(
      `label[for="${selectAnswerId}"]`
    );

    if (isCorrect) {
      selectAnswerElement.classList.add("correct");
    } else {
      selectAnswerElement.classList.add("incorrect");
      correctAnswerElement.classList.add("correct");
    }
  }

  function getFeedBackMessage(isCorrect, correctAnswer) {
    const paragraph = document.createElement("p");
    paragraph.innerText = isCorrect
      ? "Correct! Well done!"
      : `Incorrect. The correct answer is ${correctAnswer}`;
    app.appendChild(paragraph);

    return paragraph;
  }

  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "You have completed the quiz!";
    const p = document.createElement("p");
    p.innerText = `Your score is ${score} out of ${Questions.length}`;
    app.appendChild(h1);
    app.appendChild(p);
  }
}
// let i = 0;

// btn.addEventListener("click", () => {
//   const p = document.querySelector("p") ?? document.createElement("p");
//   p.innerText = Questions[i].question;
//   app.insertBefore(p, btn);

//   i++;
//   if (i > Questions.length - 1) {
//     p.remove();
//     i = 0;
//   }
// });
