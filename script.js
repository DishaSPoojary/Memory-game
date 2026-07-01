const icons=[
"🍎","🍌","🍇","🍉",
"🍒","🥝","🍍","🥥",
"⭐","🔥","🌙","🚀"
];


let game=document.getElementById("game");

let moves=0;
let time=0;

let first=null;
let second=null;

let lock=false;

let timer;



function startGame(size){

document.getElementById("menu").classList.add("hidden");

document.getElementById("gameArea").classList.remove("hidden");


clearInterval(timer);


let selected=icons.slice(0,size/2);

let cards=[...selected,...selected];


cards.sort(()=>Math.random()-0.5);


game.innerHTML="";

moves=0;
time=0;


document.getElementById("moves").innerHTML=0;
document.getElementById("time").innerHTML=0;


cards.forEach(icon=>{


let card=document.createElement("div");


card.className="card";

card.innerHTML="?";


card.onclick=()=>flip(card,icon);


game.appendChild(card);


});


timer=setInterval(()=>{

time++;

document.getElementById("time").innerHTML=time;

},1000);


}



function flip(card,icon){


if(lock || card.classList.contains("open"))
return;


card.innerHTML=icon;

card.classList.add("open");


if(!first){

first={card,icon};

}

else{

second={card,icon};

moves++;

document.getElementById("moves").innerHTML=moves;


check();

}


}



function check(){


if(first.icon===second.icon){


first=null;
second=null;


if(document.querySelectorAll(".open").length===document.querySelectorAll(".card").length){

clearInterval(timer);


let score=time+moves;


document.getElementById("score").innerHTML=score;

document.getElementById("popup").classList.remove("hidden");

}


}


else{


lock=true;


setTimeout(()=>{


first.card.innerHTML="?";

second.card.innerHTML="?";


first.card.classList.remove("open");

second.card.classList.remove("open");


first=null;
second=null;

lock=false;


},700);


}


}