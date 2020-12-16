let input = document.querySelector("#txt-input");
let btnTranslate = document.querySelector("#btn-translate");
let output = document.querySelector("#txt-output");

function constructUrl(text) {
    return  'https://api.funtranslations.com/translate/morse.json' + "?" + "text=" + text
  }

  function addText(text){
    output.innerHTML = "";
    let index=0;
    let intr = setInterval(myfun, 2000)
    function myfun(){
        output.innerHTML+= text[index++];
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
    addText(inputText)
    // fetch(constructUrl(inputText))
    // .then(response => response.json())
    // .then(json => output.innerText = json.contents.translated)
    // .catch(callBackErrorHandler)
 })