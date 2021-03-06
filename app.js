let input = document.querySelector("#txt-input");
let btnTranslate = document.querySelector("#btn-translate");
let output = document.querySelector("#txt-output");
let clipboardBtn = document.querySelector('.fas');
let twitterBtn = document.querySelector('.div-twitter');


function constructUrl(text, usage="api") {
    if(usage==="api"){
        return 'https://api.funtranslations.com/translate/morse.json' + "?" + "text=" + text;
    } 
    else if(usage=="twitter"){
        text = text +  "Translated with ❤ created by @sohamsshah";
        let url_param = "https://morsedecipher.netlify.app/";
        return `https://twitter.com/intent/tweet?text=${text}&url=${url_param}&hashtags=programming,python`;
    }  
}

function resultText(text) {
    output.innerHTML = "";
    btnTranslate.innerHTML = "translating...";
    let index = 0;
    let intr = setInterval(myfun, 2000)

    function myfun() {
        randomJump = Math.floor((Math.random() * (text.length / 2)) + 1);
        if (index + randomJump >= text.length) {
            randomJump = text.length - index
        }
        output.innerHTML += text.slice(index, index + randomJump);
        index += randomJump
        if (index == text.length) {
            btnTranslate.innerHTML = "translate";
            clearInterval(intr);
        }
    }

}

function callBackErrorHandler() {
    console.log("Something went wrong with the api call")
    output.innerHTML = "... --- -- . - .... .. -. --.     .-- . -. -     .-- .-. --- -. --.         - .-. -.--     .- --. .- .. -.     .- ..-. - . .-.     ... --- -- .     - .. -- . .-.-.-"
}

btnTranslate.addEventListener("click", () => {
    let inputText = input.value;
    console.log("Input text is " + inputText)
    fetch(constructUrl(inputText))
        .then(response => response.json())
        .then(json => resultText(json.contents.translated))
        .catch(callBackErrorHandler)

});

clipboardBtn.addEventListener("click", () => {
    let copyText = output;
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");

});


twitterBtn.addEventListener("click", () => {
    let text=output.innerHTML;
    let url = constructUrl(text, "twitter");
    window.open( url, "_blank"); 
});