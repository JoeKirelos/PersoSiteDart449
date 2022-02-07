const container = document.querySelector("#mainBody");
const htmlBody = document.querySelector('body');
const applyButton = document.querySelector("#myBtn");
const displayText = document.querySelector("#textDisplay")
let inputColor;

applyButton.addEventListener('click', colorChange);

function colorChange(){
    inputColor = document.querySelector("#myColor").value;
    if(inputColor === "black"){
        displayText.textContent = "black is not a color... try another one";
    }else{
        htmlBody.style.backgroundColor = inputColor;
        container.style.backgroundColor = inputColor;
        displayText.textContent = `the color is currently ${inputColor}`;
    }

}