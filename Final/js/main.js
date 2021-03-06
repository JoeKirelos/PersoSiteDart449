//Portions of this code were adapted from https://github.com/codingstar-jason/3D-Book-Tutorial-Basic-CodingStar for the flipbook effect
//Note: this code went through a lot of modification and debugging, in some cases some of the comments would refer to functionality that was later removed or moved elsewhere, please disregard those
//References to Doc Elements
//progression buttons
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

const book = document.querySelector("#book"); //book container
let papers = document.querySelectorAll(".paper"); //papers array (let is used as more papers can be added as needed)

const contentReserve = document.querySelector('#contentReserve');//off screen container that holds content not currently being used
let contentArray = document.querySelectorAll(".contents"); //array to hold content(questions)
let contentIndex = 0; //is used to select the content to be shown on the following page
let surveyState = 0; // is used to track the survey flow chart

////////////////////////////init user variables//////////////////////////
let userName;
let riskIndex = 0; //number to decide the level of isolation of the individual and the theme adjustments of the survey
let imageMod = 1; //image mod is used to change which version of the image is displayed, 1 is normal 2 is at mid level stress, 3 is at high level stress
let ageNumber = 1; //initiall age number
let studentStatus = false; //student status is initially false
let introvert = false; //introvert status is initially false
let remoteClassesStat = 0; //value of 0 is for non students, -1 is inperson classes, 1 is remote classes
let prePandJob = false; //binary, mostly used to determine upcoming questions
let essentialWorker = false; //binary, used to decide if the question of losing job due to pandemic is asked or not
let lostJob = 0; // 0 is no value or didn't have a job, -1 is if the person lost their job, 1 is if they didn't
let foundNewJob = 0; // follow up to losing job 1 if they found one, -1 if not

let retired = false; //binary to determine other questions
let workingFromHome = 0; //same value scheme as inperson classes (1 is working from home, -1 is inoffice)
let socialCircle = 3; //multi values question, self rated 1-5
let livedAlone = 0;
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
let nameBox = document.querySelector("#user-name");
let ageSlider = document.querySelector('#ageRange');
let ageOutput = document.querySelector('#ageText');
let ageImage = document.querySelector('#ageImage');
//student status
const studentYBtn = document.querySelector('#student-yes');
const studentNBtn = document.querySelector('#student-no');
const studentText = document.querySelector('#studentText');
//introvert vs. extrovert student
const studentIntExtRadio = document.querySelectorAll('input[name="introvert-extrovert-student"');
const introStudentText = document.querySelector('#introStudentText');
//remote classes
const remoteClasses = document.querySelectorAll('input[name="remote-classes"');
const remoteClassesText = document.querySelector('#remoteClassesText');
//introvert vs. extrovert
const radioIntExt = document.querySelectorAll('input[name="introvert-extrovert"');
const introAdultText = document.querySelector('#introAdultText');
//pre pandemic job
const prePandJobY = document.querySelector('#prePandJob-yes');
const prePandJobN = document.querySelector('#prePandJob-no');
const prePandJobText = document.querySelector('#prePandJobText');
//essential worker
const essWorkerY = document.querySelector('#essWorker-yes');
const essWorkerN = document.querySelector('#essWorker-no');
const essWorkerText = document.querySelector('#essWorkerText');
//lost Job
const lostJobY = document.querySelector('#lostJob-yes');
const lostJobN = document.querySelector('#lostJob-no');
const lostJobText = document.querySelector('#lostJobText');
//retired
const retiredY = document.querySelector('#retired-yes');
const retiredN = document.querySelector('#retired-no');
const retiredText = document.querySelector('#retiredText');
//foundNewJob
const foundNewJobY = document.querySelector('#foundNewJob-yes');
const foundNewJobN = document.querySelector('#foundNewJob-no');
const foundNewJobText = document.querySelector("#foundNewJobText");
//work From Home
const wfhRadio = document.querySelectorAll('input[name="working-from-home"');
const wfhText = document.querySelector('#wfhText');
//social circle
let socialStatus = document.querySelector('#socCircle');
const socCircleText = document.querySelector('#socCircleText');
//living situation
const livedAloneY = document.querySelector('#lived-alone-yes');
const livedAloneN = document.querySelector('#lived-alone-no');
const livedAloneText = document.querySelector('#livedAloneText');
//lived with others
let parentsSlider = document.querySelector('#parents');
const aParentsNumber = document.querySelector('#aParentsNumber');
let siblingsSlider = document.querySelector('#siblings');
const aSiblingsNumber = document.querySelector('#aSiblingsNumber');
let relativesSlider = document.querySelector('#relatives');
const aRelativesNumber = document.querySelector('#aRelativesNumber');
let petsSlider = document.querySelector('#pets');
const aPetsNumber = document.querySelector('#aPetsNumber');
let romPartnerSlider = document.querySelector('#romPartner');
const romanticPartnerNumber = document.querySelector('#romanticPartnerNumber');
let childrenSlider = document.querySelector('#children');
const childrenNumber = document.querySelector('#childrenNumber');
let roommatesSlider = document.querySelector('#roommates');
const roommatesNumber = document.querySelector('#roommatesNumber');
//lived with pets only
let petsAloneSlider = document.querySelector('#petsAlone');
const soloPetsText = document.querySelector('#soloPetsText');
//isolation
let isolationSlider = document.querySelector('#isolationSlider');
const isolationText = document.querySelector('#isolationText');
//lived with others underAge
let parentsUASlider = document.querySelector('#parentsUA');
const uaParentsNumber = document.querySelector('#uaParentsNumber');
let siblingsUASlider = document.querySelector('#siblingsUA');
const uaSiblingsNumber = document.querySelector('#uaSiblingsNumber');
let relativesUASlider = document.querySelector('#relativesUA');
const uaRelativesNumber = document.querySelector('#uaRelativesNumber');
let petsUASlider = document.querySelector('#petsUA');
const uaPetsNumber = document.querySelector('#uaPetsNumber');
// button to go to the analysis of the survey results
const nextPageButtonBox = document.querySelector('#nextPageButtonBox');
////////////////////////////////////////////////////////////////////////

///////////////////////////////////////Event Listeners///////////////////////////////////////
//progression buttons
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//age slider
ageSlider.addEventListener("touchend", setAge);
ageSlider.addEventListener("mouseup", setAge);

//for yes/no buttons I chose to declare these functions anonymously as opposed to addEventListener(event,function) to avoid having to duplicate each function's decleration for a positive and negative, ultimately I realize that in both cases there is 2 instances of each function which is inefficient but I cannot seem to figure out how to pass an argument through addEventListner
//functions that rely on input elements such as sliders or radio buttons are declared at the bottom of the document as there was no need to declare them anonymously
//student buttons
studentYBtn.addEventListener("click", function(){
    studentStatus = true;
    studentText.innerHTML = "During Covid I was a student";
});
studentNBtn.addEventListener("click", function(){
    studentStatus = false;
    studentText.innerHTML = "During Covid I wasn't a student";
});
//job before pandemic buttons
prePandJobN.addEventListener("click", function (){
    prePandJob = false;
    prePandJobText.innerHTML = "I didn't have a job before the pandemic";
});
prePandJobY.addEventListener("click", function (){
    prePandJob = true;
    prePandJobText.innerHTML = "When the pandemic started I had a job";
});
//essential worker buttons 
essWorkerN.addEventListener("click", function(){
    essentialWorker= false;
    essWorkerText.innerHTML = "I wasn't an essential worker";
});
essWorkerY.addEventListener("click", function(){
    essentialWorker= true;
    essWorkerText.innerHTML = "I was an essential worker";
});
//lost Job due to Pandemic buttons
lostJobN.addEventListener("click", function(){
    lostJob = -1;
    lostJobText.innerHTML = "When the pandemic started I kept my job";
});
lostJobY.addEventListener("click", function(){
    lostJob= 1;
    lostJobText.innerHTML = "I lost my job because of the pandemic";
});
//retired buttons
retiredN.addEventListener("click", function(){
    retired= false;
    retiredText.innerHTML = "I didn't retire during the pandemic";
});
retiredY.addEventListener("click", function(){
    retired= true;
    retiredText.innerHTML = "I have retired during the pandemic";
});
//found another job buttons
foundNewJobN.addEventListener("click", function(){
    foundNewJob= -1;
    foundNewJobText.innerHTML = "I wasn't able to find another job";
});
foundNewJobY.addEventListener("click", function(){
    foundNewJob= 1;
    foundNewJobText.innerHTML = "I was able to find another job";
});
//social circle slider
socialStatus.addEventListener("touchend", setSocialStatus);
socialStatus.addEventListener("mouseup", setSocialStatus);
//living situation
livedAloneN.addEventListener("click", function(){
    livedAlone= -1;
    livedAloneText.innerHTML = "I didn't live alone during the pandemic";
});
livedAloneY.addEventListener("click", function(){
    livedAlone= 1;
    livedAloneText.innerHTML = "During the pandemic I lived alone";
});
//living partners sliders
parentsSlider.addEventListener("touchend", setParents); 
siblingsSlider.addEventListener("touchend", setSiblings); 
relativesSlider.addEventListener("touchend", setRelatives); 
petsSlider.addEventListener("touchend", setPets); 
romPartnerSlider.addEventListener("touchend", setRomPartner);
childrenSlider.addEventListener("touchend", setChildren); 
roommatesSlider.addEventListener("touchend", setRoommates);
//same set of events but for desktop
parentsSlider.addEventListener("mouseup", setParents); 
siblingsSlider.addEventListener("mouseup", setSiblings); 
relativesSlider.addEventListener("mouseup", setRelatives); 
petsSlider.addEventListener("mouseup", setPets); 
romPartnerSlider.addEventListener("mouseup", setRomPartner);
childrenSlider.addEventListener("mouseup", setChildren); 
roommatesSlider.addEventListener("mouseup", setRoommates);

//pets while living alone slider
petsAloneSlider.addEventListener("touchend", setPets);
//desktop version
petsAloneSlider.addEventListener("mouseup", setPets);

//living partners underage
parentsUASlider.addEventListener("touchend", setParents); 
siblingsUASlider.addEventListener("touchend", setSiblings); 
relativesUASlider.addEventListener("touchend", setRelatives); 
petsUASlider.addEventListener("touchend", setPets); 
//desktop versions
parentsUASlider.addEventListener("mouseup", setParents); 
siblingsUASlider.addEventListener("mouseup", setSiblings); 
relativesUASlider.addEventListener("mouseup", setRelatives); 
petsUASlider.addEventListener("mouseup", setPets); 
//isolationSlider
isolationSlider.addEventListener("touchend", setIsolation);
//desktop version
isolationSlider.addEventListener("mouseup", setIsolation);

//radio buttons event listeners
remoteClasses.forEach(element => {
    element.addEventListener("click", setRemoteClasses);
});

studentIntExtRadio.forEach(element => {
    element.addEventListener("click", setIntrovertStatusStudent);
});

radioIntExt.forEach(element => {
    element.addEventListener("click", setIntrovertStatus);
});

wfhRadio.forEach(element => {
    element.addEventListener("click", setWFHStatus);
});
////////////////////////////////////////////////////////////////////////

//variables for page flipping behavior
let currentPaper = 0;
let numOfPages = papers.length;
let bookPosition = 0; //book position 0 is closed, 1 is left page focused, 2 is right page focused
let bookEnded = false;// stops book from flipping when the survery ends



///////////////////////////////////////////////functions///////////////////////////////////////
//procceeds to next page, applies the flipped class to the paper, since each paper has 2 pages it flips the object around. Uf the current page in focus is the one on the left it switches focus to the right, updates the currentPaper value (since the right page is a different sheet) as well as calls the appropriate content management function
function goNextPage() {
    if(currentPaper < numOfPages && bookEnded === false) {
        if(bookPosition === 0){
            bookMovement(1);
            decideContent();
            papers[0].classList.add("flipped");
            assignContentBack(contentIndex);
        }else if(bookPosition === 1){
            decideContent();
            moveBook();
            currentPaper++;
            assignContentFront(contentIndex);
        }else if(bookPosition ===2){
            if(currentPaper+1 === numOfPages){
                addPaper();
            }
            moveBook();
            decideContent();
            papers[currentPaper].classList.add("flipped");
            console.log("flipped");
            assignContentBack(contentIndex);
        }
        reorderPapers();
    }
    setRiskIndex();
}

//returns to previous page, removes the flipped class from the paper, since each paper has 2 pages it flips the object around. If the current page in focus is the one on the right it switches focus ot the left, updates the currentPaper value (since the left page is a different sheet) as well as calls the appropriate content management function
function goPrevPage() {
    if(currentPaper >= 0) {
        if(bookPosition === 1){
            if(currentPaper === 0){
                bookMovement(3);
            }else{
                moveBook();
            }
            returnContent(contentIndex);
            undoContent();
            papers[currentPaper].classList.remove("flipped");
        }else if(bookPosition === 2){
            returnContent(contentIndex);
            undoContent();
            moveBook();
            currentPaper--;
        }
        reorderPapers();
    }  
}

//reassigns the zIndex of all the papers so that the paper currently focused is always visible and ineractable
function reorderPapers(){
    papers.forEach(element => {
        element.style.zIndex = 1;
    });
    papers[currentPaper].style.zIndex = 2;
}

//default book positioning behavior, if it's focusing left focus right and vice versa
function moveBook(){
    if(bookPosition===1){
        bookPosition = 2;
        bookMovement(bookPosition);
    }else if(bookPosition === 2){
        bookPosition = 1;
        bookMovement(bookPosition);
    }
}

//switches the position of the book to be in line with the focused page
function bookMovement(bookPos){
    switch(bookPos){
        case 3:
            book.style.transform = "translateX(0%)";
            bookPosition = 0;
            break;
        case 1:
            book.style.transform = "translateX(100%)";
            bookPosition = 1;
            break;
        case 2:
            book.style.transform = "translateX(0%)";
            bookPosition = 2;
            break;
        case 0:
            book.style.transform = "translateX(100%)";
            bookPosition = 3;
            break;
        default:
            break;
    }
}

//returns the content on the current page back to a hidden off screen container, this is to avoid keeping it on the page in case the page is assigned different content
function returnContent(num){
    pageContent = contentArray[num];
    contentReserve.appendChild(pageContent);
    pageContent.classList.add("hid", "fixed-Bottom");
}

//places the content chosen by decide content on the front of the current page
function assignContentFront(num){
    pageContent = contentArray[num];
    let currentPage = papers[currentPaper].querySelector(":scope > .front");
    currentPaperContent = currentPage.querySelector(":scope > .front-content");
    currentPaperContent.appendChild(pageContent);
    pageContent.classList.remove("hid", "fixed-Bottom");
}

//places the content chosen by decide content on the back of the current page
function assignContentBack(num){
    pageContent = contentArray[num];
    let currentPage = papers[currentPaper].querySelector(":scope > .back");
    currentPaperContent = currentPage.querySelector(":scope > .back-content");
    currentPaperContent.appendChild(pageContent);
    pageContent.classList.remove("hid", "fixed-Bottom");
}

//The functions decideContent and undoContent are used to decide which piece of content shows up on the next page as well as appropriately back track through the survey. 
//I chose to not ask all users the same questions, based on simple ideas such as users under 18 are unlikely to be living alone, users over 28 are unlikely to be students. 
//Example: for users under 18 the question asking if they're an introvert or not is framed within a school setting as opposed to a party setting. 
//In order to avoid duplicating questions I chose to instead create an indexing system for states at which user finds themselves in the survey and using a roadmap diagram I am then able to direct the user forwards or more importantly backwards should they choose to undo their last answer.
//The decideContent function also serves to call the appropriate functions in situations where radio buttons are used and need to have their values checked
function decideContent(){
    switch(surveyState){
        case 1:
            setUserName();
            contentIndex = 2;
            surveyState = 2;
            break;
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
            bookEnded = true;
            surveyState = 28;
            break; 
        case 4:
            if(studentStatus){
                contentIndex = 5;
                surveyState = 5;
            }else{
                contentIndex = 8;
                surveyState = 7;
            }
            break;
        case 5:
            contentIndex = 6;
            surveyState = 6;
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
            if(livedAlone === 1){
                contentIndex = 17;
                surveyState = 11;
            }else if(livedAlone === -1){
                contentIndex = 16;
                surveyState = 10;
            }
            break;
        case 10:
            contentIndex = 18;
            surveyState = 12;
            break;
        case 12:
            contentIndex = 21;
            bookEnded = true;
            surveyState = 29;
            endSurvey();
            break;
        case 13:
            if(lostJob === 1){
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
            if(foundNewJob === 1){
                contentIndex = 13;
                surveyState = 14;
            }else if(foundNewJob === -1){
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
            if(lostJob === 1){
                contentIndex = 12;
                surveyState = 24;
            }else {
                contentIndex = 13;
                surveyState = 14;
            }
            break;
        case 24:
            if(foundNewJob=== 1){
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
        case 28:
            break;
        case 29:
            break;
        default:
            contentIndex++;
            surveyState++;
            break;
    }
}
//The undoContent function also serves to undo any assignment of values where necessary
function undoContent(){
    switch(surveyState){
        case 0:
            break;
        case 3:
                bookEnded = false;
                contentIndex= 2;
                surveyState = 2;
            break;
        case 4:
            contentIndex= 2;
            surveyState = 2;
            break;
        case 7:
            if(studentStatus){
                contentIndex= 6;
                surveyState = 6;
            }else if(!studentStatus){
                contentIndex= 4;
                surveyState = 4;
            }
            break;
        case 8:
            if(retired){
                contentIndex= 11;
                surveyState = 25;
            }else if(!prePandJob){
                contentIndex= 8;
                surveyState = 21;
            }else if(foundNewJob === -1){
                contentIndex= 12;
                surveyState = 24;
            }else{
                contentIndex= 13;
                surveyState = 14;
            }
            break;
        case 9:
            livedAlone = 0;
            contentIndex = 14
            surveyState = 8;
            break;
        case 11:
            contentIndex= 15;
            surveyState = 9;
            break;
        case 12:
            bookEnded = false;
            if(ageNumber<18){
                contentIndex= 19;
                surveyState = 27;
            }else if(livedAlone === 1){
                contentIndex= 17;
                surveyState = 11;
            }else if(livedAlone === -1){
                contentIndex= 16;
                surveyState = 10;
            }
            break;
        case 13:
            lostJob = 0;
            contentIndex= 8;
            surveyState = 7;
            break;
        case 14:
            if(ageNumber<18){
                if(lostJob === -1){
                    contentIndex= 10;
                    surveyState = 13;
                }else{
                    contentIndex= 12;
                    surveyState = 15;
                }
                }else{
                    if(essentialWorker){
                        contentIndex= 9;
                        surveyState = 22;
                    }else if(lostJob === -1){
                        contentIndex= 10;
                        surveyState = 23;
                    }else if(foundNewJob === 1){
                        contentIndex= 12;
                        surveyState = 24;
                    }
                }
            break;
        case 15:
            foundNewJob = 0;
            contentIndex = 10;
            surveyState = 13;
            break;
        case 16:
            contentIndex= 2;
            surveyState = 2;
            break;
        case 17:
            contentIndex= 2;
            surveyState = 2;
            break;
        case 18:
            contentIndex= 2;
            surveyState = 2;
            break;
        case 19:
            contentIndex= 7;
            surveyState = 16;
            break;
        case 20:
            contentIndex= 4;
            surveyState = 19;
            break;
        case 21:
            if(ageNumber<28 && studentStatus){
                contentIndex= 6;
                surveyState = 20;
            }else if(ageNumber<28 && !studentStatus){
                contentIndex= 4;
                surveyState = 19;
            }else if(ageNumber<60){
                contentIndex= 7;
                surveyState = 17;
            }else if(ageNumber>=60){
                contentIndex= 11;
                surveyState = 25;
            }
            break;
        case 23:
            lostJob = 0;
            contentIndex = 9;
            surveyState = 22;
            break;
        case 24:
            foundNewJob = 0;
            contentIndex = 10;
            surveyState = 23;
            break;
        case 25:
            contentIndex = 7;
            surveyState = 18;
            break;
        case 26:
            if(!prePandJob){
                contentIndex= 8;
                surveyState = 7;
            }else if(prePandJob && !lostJob){
                contentIndex= 13;
                surveyState = 14;
            }else if(prePandJob && lostJob && foundNewJob=== 1){
                contentIndex= 13;
                surveyState = 14;
            }else if(prePandJob && foundNewJob=== -1){
                contentIndex= 12;
                surveyState = 15;
            }else if(prePandJob && foundNewJob === 0){
                contentIndex= 13;
                surveyState = 14;
            }
            break;
        case 27:
            contentIndex= 14;
            surveyState = 26;
            break;
        case 28:
            contentIndex = 3;
            surveyState = 3;
            break;
        case 29:
            contentIndex = 18;
            surveyState = 12;
            break;
        default:
            contentIndex--;
            surveyState--;
            break;
    }
}

//used to add more papers to the end of the book as needed
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

///////////////////////functions that keep track of user input during the survery//////////////////

function setUserName(){
    userName = nameBox.value;
    ageOutput.innerHTML = `Right I'm ${userName} and I'm _ years old!`
}

function setAge(){
    ageNumber = ageSlider.value;
    ageOutput.innerHTML = `Right I'm ${userName} and I'm ${ageNumber} years old`;
    if(ageNumber< 13){
        ageBracket = "A";
    }else if (ageNumber < 18){
        ageBracket = "B";
    }else if (ageNumber < 28){
        ageBracket = "C";
    }else if (ageNumber < 60){
        ageBracket = "D";
    }else if (ageNumber >= 60){
        ageBracket = "E";
    }
    ageImage.src =`assets/images/age-${ageBracket}-${imageMod}.png`;
    setRiskIndex();
}


function setParents(){
    if(ageNumber< 18){
        parents = parseInt(parentsUASlider.value) ;
        if(parents>1){
            uaParentsNumber.innerHTML = "both parents";
        }else if(parents == 1){
            uaParentsNumber.innerHTML = "a single parent";
        }else{
            uaParentsNumber.innerHTML = "no parents";
        }
    }else{
        parents = parseInt(parentsSlider.value);
        if(parents>1){
            aParentsNumber.innerHTML = "both parents";
        }else if(parents == 1){
            aParentsNumber.innerHTML = "a single parent";
        }else{
            aParentsNumber.innerHTML = "no parents";
        }
    }
    setRiskIndex();
}
 
function setSiblings(){
    if(ageNumber< 18){
        siblings = parseInt(siblingsUASlider.value);
        if(siblings>1){
            uaSiblingsNumber.innerHTML = `${siblings} siblings`;
        }else if(siblings == 1){
            uaSiblingsNumber.innerHTML = "a sibling";
        }else{
            uaSiblingsNumber.innerHTML = "no siblings";
        }
    }else{
        siblings = parseInt(siblingsSlider.value);
        if(siblings>1){
            aSiblingsNumber.innerHTML = `${siblings} siblings`;
        }else if(siblings == 1){
            aSiblingsNumber.innerHTML = "a sibling";
        }else{
            aSiblingsNumber.innerHTML = "no siblings";
        }
    }
    setRiskIndex();
}
 
function setRelatives(){
    if(ageNumber< 18){
        relatives = parseInt(relativesUASlider.value);
        if(relatives>1){
            uaRelativesNumber.innerHTML = `${relatives} relatives`;
        }else if(relatives == 1){
            uaRelativesNumber.innerHTML = "a relative";
        }else{
            uaRelativesNumber.innerHTML = "no relatives";
        }
    }else{
        relatives = parseInt(relativesSlider.value);
        if(relatives>1){
            aRelativesNumber.innerHTML = `${relatives} relatives`;
        }else if(relatives == 1){
            aRelativesNumber.innerHTML = "a relative";
        }else{
            aRelativesNumber.innerHTML = "no relatives";
        }
    }
    setRiskIndex();
}
 
function setPets(){
    if(ageNumber< 18){
        pets = parseInt(petsUASlider.value);
        if(pets > 1){
            uaPetsNumber.innerHTML = `${pets} pets`;
        }else if(pets == 1){
            uaPetsNumber.innerHTML = "a pet";
        }else{
            uaPetsNumber.innerHTML = "no pets";
        }
    }else if(livedAlone === 1){
        pets = parseInt(petsAloneSlider.value);
        if(pets > 1){
            soloPetsText.innerHTML = `I have ${pets} pets`;
        }else if(pets == 1){
            soloPetsText.innerHTML = "I have a pet";
        }else{
            soloPetsText.innerHTML = "I have no pets";
        }
    }else{
        pets = parseInt(petsSlider.value);
        if(pets > 1){
            aPetsNumber.innerHTML = `${pets} pets`;
        }else if(pets == 1){
            aPetsNumber.innerHTML = "a pet";
        }else{
            aPetsNumber.innerHTML = "no pets";
        }
    }
    setRiskIndex();
}
 
function setRomPartner(){
    romanticPartner = parseInt(romPartnerSlider.value);
    if(romanticPartner == 1){
        romanticPartnerNumber.innerHTML = "a romantic partner";
    }else{
        romanticPartnerNumber.innerHTML = "no romantic partners";
    }
    setRiskIndex();
}

function setChildren(){
    children = parseInt(childrenSlider.value);
    if(children>1){
        childrenNumber.innerHTML = `${children} children`;
    }else if(children == 1){
        childrenNumber.innerHTML = "a child"
    }else{
        childrenNumber.innerHTML = "no children"
    }
    setRiskIndex();
}
 
function setRoommates(){
    roommates = parseInt(roommatesSlider.value);
    if(roommates>1){
        roommatesNumber.innerHTML = `${roommates} roommates`;
    }else if(roommates == 1){
        roommatesNumber.innerHTML = "a roommate"
    }else{
        roommatesNumber.innerHTML = "no roommates"
    }
    setRiskIndex();
}

function setIsolation(){
    isolation = parseInt(isolationSlider.value);
    isolationText.innerHTML = `${isolation}/5`;
    setRiskIndex();
}

function setSocialStatus(){
    socialCircle = parseInt(socialStatus.value);
    if(socialCircle>=4){
        socCircleText.innerHTML = "Despite the pandemic, I maintained a well established social circle";
    }else if(socialCircle === 3){
        socCircleText.innerHTML = "My social circle wasn't affected by the pandemic";
    }else if(socialCircle === 2){
        socCircleText.innerHTML = "My social circle suffered during the pandemic"
    }else if(socialCircle === 1){
        socCircleText.innerHTML = "My social circle crumbled during the pandemic"
    }else if(socialCircle === 0){
        socCircleText.innerHTML = "I had no social circle during the pandemic"
    }
    setRiskIndex();
}

function setIntrovertStatusStudent(){
    for (const radioButton of studentIntExtRadio){
        if (radioButton.checked){
            if(radioButton.value === "true"){
                introvert = true;
                introStudentText.innerHTML = "During lunch at school you'd likely find me reading alone";
            }else{
                introvert = false;
                introStudentText.innerHTML = "During lunch at school you'd likely find me hanging out with friends";
            }
            setRiskIndex();
        }
    }
}

function setIntrovertStatus(){
    for (const radioButton of radioIntExt){
        if (radioButton.checked){
            if(radioButton.value === "true"){
                introvert = true;
                introAdultText.innerHTML = "At a party you'd likely find me standing in a corner";
            }else{
                introvert = false;
                introAdultText.innerHTML = "At a party you'd likely find me dancing/drinking with others";
            }
            setRiskIndex();
        }
    }
}

function setWFHStatus(){
    for (const radioButton of wfhRadio){
        if (radioButton.checked){
            workingFromHome = parseInt(radioButton.value);
            if(workingFromHome === 1){
                wfhText.innerHTML = "Due to the pandemic I had to work from home";
            }else if (workingFromHome === -1){
                wfhText.innerHTML = "During the pandemic I had to work in person";
            }
            setRiskIndex();
        }

    }
}

function setRemoteClasses(){
    for (const radioButton of remoteClasses){
        if (radioButton.checked){
            remoteClassesStat = parseInt(radioButton.value);
            if(remoteClassesStat === 1){
                remoteClassesText.innerHTML = "Due to the pandemic I had to attend my classes remotely";
            }else if (remoteClassesStat === -1){
                remoteClassesText.innerHTML = "During the pandemic I had to attend my classes in person";
            }
            setRiskIndex();
        }

    }
}
/////////////////////////////////////////////////////////////////////////////////////////
//risk index calculations
//the way the calculation is made is as follows, 
//for introverts:
//  being an introvert +1
//  working from home or remote classes -1 each (since introverts prefer that)
//  if living partners are less than 5 it's -1 for each, as that is more social interaction for them
// if living partners are more than 5 it's +1 for each one over 5 as that is too many people for comfort
//  finally for introverts, if the person is working or studying from home and the living partners number is less than or equals to 1 it would be +3 risk. During my research I discovered that the biggest risk for introverts is that they find it difficult to maintain social interaction when they don't have to thus I believe this would be a considerable risk factor
//  being an extrovert -1
//  working from home or remote classes +1 each
//  if living partners > 1 -1 each, else +2
//for both
//  -0.5 per pet
//  +1 if lost job cause of the pandemic
//  -1 if did not lose job (I chose to do it this way because in stress and uncertainty something as simple as keeping one's job can be a relief)
//  -1 if was able to find another job
//  if social circle is 4, 5 or 6 it's +1, +2 or +3 if 3 it's 0 if 2-0 it's +1, +2 or +3
//  +1 for each level on the isolation slider
//  these numbers were decided based on the expected outcome of each situation, they are meant to divide users into 4 categories, users under -3 are managing the pandemic pretty well without much risk at all, users between -3 and 0 are okay, their social life might have been impacted by the pandemic but they are at no real risk. users between 0 and 3 are at a slight risk, they should try raching out others and reintegrating some social interaction in their lives, users at 4+ are at a high risk and should definitely seek help. There is of course a margin of error which will be indicated to users.
function setRiskIndex(){
    riskIndex = 0;
    let livingPartners = parents+siblings+relatives+roommates+romanticPartner+children;
    if(introvert){
        riskIndex = 1;
        riskIndex -= workingFromHome;
        riskIndex -= remoteClassesStat;
        if(livedAlone != 0){
            if(livingPartners>5){
                livingPartners-=5;
                riskIndex+=livingPartners;
            }else if (livingPartners>1){
                riskIndex -= livingPartners;
            }else if (workingFromHome=== 1||remoteClasses === 1 &&livingPartners<=1){
                riskIndex +=3
            }else if(prePandJob === false|| studentStatus === false && livingPartners<1){
                riskIndex+=3;
            }
            console.log('living calced');
        }

    }else{
        riskIndex= -1;
        riskIndex += workingFromHome;
        riskIndex += remoteClassesStat;
        if(livedAlone !=0){
            if(livingPartners> 1){
                riskIndex -= livingPartners;
            }else{
                riskIndex+= 2;
            }
            console.log('living calced');
        }
    }
    if(essentialWorker){
        riskIndex-=1;
    }
    riskIndex-= pets/2;
    riskIndex+= lostJob;
    riskIndex+= 3-socialCircle;
    riskIndex+= isolation;

    //theme modification as per risk index
    if(riskIndex>4){
        document.documentElement.style.setProperty('--fontFam', 'var(--JoFont)');
        document.documentElement.style.setProperty('--backgroundSize', '10px');
        imageMod = 3;
    }else if(riskIndex>1)
    {
        document.documentElement.style.setProperty('--fontFam', 'var(--Reis)');
        document.documentElement.style.setProperty('--backgroundSize', '30px');
        imageMod = 2;
    }else{
        document.documentElement.style.setProperty('--fontFam', 'var(--IndieFlower)');
        document.documentElement.style.setProperty('--backgroundSize', '40px');
        imageMod = 1;
    }
    modifyImages();
    console.log(riskIndex);
}

//this function replaces every images src from "assets/images/name-#.png" to `assets/images/name-${imageMod}.png` then refreshes the image. This allows for images to be modified as per the rist index.
function modifyImages(){
    let images = document.querySelectorAll('img');
    images.forEach(element => {
        let source = element.src;
        source = source.replace(/"/g, "`");
        source = source.replace(/1.png/g, `${imageMod}.png`);
        source = source.replace(/2.png/g, `${imageMod}.png`);
        source = source.replace(/3.png/g, `${imageMod}.png`);
        element.src = source;
    });
}


//reveal results button
function endSurvey(){
    let results = document.createElement('h1');
    let resultNumber = document.createElement('h3');
    let resultOutcome = document.createElement('p');
    let mentalHealthRessources = document.createElement('p');
    results.classList.add('resultTitle');
    results.innerHTML = `Your result is `;
    resultNumber.innerHTML = `${riskIndex}`;
    resultOutcome.classList.add('resultOutcome');
    mentalHealthRessources.classList.add('resultOutcome');
    mentalHealthRessources.id = "mentalHealthRessources";
    if(riskIndex>4){
        resultOutcome.innerHTML = "You're definitely isolated, or at least you feel that way. While it is hard to even know where to start from a situation that seems as bleak as you feel about yours, it's never too late to start trying to reintegrate people into your life. Start with small steps like greeting a cashier or a waiter at a restaurant, reach out to friends or relatives you haven't spoken to in a while. If you're completely unable to take those first steps seek professional help. Whether or not you think you're comfortable in your solitude, humans need social interaction to thrive so don't deny yourself the opportunity to experience the joy that is human company.";
    }else if(riskIndex>1){
        resultOutcome.innerHTML = "You are definitely on the lower end of sociability, it could have been purely pandemic related or you're perhaps naturally less comfortable with maintaining social relations with people. Eitherway, you should definitely start seeking people out. Introverts live a society that doesn't understand their needs and it becomes hard for them to recognize that they need others more than they think they do.";
    }else if(riskIndex>-4){
        resultOutcome.innerHTML = "You were affected by the pandemic, but you're still able to get your needed dose of interacting with others. While you could probably use some more of that, your situation is far from bleak. Given time you'll be able to rebuild your pre-pandemic relations and help others who were affected by the pandemic worse than you were.";
    }else if(riskIndex<-4){
        resultOutcome.innerHTML = "You were not impacted too hard by the pandemic in terms of social interaction. You might have lost some opportunities of interacting with others, but you were still able to get the plenty of social interaction from your social circle. If you're not already, try to help others who are less adept at seeking people out by sharing some of your sociability with them.";
    }
    mentalHealthRessources.innerHTML = `A collection of mental health ressources available in Canada as well as Canadian mental health organizations can be found <a href="https://www.ccmhs-ccsms.ca/mental-health-resources-1" target="_blank">here</a>`;
    contentArray[21].appendChild(results);
    contentArray[21].appendChild(resultNumber);
    contentArray[21].appendChild(resultOutcome);
    contentArray[21].appendChild(mentalHealthRessources);
    contentArray[21].appendChild(nextPageButtonBox);
    nextPageButtonBox.classList.remove('hid');
    nextPageButtonBox.classList.remove('fixed-Bottom');

}