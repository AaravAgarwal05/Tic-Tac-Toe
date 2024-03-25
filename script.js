const winningCombinations = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

let playerName = "player";
let player1 = "player1";
let player2 = "player2";

function saveName() {
  var playerNameInput = document.getElementById("player");
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name.");
  } else {
    console.log(playerName);
  }
}

function savePlayers() {
  var player1Input = document.getElementById("player1");
  var player2Input = document.getElementById("player2");
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  if (player1 === "" || player2 === "") {
    alert("Please enter both player names.");
  } else {
    console.log(player1);
    console.log(player2);
  }
  var choose = document.getElementById("Choose");
  choose.textContent = player1 + " is X & " + player2 + " is O";
  var turn = document.getElementById("Turn");
  turn.textContent = player1 + "'s Turn";
}

function CheckWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const ButtonA = document.getElementById(a);
    const ButtonB = document.getElementById(b);
    const ButtonC = document.getElementById(c);
    if (
      ButtonA.textContent == ButtonB.textContent &&
      ButtonB.textContent == ButtonC.textContent &&
      ButtonA.textContent != ""
    ) {
      if (ButtonA.textContent == "X") {
        setTimeout(function () {
          var Status = document.getElementById("status");
          Status.textContent = playerName + " wins!";
        }, 100);
      } else {
        setTimeout(function () {
          var Status = document.getElementById("status");
          Status.textContent = "AI wins!";
        }, 100);
      }
    }
  }
}

function CheckDraw() {
  for (let i = 1; i <= 9; i++) {
    var Button = document.getElementById(i);
    if (Button.textContent == "") {
      return false;
    }
  }
  return true;
}

function PlayerMove(ButtonId) {
  var Button = document.getElementById(ButtonId);
  if (Button.textContent == "") {
    Button.textContent = "X";
    CheckWinner();
    if (!CheckDraw()) {
      ComputerMove();
    } else {
      setTimeout(function () {
        var Status = document.getElementById("status");
        Status.textContent = "It's a Draw!";
      }, 100);
    }
  }
}

function ComputerMove() {
  setTimeout(function () {
    var Move = FindWinningMove("O");
    if (Move == -1) {
      Move = FindWinningMove("X");
      if (Move == -1) {
        Move = RandomMove();
      }
    }
    if (Move != -1) {
      var Button = document.getElementById(Move);
      Button.textContent = "O";
      CheckWinner();
      CheckDraw();
    }
  }, 100);
}

function FindWinningMove(Player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const ButtonA = document.getElementById(a);
    const ButtonB = document.getElementById(b);
    const ButtonC = document.getElementById(c);
    if (
      ButtonA.textContent == ButtonB.textContent &&
      ButtonA.textContent == Player &&
      ButtonC.textContent == ""
    ) {
      return c;
    }
    if (
      ButtonA.textContent == ButtonC.textContent &&
      ButtonA.textContent == Player &&
      ButtonB.textContent == ""
    ) {
      return b;
    }
    if (
      ButtonB.textContent == ButtonC.textContent &&
      ButtonB.textContent == Player &&
      ButtonA.textContent == ""
    ) {
      return a;
    }
  }
  return -1;
}

function RandomMove() {
  while (true) {
    var ButtonId = Math.floor(Math.random() * 9) + 1;
    var Button = document.getElementById(ButtonId);
    if (Button.textContent == "") {
      return ButtonId;
    }
  }
}

function Reset() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).textContent = "";
  }
  var Status = document.getElementById("status");
  Status.textContent = "";
  count = 0;
  var turn = document.getElementById("Turn");
  turn.textContent = player1 + "'s Turn";
  var choose = document.getElementById("Choose");
  choose.textContent = "";
}

var count = 0;

function PlayersMove(ButtonId) {
  var Button = document.getElementById(ButtonId);
  if (Button.textContent == "") {
    if (count % 2 == 0) {
      Button.textContent = "X";
      var turn = document.getElementById("Turn");
      turn.textContent = player2 + "'s Turn";
      CheckPlayerWinner();
      count++;
    } else {
      Button.textContent = "O";
      var turn = document.getElementById("Turn");
      turn.textContent = player1 + "'s Turn";
      CheckPlayerWinner();
      count++;
    }
  }
  if (CheckDraw()) {
    setTimeout(function () {
      var Status = document.getElementById("status");
      Status.textContent = "It's a Draw!";
    }, 100);
  }
}

function CheckPlayerWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const ButtonA = document.getElementById(a);
    const ButtonB = document.getElementById(b);
    const ButtonC = document.getElementById(c);
    if (
      ButtonA.textContent == ButtonB.textContent &&
      ButtonB.textContent == ButtonC.textContent &&
      ButtonA.textContent != ""
    ) {
      if (ButtonA.textContent == "X") {
        setTimeout(function () {
          var Status = document.getElementById("status");
          Status.textContent = player1 + " wins!";
        }, 100);
      } else {
        setTimeout(function () {
          var Status = document.getElementById("status");
          Status.textContent = player2 + " wins!";
        }, 100);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.getElementById("custom-checkbox");
  var checkboxState = localStorage.getItem("checkboxState");

  if (checkboxState === "unchecked") {
    checkbox.checked = false;
  } else if (checkboxState === "checked") {
    checkbox.checked = true;
  }

  updateColors(checkbox.checked);

  checkbox.addEventListener("change", function () {
    updateColors(checkbox.checked);

    if (checkbox.checked) {
      localStorage.setItem("checkboxState", "checked");
    } else {
      localStorage.setItem("checkboxState", "unchecked");
    }
  });
});

function updateColors(isChecked) {
  document.documentElement.style.setProperty(
    "--bg-color",
    isChecked ? "#0b1623" : "#e7f6ff"
  );
  document.documentElement.style.setProperty(
    "--text-color",
    isChecked ? "#e7f6ff" : "#0b1623"
  );
  document.documentElement.style.setProperty(
    "--text-shadow-color",
    isChecked ? "#e7f6ff50" : "#0b162350"
  );
  document.documentElement.style.setProperty(
    "--line-color",
    isChecked ? "#0b1623" : "#e7f6ff"
  );
}
