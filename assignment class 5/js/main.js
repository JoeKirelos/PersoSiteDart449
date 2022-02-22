const hamBtn = document.querySelector('#hamburgerBtn');
const hamMenu = document.querySelector('.hamMenu');
const firstPotato = document.querySelector('#firstPotato');
const barText = document.querySelector('#barText');
let potatoes = [];
const containter = document.querySelector('#contentContainer');
hamBtn.onclick =  function(){
    console.log("clicked");
    hamMenu.classList.toggle('hamExpanded');
}

firstPotato.onmouseenter = function(){
    firstPotato.classList.add('potatoHovered');
}
firstPotato.onmouseleave =function(){
    firstPotato.classList.remove('potatoHovered');
}

firstPotato.addEventListener('click',functionName);

function functionName(){
    let newPotato = document.createElement('img');
    newPotato.src = "assets/potato.png";
    newPotato.classList.add('potImg');
    containter.appendChild(newPotato);
    potatoes = document.querySelectorAll('.potImg');
    potatoes.forEach(element => {
        element.onmouseenter = function(){
            element.classList.add('potatoHovered');
        }
        element.onmouseleave =function(){
            element.classList.remove('potatoHovered');
        }
        element.addEventListener('click',functionName);
    });
    barText.textContent = `There are currently ${potatoes.length} potatoes`;
}













