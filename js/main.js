let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container"); 
let msgContainer1 = document.querySelector(".msg-container1");// Corrected spelling
let msg = document.querySelector("#msg");
let msg1 = document.querySelector("#msg-one");
let turnO = true; // Player 'O' starts by default

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerHTML = ""; // Clear winner message
    msg1.innerHTML = ""; // Clear play-again message
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      
        if (turnO) {
            box.innerHTML = `<span style="color: yellow;">O</span>`;
            turnO = false;
        } else {
            box.innerHTML = `<span style="color: green;">X</span>`;
            turnO = true; // Corrected assignment
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg1.innerHTML = "It's a draw! Play again.";
    msgContainer1.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
               
                showWinner(pos1Val);
                return; // Exit once a winner is found
            }
        }
    }

    // Check for a draw (no empty boxes and no winner)
    if ([...boxes].every((box) => box.innerText !== "")) {
        console.log("It's a draw");
        showDraw();
    }
};

// Event Listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
