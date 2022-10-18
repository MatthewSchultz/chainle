const start = async function() {
  let response = await fetch('wordlist/wordle-answers-alphabetical.txt');

  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let text = await response.text();
    console.log(text);
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

start();
