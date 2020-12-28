let scissors = document.querySelector(".scissors");
let paper = document.querySelector('.paper');
let rock = document.querySelector(".rock");
let pics = [scissors,paper,rock];
let score = 0;
let my = document.querySelector('.my');
let computer = document.querySelector(".computer");
let gs = gsap.timeline({defaults: {ease: "Power2.inOut"}});

scissors.addEventListener("click",(e) => startGame(e))
paper.addEventListener("click",(e) => startGame(e))
rock.addEventListener("click",(e) => startGame(e))

function startGame(e){
    setMyPic(e)   
    setTimeout(() => {
        setComputerPic(e)
        setTimeout(() => {
            setFight()
        }, 1500);
    }, 1500);
}

function setMyPic(e){
    let myChoose = document.createElement("div");
    myChoose.innerHTML = e.path[1].outerHTML;
    nextStep(myChoose.children[0])
}

function nextStep(m){
    gs.to(".main",.7,{
        scale: 0,
        opacity: 0,
        
    }).to(".main",0,{
        visibility : "hidden"
    })
    
    setTimeout(() => {
        document.querySelector(".my").appendChild(m)
        gs.to(".choose",0,{
           opacity : 0,
           visibility : "visible"
        }).to(m,0,{
            opacity: 1,
            scale: 1
        }).to(".choose", .5,{
            opacity: 1
        })
    }, 700);
}

function setComputerPic(e){
    let random = Math.ceil(Math.random() * 3);
    let pic = pics[random - 1];
    computerNextStep(pic,e)
}

function computerNextStep(pic,e){
    let clone = document.createElement("div");
    clone.innerHTML = pic.outerHTML;

    computer.appendChild(clone.children[0])
    gs.to(computer.querySelector('.game'),0,{
        opacity: 0,
        scale: 0,
    }).to(computer.querySelector('.game'),.5,{
        delay: .3,
        opacity: 1,
        scale: 1
    })
}

function setFight(){
    let mypic = my.children[1].dataset.pic;
    let computerpic = computer.children[1].dataset.pic;
    let winner = "";
    let draw = false;
    let text = "";

    switch(mypic){
        case "paper" : 
            if(mypic == computerpic){
                draw = true;
                text = "DRAW!!"
            }else if(computerpic == "rock"){
                winner = my;
                text = "YOU WIN"
            }else{
                winner = computer;
                text = "YOU LOSE"
            }
        ; break;
        case "scissors" : 
            if(mypic == computerpic){
                draw = true;
                text = "DRAW!!"
            }else if(computerpic == "paper"){
                winner = my;
                text = "YOU WIN"
            }else{
                winner = computer;
                text = "YOU LOSE"
            }
        ;break;
        case "rock" : 
        if(mypic == computerpic){
            draw = true;
            text = "DRAW!!"
        }else if(computerpic == "scissors"){
            winner = my;
            text = "YOU WIN"
        }else{
            winner = computer;
            text = "YOU LOSE"
        }
        ;break;
    }
    setTimeout(() => {
        setWinner(winner,draw,text)
        setScore(text,winner)
    }, 100);
}


function setWinner(w,draw,text){
    let winHeader = document.querySelector(".finish_h");
    winHeader.innerHTML = text;

    if(window.innerWidth < 700){
        gs.to(".choose",.4,{
            padding : "1rem 18vw"
        })
    }else if(window.innerWidth < 1000){
        gs.to(".choose",.4,{
            padding : "1rem 5vw 0 10vw"
        })
    }else if(window.innerWidth < 1200){
        gs.to(".choose",.4,{
            padding : "1rem 12vw"
        })
    }else{
        gs.to(".choose",.4,{
            padding : "1rem 17.2vw"
        })
    }
    gs.to(".finish",0,{
        display: "block",
        opacity : 0,
        zIndex: 20000000
    }).to(".finish",0,{
        opacity : 1
    }).from(".finish",.3,{
        clipPath: "inset(50% 50% 50% 50%)"
    })
    
    setTimeout(() => {
        !draw ?  w.classList.add("win") : null;
    }, 300);
}

function setScore(text,w){
    if(text == "YOU WIN"){
        score++;
        document.querySelector(".score_js").innerHTML = score;
    }else if(text == 'YOU LOSE'){
        score--;
        document.querySelector(".score_js").innerHTML = score;
    }
}


function playAgain(){
    my.classList.remove("win")
    computer.classList.remove("win")

    gs.to(".finish",.5,{
        opacity : 0,
        zIndex: -2
    }).to(".choose", .5,{
        opacity: 0
    }).to(".choose", 0,{
        visibility : "hidden"
    }).to(".main",0,{
        visibility : "visible",
        scale: 0,
        opacity : 0
    }).to(".main",.7,{
        scale: 1,
        opacity: 1,
    })
    if(window.innerWidth < 1200){
        gs.to(".choose",.4,{
            padding : "1rem 18vw"
        })
    }else{
        gs.to(".choose",.4,{
            padding : "1rem 28vw"
        })
    }
    
    
    setTimeout(() => {
        my.removeChild(my.children[1])
        computer.removeChild(computer.children[1])
    }, 1200);
}



let rules = document.querySelector(".btn_rules");
let rulesOpen = false;
rules.addEventListener("click",(e) => {
    rulesOpen = !rulesOpen;
    if(rulesOpen){
        if(window.innerWidth < 450){
            gs.to('.rules',.4,{
                opacity : 1,
                left: "5vw"
            })
        }else if(window.innerWidth < 650){
            gs.to('.rules',.4,{
                opacity : 1,
                left: "10vw"
            })
        }else if(window.innerWidth < 1000){
            gs.to('.rules',.4,{
                opacity : 1,
                left: "15vw"
            })
        }else {
            gs.to('.rules',.4,{
                opacity : 1,
                left: "20vw"
            })
        }
    }else{
        closeRulesF(e)
    }
})

let closeRules = document.querySelector(".rules_close");
closeRules.addEventListener("click", (e) => closeRulesF(e) )

 function closeRulesF(e){
    rulesOpen = false;
    gs.to('.rules',.4,{
        opacity : 0,
        left: "200vw"
    })
 }