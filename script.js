let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;
let turnX = true;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count === 9 && !isWinner) {
      showDraw();
    }
  });
});

const resetGame = () => {
  msgContainer.classList.add("hide");
  enableBoxes();
  resetBtn.classList.remove("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for(let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showDraw = () => {
  msgContainer.classList.remove("hide");
  msg.innerText = "This game was a DRAW !!! Play again !!!";
  disableBoxes();
};

const showWinner = (winner) => {
  msg - msgContainer.classList.remove("hide");
  msg.innerText = `Congratulations, Player ${winner} won !!!`;
  disableBoxes();
  resetBtn.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        showWinner(pos1);
      }
    }
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
