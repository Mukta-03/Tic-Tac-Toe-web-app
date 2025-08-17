let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let quitBtn = document.querySelector("#quit-btn");
let newGameBtn = document.querySelector("#new-btn");
let drawBtn = document.querySelector("#draw-btn");
let drawCloseBtn = document.querySelector("#draw-close-btn");
let drawContainer = document.querySelector(".draw-container");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let clickSound = new Audio("click.mp3"); 
let winSound = new Audio("win.mp3");
let oSound = new Audio("O.mp3");
let xSound = new Audio("X.mp3");
let resetSound = new Audio("reset.mp3");
let drawSound = new Audio("draw.mp3");
let startSound = new Audio("start.mp3");

const playClickSound = () => {
    clickSound.currentTime = 0;
    clickSound.play();
};

const playWinSound = () => {
    winSound.currentTime = 0;
    winSound.play();
};

const playOSound = () => {
    oSound.currentTime = 0;
    oSound.play();
};

const playXSound = () => {
    xSound.currentTime = 0;
    xSound.play();
};

const playResetSound = () => {
    resetSound.currentTime = 0;
    resetSound.play();
};

const playDrawSound = () => {
    drawSound.currentTime = 0;
    drawSound.play();
};

const playStartSound = () => {
    startSound.currentTime = 0;
    startSound.play();
};


let turnO = true; //playerX,playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    document.querySelector("#celebration-gif").style.display = "none";
    document.querySelector("#alert-gif").style.display = "none";
    document.querySelector(".draw-container").classList.add("hide");
    document.querySelector("#fix-gif").style.display = "block";
    resetBtn.classList.remove("show");

};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        resetBtn.classList.add("show");
        
        if(turnO){
            //playerO
            box.innerText="O";
            playOSound();
            turnO = false;
        } else {
            //playerX
            box.innerText="X";
            playXSound();
            turnO = true;
        }
        box.disabled = true;

         checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
    box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
    box.disabled = false;
    box.innerText="";
    box.classList.remove("win-highlight");
    }
};


const showWinner = (winner) => {
    msg.innerHTML = `Woo-Hoo!..${winner} wins the game! `;
    msgContainer.classList.remove("hide");
    disableBoxes();
    playWinSound();
 
    let gif = document.querySelector("#celebration-gif");
    gif.style.display = "flex";
    setTimeout(() =>{
        gif.style.display = "none";
    },4000);

    let agif = document.querySelector("#alert-gif").style.display = "flex";
    setTimeout(() =>{
        gif.style.display = "none";
    },4000);

    let fgif = document.querySelector("#fix-gif").style.display = "none";
    setTimeout(() => {
        fgif.style.display = "none";
    },4000);
};

const showDraw = () => {
    const drawMsgBox = document.querySelector(".draw-container");
    drawMsgBox.classList.remove("hide");
    disableBoxes();
    playDrawSound();

    resetBtn.disabled=true;
    quitBtn.disabled=true;

};


const checkWinner = () => {

    let winnerFound = false;

    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                boxes[pattern[0]].classList.add("win-highlight");
                boxes[pattern[1]].classList.add("win-highlight");
                boxes[pattern[2]].classList.add("win-highlight");

                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }
    let allFilled = [...boxes].every((box) =>box.innerText !=="");
    if(allFilled && !winnerFound)
        showDraw();
    
};
 
quitBtn.addEventListener("click",() => {
    playClickSound();
    document.body.classList.add("fade-out");
    setTimeout(( )=>{
        document.body.style.display="none";
    },500);

});

resetBtn.addEventListener("click",() =>{
    playClickSound();
    playResetSound();
    resetGame();
});

newGameBtn.addEventListener("click",() =>{
    playClickSound();
    playStartSound();
    resetGame();

    resetBtn.disabled=false;
    quitBtn.disabled=false;

});

drawBtn.addEventListener("click",()=> {
    playClickSound();
    playStartSound();
    resetGame();

    resetBtn.disabled=false;
    quitBtn.disabled=false;

});

drawCloseBtn.addEventListener("click",() => {
    playClickSound();
    drawContainer.classList.add("hide");

    resetBtn.disabled=false;
    quitBtn.disabled=false;


});



