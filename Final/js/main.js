//Portions of this code were adapted from https://github.com/codingstar-jason/3D-Book-Tutorial-Basic-CodingStar for the flipbook effect
//References to Doc Elements
//progression buttons
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

const book = document.querySelector("#book"); //book container
let papers = document.querySelectorAll(".paper"); //papers array (let is used as more papers can be added as needed)

//used to hide content(questions) on previous and following pages
// const leftHider = document.querySelector("#hideContentLeft");
// const rightHider = document.querySelector("#hideContentRight");

let contentArray = document.querySelectorAll(".contents"); //array to hold content(questions)
let bookPosition = 0; //book position 0 is closed, 1 is left page focused, 2 is right page focused

let surveyState = 0; // is used to track the survey flow chart
let contentIndex = 0; //is used to select the content to be shown on the following page

////////////////////////////init user variables//////////////////////////

let riskIndex = 0; //number to decide the level of isolation of the individual and the theme adjustments of the survey
let ageNumber = 1; //initiall age number

let studentStatus = false; //student status is initially false
let introvert = false; //introvert status is initially false
let inPersonClasses = 0; //value of 0 is irrelevant, -1 is remote classes for extroverts, -2 is inperson classes for introverts, 1 is inperson classes for extroverts, 2 is remote classes for introverts
let prePandJob = false; //binary, mostly used to determine upcoming questions
let essentialWorker = false; //binary, used to decide if the question of losing job due to pandemic is asked or not
let lostJob = 0; // 0 is no value or didn't have a job, -1 is if the person lost their job, 1 is if they didn't
let foundAnotherJob = 0; // follow up to losing job 1 if they found one, -1 if not
let retired = false; //binary to determine other questions
let workingFromHome = 0; //same value scheme as inperson classes
let socialCircle = 0; //multi values question, self rated 1-5
let livedAlone = true;
//living partners
let parents = 0;
let siblings = 0;
let relatives = 0;
let pets = 0; //also used if person indicates living alone
let roommates = 0;
let romanticPartner = 0;
let children = 0;

let isolation = 0; //same value scheme as social circle

////////////////////////////////////////////////////////////////////////

//////////////////////Doc elements used for survey//////////////////////
//age
let ageSlider = document.querySelector('#ageRange');
let ageOutput = document.querySelector('#ageText');
let ageImage = document.querySelector('#ageImage');
//student status
const studentYBtn = document.querySelector('#student-yes');
const studentNBtn = document.querySelector('#student-no');
//introvert vs. extrovert student
const studentIntExtRadio = document.querySelectorAll('input[name="introvert-extrovert-student"');
//remote classes
const remoteClasses = document.querySelectorAll('input[name="remote-classes"');
//introvert vs. extrovert
const radioIntExt = document.querySelectorAll('input[name="introvert-extrovert"');
//pre pandemic job
const prePandJobY = document.querySelector('#prePandJob-yes');
const prePandJobN = document.querySelector('#prePandJob-no');
//essential worker
const essWorkerY = document.querySelector('#essWorker-yes');
const essWorkerN = document.querySelector('#essWorker-no');
//lost Job
const lostJobY = document.querySelector('#lostJob-yes');
const lostJobN = document.querySelector('#lostJob-no');
//retired
const retiredY = document.querySelector('#retired-yes');
const retiredN = document.querySelector('#retired-no');
//foundNewJob
const foundNewJobY = document.querySelector('#foundNewJob-yes');
const foundNewJobN = document.querySelector('#foundNewJob-no');
//work From Home
const wfhRadio = document.querySelectorAll('input[name="working-from-home"');
//social circle
let socialStatus = document.querySelector('#socCircle');
//living situation
const livedAloneY = document.querySelector('#lived-alone-yes');
const livedAloneN = document.querySelector('#lived-alone-no');
//lived with others
let parentsSlider = document.querySelector('#parents');
let siblingsSlider = document.querySelector('#siblings');
let relativesSlider = document.querySelector('#relatives');
let petsSlider = document.querySelector('#pets');
let romPartnerSlider = document.querySelector('#romPartner');
let childrenSlider = document.querySelector('#children');
let roommatesSlider = document.querySelector('#roommates');
//lived with pets only
let petsAloneSlider = document.querySelector('#petsAlone');
//isolation
let isolationSlider = document.querySelector('#isolationSlider');
//lived with others underAge
let parentsUASlider = document.querySelector('#parentsUA');
let siblingsUASlider = document.querySelector('#siblingsUA');
let relativesUASlider = document.querySelector('#relativesUA');
let petsUASlider = document.querySelector('#petsUA');
////////////////////////////////////////////////////////////////////////

///////////////////////////////////////Event Listeners///////////////////////////////////////
//progression buttons
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
//age slider
ageSlider.addEventListener("mouseup", setAge);
//for yes/no buttons I chose to declare these functions anonymously as opposed to addEventListener(event,function) to avoid having to duplicate each function's decleration for a positive and negative, ultimately I realize that in both cases there is 2 instances of each function which is inefficient but I cannot seem to figure out how to pass an argument through addEventListner
//functions that rely on input elements such as sliders or radio buttons are declared at the bottom of the document as there was no need to declare them anonymously
//student buttons
studentYBtn.addEventListener("click", function(){
    studentStatus = true;
    console.log(studentStatus);
});
studentNBtn.addEventListener("click", function(){
    studentStatus = false;
    console.log(studentStatus);
});
//job before pandemic buttons
prePandJobN.addEventListener("click", function (){
    prePandJob = false;
    console.log(prePandJob);
});
prePandJobY.addEventListener("click", function (){
    prePandJob = true;
    console.log(prePandJob);
});
//essential worker buttons 
essWorkerN.addEventListener("click", function(){
    essentialWorker= false;
    console.log(essentialWorker);
});
essWorkerY.addEventListener("click", function(){
    essentialWorker= true;
    console.log(essentialWorker);
});
//lost Job due to Pandemic buttons
lostJobN.addEventListener("click", function(){
    lostJob= false;
    console.log(lostJob);
});
lostJobY.addEventListener("click", function(){
    lostJob= true;
    console.log(lostJob);
});
//retired buttons
retiredN.addEventListener("click", function(){
    retired= false;
    console.log(retired);
});
retiredY.addEventListener("click", function(){
    retired= true;
    console.log(retired);
});
//found another job buttons
foundNewJobN.addEventListener("click", function(){
    foundNewJob= -1;
    console.log(foundNewJob);
});
foundNewJobY.addEventListener("click", function(){
    foundNewJob= 1;
    console.log(foundNewJob);
});
//social circle slider
socialStatus.addEventListener("mouseup", setSocialStatus);
//living situation
livedAloneN.addEventListener("click", function(){
    livedAlone= false;
    console.log(livedAlone);
});
livedAloneY.addEventListener("click", function(){
    livedAlone= true;
    console.log(livedAlone);
});
//living partners sliders
parentsSlider.addEventListener("mouseup", setParents); 
siblingsSlider.addEventListener("mouseup", setSiblings); 
relativesSlider.addEventListener("mouseup", setRelatives); 
petsSlider.addEventListener("mouseup", setPets); 
romPartnerSlider.addEventListener("mouseup", setRomPartner);
childrenSlider.addEventListener("mouseup", setChildren); 
roommatesSlider.addEventListener("mouseup", setRoommates);
//pets while living alone slider
petsAloneSlider.addEventListener("mouseup", setPets);
//living partners underage
parentsUASlider.addEventListener("mouseup", setParents); 
siblingsUASlider.addEventListener("mouseup", setSiblings); 
relativesUASlider.addEventListener("mouseup", setRelatives); 
petsUASlider.addEventListener("mouseup", setPets); 
//isolationSlider
isolationSlider.addEventListener("mouseup", setIsolation);
// testBtn.addEventListener("click", assignContent);

// Business Logic
let currentPaper = 0;
let numOfPages = papers.length;

function goNextPage() {
    if(currentPaper < numOfPages) {
        if(bookPosition === 0){
            bookMovement(1);
            decideContent();
            papers[0].classList.add("flipped");
            papers[0].style.zIndex = 1;
            assignContentBack(contentIndex);
        }else if(bookPosition === 1){
            decideContent();
            moveBook();
            currentPaper++;
            papers[currentPaper].style.zIndex = currentPaper+1;
            assignContentFront(contentIndex);
        }else if(bookPosition ===2){
            if(currentPaper+1 === numOfPages){
                addPaper();
            }
            moveBook();
            decideContent();
            papers[currentPaper].classList.add("flipped");
            papers[currentPaper].style.zIndex = currentPaper+1;
            assignContentBack(contentIndex);
        }
        console.log(surveyState);
    }
}


function goPrevPage() {
    if(currentPaper >= 0) {
        if(bookPosition === 3 &&bookEnded === true){
            bookEnded = false;
            // undoContent();
            bookMovement(2);
            papers[currentPaper].classList.remove("flipped");
        }else if(bookPosition === 1){
            if(currentPaper <= 0){
                bookMovement(3);
            }else{
                moveBook();
            }
            // undoContent();
            papers[currentPaper].classList.remove("flipped");
            papers[currentPaper].style.zIndex = numOfPages-currentPaper;
        }else if(bookPosition === 2){
            // undoContent();
            moveBook();
            papers[currentPaper].style.zIndex = numOfPages-currentPaper;
            currentPaper--;
        }
        console.log(currentPaper);
    }  
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
        case 3:
            book.style.transform = "translateX(0%)";
            // hide(rightHider);
            // hide(leftHider);
            bookPosition = 0;
            break;
        case 1:
            book.style.transform = "translateX(100%)";
            // hide(leftHider);
            // show(rightHider);
            bookPosition = 1;
            break;
        case 2:
            book.style.transform = "translateX(0%)";
            // hide(rightHider);
            // show(leftHider);
            bookPosition = 2;
            break;
        case 0:
            book.style.transform = "translateX(100%)";
            // hide(rightHider);
            // hide(leftHider);
            bookPosition = 3;
            break;
        default:
            break;
    }
}

// function hide(page){
//     page.style.visibility ="hidden";
// }

// function show(page){
//     page.style.visibility = "visible";
// }


function assignContentFront(num){
    // console.log(numOfPages);
    pageContent = contentArray[num];
    // pageContent = Array.from(contentArray).find(x => x.id === `content${questionIndex}`); //can probably just be contentArray[questionIndex]
    // console.log(pageContent);
    let currentPage = papers[currentPaper].querySelector(":scope > .front");
    currentPaperContent = currentPage.querySelector(":scope > .front-content");
    currentPaperContent.appendChild(pageContent);
    pageContent.classList.remove("hid", "fixed-Bottom");
}

function assignContentBack(num){
    // console.log(numOfPages);
    pageContent = contentArray[num];
    // pageContent = Array.from(contentArray).find(x => x.id === `content${questionIndex}`); //can probably just be contentArray[questionIndex]
    // console.log(pageContent);
    let currentPage = papers[currentPaper].querySelector(":scope > .back");
    currentPaperContent = currentPage.querySelector(":scope > .back-content");
    currentPaperContent.appendChild(pageContent);
    pageContent.classList.remove("hid", "fixed-Bottom");
}

function decideContent(){
    switch(surveyState){
        case 2:
            if(ageNumber<13){
                contentIndex = 3;
                surveyState = 3;
            }else if(ageNumber<18){
                contentIndex = 4;
                surveyState = 4;
            }else if(ageNumber<28){
                contentIndex = 7;
                surveyState = 16;
            }else if(ageNumber<60){
                contentIndex = 7;
                surveyState = 17;
            }else if(ageNumber>=60){
                contentIndex = 7;
                surveyState = 18;
            }
            break;
        case 3:
            contentIndex = 20;
            break; //end
        case 4:
            if(studentStatus){
                contentIndex = 5;
                surveyState = 5;
            }else{
                contentIndex = 8;
                surveyState = 7;
            }
            break;
        case 6:
            contentIndex = 8;
            surveyState = 7;
            break;
        case 7:
            if(prePandJob){
                contentIndex = 10;
                surveyState = 13;
            }else{
                contentIndex = 14;
                surveyState = 26;
            }
            break;
        case 9:
            if(livedAlone){
                contentIndex = 17;
                surveyState = 11;
            }else{
                contentIndex = 16;
                surveyState = 10;
            }
            break;
        case 10:
            contentIndex = 18;
            surveyState = 12;
            break;
        case 12:
            contentIndex = 20;
            break; //end
        case 13:
            if(lostJob){
                contentIndex = 12;
                surveyState = 15;
            }else{
                contentIndex = 13;
                surveyState = 14;
            }
            break;
        case 14:
            if(ageNumber<18){
                contentIndex = 14;
                surveyState = 26;
            }else{
                contentIndex = 14;
                surveyState = 8;
            }
            break;
        case 15:
            if(foundAnotherJob === 1){
                contentIndex = 13;
                surveyState = 16;
            }else{
                contentIndex = 14;
                surveyState = 26;
            }
            break;
        case 16:
            contentIndex = 4;
            surveyState = 19;
            break;
        case 17:
            contentIndex = 8;
            surveyState = 21;
            break;
        case 18:
            contentIndex = 11;
            surveyState = 25;
            break;
        case 19:
            if(studentStatus){
                contentIndex = 6;
                surveyState = 20;
            }else{
                contentIndex = 8;
                surveyState = 21;
            }
            break;
        case 20:
            contentIndex = 8;
            surveyState = 21;
            break;
        case 21:
            if(prePandJob){
                contentIndex = 9;
                surveyState = 22;
            }else{
                contentIndex = 14;
                surveyState = 8;
            }
            break;
        case 22:
            if(essentialWorker){
                contentIndex = 13;
                surveyState = 14;
            }else{
                contentIndex = 10;
                surveyState = 23;
            }
            break;
        case 23:
            if(lostJob){
                contentIndex = 12;
                surveyState = 24;
            }else {
                contentIndex = 13;
                surveyState = 14;
            }
            break;
        case 24:
            if(foundAnotherJob=== 1){
                contentIndex = 13;
                surveyState = 14;
            }else {
                contentIndex = 14;
                surveyState = 8;
            }
            break;
        case 25:
            if(retired){
                contentIndex = 14;
                surveyState = 8;
            }else {
                contentIndex = 8;
                surveyState = 21;
            }
            break;
        case 26:
            contentIndex = 19;
            surveyState = 27;
            break;
        case 27:
            contentIndex = 18;
            surveyState = 12;
            break;
        default:
            contentIndex++;
            surveyState++;
            break;
    }
}

// function undoContent(){
//     switch(contentIndex){
//         case 0:
//             break;
//         default:
//             contentIndex--;
//             break;
//     }
// }

function addPaper(){
    let newPaper = document.createElement('div');
    newPaper.classList.add('paper');

    let newPaperFront = document.createElement('div');
    newPaperFront.classList.add('front');

    let newPaperFrontContent = document.createElement('div');
    newPaperFrontContent.classList.add('front-content');

    let newPaperBack = document.createElement('div');
    newPaperBack.classList.add('back');

    let newPaperBackContent = document.createElement('div');
    newPaperBackContent.classList.add('back-content');

    newPaperFront.appendChild(newPaperFrontContent);
    newPaperBack.appendChild(newPaperBackContent);

    newPaper.appendChild(newPaperFront);
    newPaper.appendChild(newPaperBack);

    book.appendChild(newPaper);

    papers = document.querySelectorAll('.paper');
    numOfPages = papers.length;
}

function setAge(){
    ageNumber = ageSlider.value;
    ageOutput.innerHTML = `I am ${ageNumber} years old`;
    if(ageNumber< 13){
        ageImage.src = "assets/images/Age-A-PH.png"
    }else if (ageNumber < 18){
        ageImage.src = "assets/images/Age-B-PH.png"
    }else if (ageNumber < 28){
        ageImage.src = "assets/images/Age-C-PH.png"
    }else if (ageNumber < 60){
        ageImage.src = "assets/images/Age-D-PH.png"
    }else if (ageNumber >= 60){
        ageImage.src = "assets/images/Age-E-PH.png"
    }
}



function setParents(){
    if(ageNumber< 18){
        parents = parentsUASlider.value;
    }else{
        parents = parentsSlider.value;
    }
    console.log(parents);
}
 
function setSiblings(){
    if(ageNumber< 18){
        siblings = siblingsUASlider.value;
    }else{
        siblings = siblingsSlider.value;
    }
    console.log(siblings);
}
 
function setRelatives(){
    if(ageNumber< 18){
        relatives = relativesUASlider.value;
    }else{
        relatives = relativesSlider.value;
    }
    console.log(relatives);
}
 
function setPets(){
    if(ageNumber< 18){
        pets = petsUASlider.value;
    }else if(livedAlone){
        pets = petsAloneSlider.value;
    }else{
        pets = petsSlider.value;
    }
    console.log(pets);
}
 
function setRomPartner(){
    romanticPartner = romPartnerSlider.value;
    console.log(romanticPartner);
}

function setChildren(){
    children = childrenSlider.value;
    console.log(children);
}
 
function setRoommates(){
    roommates = roommatesSlider.value;
    console.log(roommates);
}

function setIsolation(){
    isolation = isolationSlider.value;
    console.log(isolation);
}

function setSocialStatus(){
    socialCircle = socialStatus.value;
    console.log(socialCircle);
}