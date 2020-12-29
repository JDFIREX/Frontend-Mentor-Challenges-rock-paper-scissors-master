"use strict";

// --------------------------------------------------------------------------------------------------------------------------------------
// Rules
// --------------------------------------------------------------------------------------------------------------------------------------
var rulesBtn = document.querySelector(".rules");
var gs = gsap.timeline({
  defaults: {
    ease: "Power2.inOut"
  }
});
var rulesOpen = false;
rulesBtn.addEventListener("click", function (e) {
  window.addEventListener("keydown", function (e) {
    if (rulesOpen) {
      e.key == "Escape" ? HideRules() : null;
    }
  });
  document.querySelector(".rules_close").addEventListener("click", function (e) {
    if (rulesOpen) {
      HideRules();
    }
  });
  !rulesOpen ? ShowRules() : HideRules();
});

function ShowRules() {
  if (window.innerWidth < 600) {
    gs.to(".rules_box", .4, {
      opacity: 1,
      left: "5vw"
    });
  } else if (window.innerWidth < 900) {
    gs.to(".rules_box", .4, {
      opacity: 1,
      left: "10vw"
    });
  } else {
    gs.to(".rules_box", .4, {
      opacity: 1,
      left: "25vw"
    });
  }

  rulesOpen = true;
}

function HideRules() {
  gs.to(".rules_box", .4, {
    opacity: 0,
    left: "200vw"
  });
  rulesOpen = false;
} // --------------------------------------------------------------------------------------------------------------------------------------
// game 
// --------------------------------------------------------------------------------------------------------------------------------------


var scissors = document.querySelector(".scissors");
var paper = document.querySelector(".paper");
var rock = document.querySelector(".rock");
var pics = [scissors, paper, rock];
var score = 0;
var my = document.querySelector(".my");
var computer = document.querySelector(".computer");
var mypic = "";
var computerpic = "";
var winner = "";
var text = "";
pics.forEach(function (p) {
  p.addEventListener("click", function (e) {
    return StartGame(e);
  });
});

function StartGame(e) {
  HidePics();
  setTimeout(function () {
    ShowFight();
    setTimeout(function () {
      ShowMyPic(e);
      setTimeout(function () {
        ShowComputerPic();
        setTimeout(function () {
          SetFight();
          setTimeout(function () {
            SetWinner();
          }, 200);
        }, 500);
      }, 500);
    }, 500);
  }, 500);
}

function HidePics() {
  gs.to(".main", .5, {
    rotate: -500,
    scale: 0,
    opacity: 0
  });
  gs.to(".main", 0, {
    rotate: 0,
    scale: 0,
    visibility: "hidden"
  });
}

function ShowFight() {
  gs.to(".fight", 0, {
    scale: 0,
    opacity: 0,
    visibility: "visible"
  });
  gs.to(".fight", .5, {
    scale: 1,
    opacity: 1
  });
}

function ShowMyPic(e) {
  var clone = document.createElement("div");
  clone.innerHTML = e.path[0].outerHTML;
  clone = clone.children[0];
  mypic = clone.dataset.pic;
  gs.to(clone, 0, {
    opacity: 0,
    scale: 0
  });
  my.appendChild(clone);
  setTimeout(function () {
    gs.to(clone, .5, {
      opacity: 1,
      scale: 1
    });
  }, 100);
}

function ShowComputerPic() {
  var random = Math.ceil(Math.random() * 3) - 1;
  var pic = pics[random];
  var clone = document.createElement('div');
  clone.innerHTML = pic.outerHTML;
  clone = clone.children[0];
  computerpic = clone.dataset.pic;
  gs.to(clone, 0, {
    opacity: 0,
    scale: 0
  });
  setTimeout(function () {
    computer.appendChild(clone);
    gs.to(clone, .5, {
      opacity: 1,
      scale: 1
    });
  }, 100);
}

function SetFight() {
  switch (mypic) {
    case "scissors":
      if (mypic == computerpic) {
        text = "DRAW!!";
        winner = "DRAW";
      } else if (computerpic == "paper") {
        text = "YOU WIN";
        winner = my;
      } else {
        text = 'YOU LOSE';
        winner = computer;
      }

      ;
      break;

    case "paper":
      if (mypic == computerpic) {
        text = "DRAW!!";
        winner = "DRAW";
      } else if (computerpic == "rock") {
        text = "YOU WIN";
        winner = my;
      } else {
        text = 'YOU LOSE';
        winner = computer;
      }

      ;
      break;

    case "rock":
      if (mypic == computerpic) {
        text = "DRAW!!";
        winner = "DRAW";
      } else if (computerpic == "scissors") {
        text = "YOU WIN";
        winner = my;
      } else {
        text = 'YOU LOSE';
        winner = computer;
      }

      ;
      break;
  }
}

function SetWinner() {
  var fight = document.querySelector('.fight');
  fight.classList.add("fight_end");
  winner != "DRAW" ? winner.classList.add("win") : null;
  text == "DRAW!!" ? null : text == "YOU WIN" ? score++ : score--;
  document.querySelector(".winner_h").innerHTML = text;
  document.querySelector(".score_js").innerHTML = score;
  gs.to(".fight_end", 0, {
    visibility: "visible"
  });
}

function playAgain() {
  gs.to(".fight", .5, {
    scale: 0,
    opacity: 0
  });
  gs.to(".fight", 0, {
    visibility: "hidden"
  });
  setTimeout(function () {
    my.removeChild(my.children[0]);
    computer.removeChild(computer.children[0]);
    winner != "DRAW" ? winner.classList.remove("win") : null;
    setTimeout(function () {
      gs.to(".main", 0, {
        rotate: -500,
        scale: 0,
        opacity: 0,
        visibility: "visible"
      });
      gs.to(".main", .5, {
        delay: .5,
        rotate: 0,
        scale: 1,
        opacity: 1
      });
    }, 150);
  }, 550);
}