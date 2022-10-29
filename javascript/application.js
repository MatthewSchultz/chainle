var allWords = [];
var answers = [];

const fetchText = async function(uri) {

};

const start = async function() {
  let response = await fetch('wordlist/answers.txt');

  if (response.ok) { // if HTTP-status is 200-299
    // get the response body
    let text = await response.text();
    answers = text.split("\n");
    allWords = allWords.concat(answers);
  } else {
    alert("HTTP-Error: " + response.status);
  }

  let response2 = await fetch('wordlist/allowed.txt');

  if (response2.ok) { // if HTTP-status is 200-299
    // get the response body
    let text2 = await response2.text();
    allWords = allWords.concat(text2.split("\n"));
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

start();

var currentRow = 1;
var currentCol = 1;
var word = 'alpha';


const playCSSAnimationOn = function(element, animationClassName) {
  element.addEventListener('animationend', (event) => {
    if(`animate-${event.animationName}` == animationClassName) {
      element.classList.remove(animationClassName);
    }
  });
  element.classList.add(animationClassName);
};

const playCSSAnimationOnAll = function(querySelector, animationClassName) {
  let elements = document.querySelectorAll(querySelector);
  elements.forEach((element, i) => {
    playCSSAnimationOn(element, animationClassName);
  });
};

const setLetterCorrect = function(box) {

}

const handleKey = function(event) {
  event.preventDefault();
  playCSSAnimationOn(event.target, 'animate-pulse');
  let key = event.target.dataset.key;
  switch (key) {
    case 'Enter':
      if(currentCol == 6) {
        let guess = '';
        let currentRowElement = document.querySelector(`.row:nth-child(${currentRow})`);
        Array.from(currentRowElement.children).forEach((box, i) => {
          guess += box.innerHTML;
        });
        if(allWords.includes(guess)) {
          // It's a valid guess, reveal the clues:
          let parsedArray = Array.from(word);
          let safeIndexes = [];

          // First, check for greens:
          Array.from(currentRowElement.children).forEach((box, i) => {
            letter = box.innerHTML;
            if(parsedArray[i] == letter) {
              // Correct, in correct place:
              box.classList.add('correct');
              parsedArray[i] = null;
              safeIndexes.push(i);
            }
          });

          // Next, check for yellows:
          Array.from(currentRowElement.children).forEach((box, i) => {
            letter = box.innerHTML;
            matchIndex = parsedArray.indexOf(letter);
            if(!safeIndexes.includes(i) && matchIndex > -1) {
              // Correct, in incorrect place:
              box.classList.add('included');
              parsedArray[matchIndex] = null;
              safeIndexes.push(i);
            }
          });

          // Finally, color the rest grey:
          Array.from(currentRowElement.children).forEach((box, i) => {
            if(!safeIndexes.includes(i)) {
              box.classList.add('excluded');
            }
          });

          // Move to the next row:
          currentRow++;
          currentCol = 1;

          // Check for win/loss condition
          if(word == guess) {
            alert('You Won!');
          } else if (currentRow > 6) {
            alert(`The word was ${word}`);
          }
        } else {
          playCSSAnimationOn(currentRowElement, 'animate-shake');
        }
      }
      break;
    case 'Backspace':
      if(currentCol > 1) {
        // Remove Last Letter
        currentCol--;
        let currentBox = document.querySelector(`.row:nth-child(${currentRow}) .box:nth-child(${currentCol})`);
        playCSSAnimationOn(currentBox, 'animate-pulse');
        currentBox.innerHTML = '';
      }
      break;
    default:
      if(currentCol < 6) {
        // Enter Letter
        let currentBox = document.querySelector(`.row:nth-child(${currentRow}) .box:nth-child(${currentCol})`);
        currentBox.innerHTML = key;
        playCSSAnimationOn(currentBox, 'animate-pulse');
        currentCol++;
      }
      break;
  }
};

window.addEventListener('load', (event) => {
  let keys = document.querySelectorAll('.key');

  // Handle keypress by simply clicking the appropriate key:
  document.addEventListener('keydown', (event) => {
    console.log(`key press: ${event.key}`);
    let keyElement = document.querySelector(`[data-key="${event.key}"]`);
    if(keyElement) {
      keyElement.click();
    }
  });

  // Handle key clicks:
  keys.forEach((key, i) => {
    key.addEventListener('click', (event) => {
      handleKey(event);
    });
  });
});
