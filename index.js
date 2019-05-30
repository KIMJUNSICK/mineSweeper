const btn = document.getElementById("btn");
const table = document.querySelector("#table tbody");

const handleRandom = (row, column, mine) => {
  const CANDIDATE = Array(row * column).fill();
  const CANDI = CANDIDATE.map(function(element, index) {
    return index;
  });

  const SUFFLE = [];
  const input = row * column - mine;
  while (CANDI.length > input) {
    const NUMBER = CANDI.splice(Math.floor(Math.random() * CANDI.length), 1)[0];
    SUFFLE.push(NUMBER);
  }
  return SUFFLE;
};

const makeMine = (suffleValue, column) => {
  for (k = 0; k < suffleValue.length; k += 1) {
    let positionRow = Math.floor(suffleValue[k] / column);
    let positionColumn = suffleValue[k] % column;
    table.children[positionRow].children[positionColumn].textContent = "X";
  }
};

const makeTable = (row, column) => {
  for (let i = 0; i < row; i += 1) {
    const tr = document.createElement("tr");
    for (let j = 0; j < column; j += 1) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
};

const handleCommit = () => {
  const row = parseInt(document.getElementById("horizontal").value);
  const column = parseInt(document.getElementById("vertical").value);
  const mine = parseInt(document.getElementById("mine").value);
  makeTable(row, column);
  const suffleValue = handleRandom(row, column, mine);
  makeMine(suffleValue, column);
};

const init = () => {
  btn.addEventListener("click", handleCommit);
};

init();
