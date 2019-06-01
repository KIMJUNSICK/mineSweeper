const btn = document.getElementById("btn");
const table = document.querySelector("#table tbody");
const result = document.querySelector(".result");

let DATASET = [];

const makeTable = (row, column) => {
  for (let i = 0; i < row; i += 1) {
    var area = [];
    const tr = document.createElement("tr");
    DATASET.push(area);
    for (let j = 0; j < column; j += 1) {
      const td = document.createElement("td");
      area.push(0);
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
      td.addEventListener("click", function(event) {
        let parentTable = event.currentTarget.parentNode.parentNode;
        let parentRow = event.currentTarget.parentNode;
        let whatRow = Array.prototype.indexOf.call(parentTable.children, tr);
        let whatColumn = Array.prototype.indexOf.call(parentRow.children, td);

        event.currentTarget.classList.add("opened");

        if (DATASET[whatRow][whatColumn] === "😈") {
          event.currentTarget.textContent = "💣";
          result.innerText = "E.N.D";
        } else {
          let near = [
            DATASET[whatRow][whatColumn - 1],
            DATASET[whatRow][whatColumn + 1]
          ];
          if (DATASET[whatRow - 1]) {
            near = near.concat(
              DATASET[whatRow - 1][whatColumn - 1],
              DATASET[whatRow - 1][whatColumn],
              DATASET[whatRow - 1][whatColumn + 1]
            );
          }
          if (DATASET[whatRow + 1]) {
            near = near.concat(
              DATASET[whatRow + 1][whatColumn - 1],
              DATASET[whatRow + 1][whatColumn],
              DATASET[whatRow + 1][whatColumn + 1]
            );
          }

          let nearMine = near.filter(function(v) {
            return v === "😈";
          }).length;

          event.currentTarget.textContent = nearMine || "";

          if (nearMine === 0) {
            console.log("open!!");
            let nearSpace = [];
            if (table.children[whatRow - 1]) {
              nearSpace = nearSpace.concat([
                table.children[whatRow - 1].children[whatColumn - 1],
                table.children[whatRow - 1].children[whatColumn],
                table.children[whatRow - 1].children[whatColumn + 1]
              ]);
            }
            nearSpace = nearSpace.concat([
              table.children[whatRow].children[whatColumn - 1],
              table.children[whatRow].children[whatColumn + 1]
            ]);
            if (table.children[whatRow + 1]) {
              nearSpace = nearSpace.concat([
                table.children[whatRow + 1].children[whatColumn - 1],
                table.children[whatRow + 1].children[whatColumn],
                table.children[whatRow + 1].children[whatColumn + 1]
              ]);
            }
            DATASET[whatRow][whatColumn] = 1;
            nearSpace
              .filter(v => !!v)
              .forEach(function(near) {
                let parentTable = near.parentNode.parentNode;
                let parentRow = near.parentNode;
                let nearwhatRow = Array.prototype.indexOf.call(
                  parentTable.children,
                  parentRow
                );
                let nearwhatColumn = Array.prototype.indexOf.call(
                  parentRow.children,
                  near
                );
                if (DATASET[nearwhatRow][nearwhatColumn] !== 1) {
                  near.click();
                }
              });
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
  DATASET = [];
  result.innerText = "";
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
