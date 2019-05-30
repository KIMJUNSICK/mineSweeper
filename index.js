const btn = document.getElementById("btn");
const table = document.querySelector("#table tbody");

const handleRandom = (row, column) => {
  const CANDIDATE = Array(row * column).fill();
  const CANDI = CANDIDATE.map(function(element, index) {
    return index + 1;
  });

  const SUFFLE = [];
  while (row * column > 0) {
    const NUMBER = CANDI.splice(Math.floor(Math.random() * (row * column)));
    SUFFLE.push(NUMBER);
  }

  console.log(SUFFLE);
};

handleRandom(10, 10);

const makeTable = (row, column) => {
  for (let i = 0; i < column; i += 1) {
    const tr = document.createElement("tr");
    for (let j = 0; j < row; j += 1) {
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
};

const init = () => {
  btn.addEventListener("click", handleCommit);
};

init();
