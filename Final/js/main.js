// Portions of this code were acquired and adapted from https://github.com/codingstar-jason/3D-Book-Tutorial-Basic-CodingStar for the flipbook effect
// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

let papers = document.querySelectorAll(".paper");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

const leftHider = document.querySelector("#hideContentLeft");
const rightHider = document.querySelector("#hideContentRight");

const testBtn = document.querySelector("#test-btn");

let contentArray = document.querySelectorAll(".contents");
const firstPageContent = document.querySelector("#firstPage");

let bookOpen = false;
let bookEnded = false;
let bookPosition = 0; //book position 0 is closed, 1 is left page focused, 2 is right page focused

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

testBtn.addEventListener("click", assignContent);

// Business Logic
let currentPaper = 0;
let numOfPages = papers.length;
let maxLocation = numOfPages;



function goNextPage() {
    if(currentPaper < maxLocation) {
        if(bookPosition === 0 &&bookEnded === false){
            bookMovement(1);
            papers[0].classList.add("flipped");
            papers[0].style.zIndex = 1;
        }else if(bookPosition === 1){
                moveBook();
                currentPaper++;
        }else if(bookPosition ===2){
            if(currentPaper+1 === maxLocation){
                bookMovement(0);
                bookEnded = true;
            }else{
                moveBook();
            }
            papers[currentPaper].classList.add("flipped");
            papers[currentPaper].style.zIndex = currentPaper+1;
        }
    console.log(currentPaper);
    }
}


function goPrevPage() {
//     if(currentPaper > 0) {
//         switch(currentPaper) {
//             case 2:
//                 closeBook(true);
//                 paper1.classList.remove("flipped");
//                 paper1.style.zIndex = 3;
//                 hide(rightHider);
//                 break;
//             case 3:
//                 book.style.transform = "translateX(100%)";
//                 hide(leftHider);
//                 show(rightHider);
//                 break;
//             case 4:
//                 paper2.classList.remove("flipped");
//                 paper2.style.zIndex = 2;
//                 book.style.transform = "translateX(0%)";
//                 show(leftHider);
//                 hide(rightHider);
//                 break;
//             case 5:
//                 book.style.transform = "translateX(100%)";
//                 hide(leftHider);
//                 show(rightHider);
//                 break;
//             case 6:
//                 openBook();
//                 paper3.classList.remove("flipped");
//                 paper3.style.zIndex = 1;
//                 show(leftHider);
//                 break;
//             default:
//                 throw new Error("unkown state");
//         }

//         currentPaper--;
//     }
}

function moveBook(){
    // console.log(bookPosition);
    if(bookPosition===1){
        bookPosition = 2;
        bookMovement(bookPosition);
    }else if(bookPosition === 2){
        bookPosition = 1;
        bookMovement(bookPosition);
    }
}

function bookMovement(bookPos){
    switch(bookPos){
        case 0:
            book.style.transform = "translateX(100%)";
            hide(rightHider);
            hide(leftHider);
            bookPosition = 0;
            break;
        case 1:
            book.style.transform = "translateX(100%)";
            hide(leftHider);
            show(rightHider);
            bookPosition = 1;
            break;
        case 2:
            book.style.transform = "translateX(0%)";
            hide(rightHider);
            show(leftHider);
            bookPosition = 2;
            break;
        default:
            break;
    }
}

function hide(page){
    page.style.visibility ="hidden";
}

function show(page){
    page.style.visibility = "visible";
}


function assignContent(){
    console.log(numOfPages);
    // pageContent = Array.from(contentArray).find(x => x.id === `content${questionIndex}`); //can probably just be contentArray[questionIndex]
    // // console.log(pageContent);
    // currentPaper = paper1.querySelector(":scope > .front");
    // currentPaperContent = currentPaper.querySelector(":scope > .front-content");
    // currentPaperContent.appendChild(pageContent);
    // pageContent.classList.remove("hid", "fixed-Bottom");
}





// function openBook() {
//     book.style.transform = "translateX(100%)";
//     bookOpen = true;
//     // prevBtn.style.transform = "translateX(-180px)";
//     // nextBtn.style.transform = "translateX(180px)";
// }

// function closeBook() {
//     if(bookEnded){
//         book.style.transform = "translateX(0%)";
//     }else {
//     book.style.transform = "translateX(100%)";
//     }
//     bookOpen = false;
    
//     // prevBtn.style.transform = "translateX(0px)";
//     // nextBtn.style.transform = "translateX(0px)";
// }