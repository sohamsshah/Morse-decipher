let input = document.querySelector("#txt-input");
let btnTranslate = document.querySelector("#btn-translate");
let output = document.querySelector("#txt-output");

function constructUrl(text) {
    return  'https://api.funtranslations.com/translate/morse.json' + "?" + "text=" + text
  }

  function resultText(text){
    output.innerHTML = "";
    let index=0;
    let intr = setInterval(myfun, 2000)
    function myfun(){
        randomJump = Math.floor((Math.random() * (text.length/2)) + 1);
        if(index+randomJump>=text.length){
            randomJump=text.length - index
        }
        output.innerHTML+= text.slice(index, index+randomJump);
        index+=randomJump
        if(index == text.length) clearInterval(intr);
    }

  }

  function callBackErrorHandler() {
    console.log("Something went wrong with the api call")
    alert("Sorry, something went wrong with the api call")
 }

 btnTranslate.addEventListener("click", () => {
    let inputText = input.value; 
    console.log("Input text is " + inputText)
    fetch(constructUrl(inputText))
    .then(response => response.json())
    .then(json => resultText(json.contents.translated))
    .catch(callBackErrorHandler)
 })