//==========================variables===========================================


//==========================dom selectors
var myRange = document.getElementById("my-range");
const remaining = document.querySelector("#last-result");
var returnResult = document.getElementById("current-result");
const startOver = document.getElementById("new-starting");
var returnHistory = document.getElementById("result-history");
var chances = document.getElementById("guess-range")
//Selecting By Tag
var label = document.getElementsByTagName("label")[1];
//Input text feild
let getInputValue = document.getElementById("get-guess");

//==========================creating dom elements

const p = document.createElement("p");
let div = document.createElement("div");
let alertDiv = document.createElement("div");
var max = myRange.value;

var rand = getRandom(0, max);

//===================variables
var remain = parseInt(Math.ceil(Math.log(max))) + 1;
chances.max = remain;

var numOfGuess = 1;
//====================buttons
let submit = document.getElementById("submit-button");

let restartBtn = document.getElementById("reset-button");



//functionalities

function submitClick() {
  const guess = parseInt(getInputValue.value);
  validateGuess(guess);
}

//=======Input validation

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please Enter a valid Number");
  } else if (guess <= 0) {
    alert("Please enter number greater than or equal to 0");
  } else if (guess >= max) {
    alert("please Enter a value lesser than or equal to" +max);
  } else {
    displayGuesses(guess);
    checkGuess(guess);
  }
}

//=======Check the Guess is correct or not and closness

function checkGuess(guess) {
  let flag = 0;
  if (guess == rand) {
    alertDiv.innerText = "Awesome job, you got it!";
    alertDiv.classList.add("alert", "alert-success");
    returnResult.append(alertDiv);
    endGame();
    flag = 1;
  } else if (guess < rand) {
    alertDiv.innerText = "Your guess is low!";
    alertDiv.classList.add("alert", "alert-warning");
    returnResult.append(alertDiv);
  } else if (guess > rand) {
    alertDiv.innerText = "Your guess is high!";
    alertDiv.classList.add("alert", "alert-warning");
    returnResult.append(alertDiv);
  }

  // if Guess Crosses 5 and
  if (numOfGuess >= remain && flag == 0) {
    flag = 0;
    alertDiv.innerHTML = `You Lost the Match <br>Number was ${rand}`;
    alertDiv.classList.add("alert", "alert-lost");
    returnResult.append(alertDiv);
    //returnResult.innerHTML = `<div class="alert alert-lost">You Lost the Match <br>Number was ${rand}</div>`;
    endGame();
  }
}

//Pushing and Showing  History
//Updating No Of Guesses
function displayGuesses(guess) {
  restartBtn.disabled = false;
  getInputValue.value = "";
  div.classList.add("list-group-item");
  div.innerText += guess + "\n";
  returnHistory.appendChild(div);
  numOfGuess++;
  remaining.innerHTML = `${remain - numOfGuess} `;
  myRange.disabled = true;
  chances.style.visibility = "hidden"
}

//Ending Game Win Or Lose

function endGame() {
  getInputValue.value = "";
  getInputValue.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<button id="newGame" class="newGame" onclick="newStarting()">Start New Game</button>`;
  startOver.appendChild(p);
  restartBtn.disabled = true;

//   newGame();
  submit.disabled = true;
}

//After Loosing or Wining  => Starting a New Match

//Adding an Event Listner
// function newGame() {
//   newStarting
// }

//function according to event
function newStarting() {
  commonLinesInNewStartingResetFunction();
  startOver.removeChild(p);
}

//After Clicking Reset Button

function reset() {
    commonLinesInNewStartingResetFunction();
}

function commonLinesInNewStartingResetFunction() {
  const classes = ["alert", "alert-lost", "alert-success", "alert-warning"];
  classes.forEach((c) => {
    if (alertDiv.classList.contains(c)) {
      alertDiv.classList.remove(c);
    }
  });
  returnHistory.firstChild.innerText = "";
  returnHistory.removeChild(returnHistory.firstChild);
  rand = parseInt(Math.random() * 100 + 1);
  numOfGuess = 1;
  remain = parseInt(Math.ceil(Math.log(max))) + 1;
  chances.max = remain
  chances.value = remain
  returnResult.innerHTML = "";
  getInputValue.removeAttribute("disabled");
  restartBtn.disabled = true;
  label.click();
  myRange.disabled = false;
  chances.style.visibility = 'visible';
  myRange.value = 100;
  chances.value = 5;
  document.getElementById("value-box").innerHTML = "100";
  getInputValue.value = "";
  submit.disabled = true;
  reviseMax();
}

//Key Press Code

getInputValue.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    submit.click();
  }
});

//showing value in range value

function ShowValue(newVal) {
  document.getElementById("value-box").innerHTML = newVal;
  max = myRange.value;
  remain = parseInt(Math.ceil(Math.log(max))) + 1;
  chances.max = remain;
  remaining.innerHTML = `${remain - numOfGuess} `;
  rand = getRandom(0, max);
  document.getElementById("value-box").innerHTML = `<p>${max}</p>`;
  chances.max = remain
  chances.value = remain
}

function reviseMax() {
  max = myRange.value;
  remain = parseInt(Math.ceil(Math.log(max))) + 1;
  chances.max = remain
  chances.value = remain
  remaining.innerHTML = `${remain - numOfGuess} `;
}

//=====Geting Random number

function getRandom(_min, _max) {
  return parseInt(Math.random() * _max);
}

//Diabling the range

function disableRangeElement() {
  myRange.disabled = true;
}

function enableSubmitButton() {
  submit.disabled = false;
}


function ShowUpdatedChances(val){

    remaining.innerText = val - 1;
    remain = val;
}

function updateGuessRangeSlider(ele){
  document.getElementById('guessRange').value = ele
}
