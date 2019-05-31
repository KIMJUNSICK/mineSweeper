const btn = document.getElementById("btn");
const table = document.querySelector("#table tbody");

const DATASET = [];

// const handleRightClick = event => {};

const makeTable = (row, column) => {
  for (let i = 0; i < row; i += 1) {
    var area = [];
    const tr = document.createElement("tr");
    DATASET.push(area);
    for (let j = 0; j < column; j += 1) {
      const td = document.createElement("td");
      area.push("o");
      td.addEventListener("contextmenu", function(event) {
        event.preventDefault();

        let parentTable = event.currentTarget.parentNode.parentNode;
        let parentRow = event.currentTarget.parentNode;
        let whatRow = Array.prototype.indexOf.call(
          parentTable.children,
          parentRow
        );
        let whatColumn = Array.prototype.indexOf.call(parentRow.children, td);
        console.log(whatRow, whatColumn);
        if (["", "😈"].includes(event.currentTarget.textContent)) {
          event.currentTarget.textContent = "✔";
        } else if (event.currentTarget.textContent === "✔") {
          event.currentTarget.textContent = "🤔";
        } else if (event.currentTarget.textContent === "🤔") {
          if (DATASET[whatRow][whatColumn] === "o") {
            event.currentTarget.textContent = "";
          } else if (DATASET[whatRow][whatColumn] === "😈") {
            event.currentTarget.textContent = "😈";
          }
        }
      });
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
};

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
    table.children[positionRow].children[positionColumn].textContent = "😈";
    DATASET[positionRow][positionColumn] = "😈";
  }
};

const handleCommit = () => {
  table.innerHTML = "";
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
