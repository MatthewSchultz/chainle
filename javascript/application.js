var currentRow = 6;
var currentCol = 1;

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

const handleKey = function(event) {
  event.preventDefault();
  playCSSAnimationOn(event.target, 'animate-pulse');
  let key = event.target.dataset.key;
  switch (key) {
    case 'Enter':
      if(currentCol == 6) {
        // Submit Guess
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

const start = async function() {
  let response = await fetch('wordlist/answers.txt');

  if (response.ok) { // if HTTP-status is 200-299
    // get the response body
    let text = await response.text();
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

start();

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
