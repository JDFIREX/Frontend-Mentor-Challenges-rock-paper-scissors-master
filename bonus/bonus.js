// --------------------------------------------------------------------------------------------------------------------------------------
// Rules
// --------------------------------------------------------------------------------------------------------------------------------------

let rulesBtn = document.querySelector(".rules");
let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});
let rulesOpen = false;
rulesBtn.addEventListener("click",(e) => {
    window.addEventListener("keydown",(e) => {
        if(rulesOpen){
            e.key == "Escape" ? HideRules() : null;
        }
    })
    document.querySelector(".rules_close").addEventListener("click",(e) => {
        if(rulesOpen){
            HideRules()
        }
    })


    !rulesOpen ? ShowRules() : HideRules()
})

function ShowRules(){
    if(window.innerWidth < 600){
        gs.to(".rules_box",.4,{
            opacity: 1,
            left: "5vw"
        })
    }else if(window.innerWidth < 900){
        gs.to(".rules_box",.4,{
            opacity: 1,
            left: "10vw"
        })
    }else{
        gs.to(".rules_box",.4,{
            opacity: 1,
            left: "25vw"
        })
    }
    rulesOpen = true;
}
function HideRules(){
    gs.to(".rules_box",.4,{
        opacity: 0,
        left: "200vw"
    })
    rulesOpen = false;
}

// --------------------------------------------------------------------------------------------------------------------------------------
// game 
// --------------------------------------------------------------------------------------------------------------------------------------

let scissors = document.querySelector(".scissors")
let paper = document.querySelector(".paper")
let rock = document.querySelector(".rock")
let lizard = document.querySelector(".lizard")
let spock = document.querySelector(".spock");
let pics = [scissors,paper,rock,lizard,spock];
let score = 0;
let my = document.querySelector(".my");
let computer = document.querySelector(".computer");
let mypic = "";
let computerpic = "";
let winner = "";
let text = "";
pics.forEach(p => {
    p.addEventListener("click", (e) => StartGame(e))
})


function StartGame(e){
    HidePics()
    setTimeout(() => {
        ShowFight()
        setTimeout(() => {
            ShowMyPic(e)
            setTimeout(() => {
                ShowComputerPic()
                setTimeout(() => {
                    SetFight()
                    setTimeout(() => {
                        SetWinner()
                    }, 200);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function HidePics(){
    gs.to(".main",.5,{
        rotate: -500,
        scale: 0,
        opacity: 0,
    })
    gs.to(".main",0,{
        rotate: 0,
        scale: 0,
        visibility : "hidden"
    })
}

function ShowFight(){
    gs.to(".fight",0,{
        scale: 0,
        opacity : 0,
        visibility : "visible"
    })
    gs.to(".fight",.5,{
        scale : 1,
        opacity: 1
    })
}

function ShowMyPic(e){
    let clone  = document.createElement("div");
    clone.innerHTML = e.path[0].outerHTML;
    clone = clone.children[0];
    mypic = clone.dataset.pic;

    gs.to(clone,0,{
        opacity : 0,
        scale : 0
    })
    my.appendChild(clone);
    setTimeout(() => {
        gs.to(clone,.5,{
            opacity : 1,
            scale : 1
        })
    }, 100);
}

function ShowComputerPic(){
    let random = Math.ceil(Math.random() * 5) - 1;
    let pic = pics[random]
    let clone = document.createElement('div');
    clone.innerHTML = pic.outerHTML;
    clone  = clone.children[0];
    computerpic = clone.dataset.pic;
    
    gs.to(clone,0,{
        opacity : 0,
        scale : 0
    })
    setTimeout(() => {
        computer.appendChild(clone);
        gs.to(clone,.5,{
            opacity : 1,
            scale : 1
        })
    }, 100);
}

function SetFight(){
    switch(mypic){
        case "scissors" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "paper" || computerpic == "lizard"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
        case "scissors" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "paper" || computerpic == "lizard"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
        case "paper" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "rock" || computerpic == "spock"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
        case "rock" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "lizard" || computerpic == "scissors"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
        case "lizard" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "spock" || computerpic == "paper"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
        case "spock" : 
        if(mypic == computerpic){
            text = "DRAW!!";
            winner = "DRAW";
        }else if(computerpic == "rock" || computerpic == "scissors"){
            text = "YOU WIN";
            winner = my;
        }else{
            text = 'YOU LOSE'
            winner = computer;
        }
        ;break;
    }
}

function SetWinner(){
    let fight = document.querySelector('.fight');
    fight.classList.add("fight_end");
    winner != "DRAW" ? winner.classList.add("win") : null;
    text == "DRAW!!" ? null : text == "YOU WIN" ? score++ : score--;
    document.querySelector(".winner_h").innerHTML = text;
    document.querySelector(".score_h").innerHTML = score;
    gs.to(".fight_end",0,{
        visibility : "visible"
    })
}

function playAgain(){
    gs.to(".fight",.5,{
        scale : 0,
        opacity: 0
    })
    gs.to(".fight",0,{
        visibility : "hidden"
    })
    setTimeout(() => {
        my.removeChild(my.children[0])
        computer.removeChild(computer.children[0])
        winner != "DRAW" ? winner.classList.remove("win") : null;
        document.querySelector('.fight').classList.remove("fight_end");
        setTimeout(() => {
            gs.to(".main",0,{
                rotate: -500,
                scale: 0,
                opacity: 0,
                visibility : "visible"
            })
            gs.to(".main",.5,{
                delay: .5,
                rotate: 0,
                scale: 1,
                opacity: 1,
            })
        }, 150);
    }, 550);
}