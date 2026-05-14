/* put your custom script here !
you can't do multiple script in this folder sorry
but there more customisations than pysch engine like...

for 

*/

//game.pauseGameState = true;

/*
var value = 0
setInterval(() => {
  value += 0.1;
  game.notes[0].style.left = (Math.cos(value + 0) * 30)+ 100 +"px";
  game.notes[1].style.left = (Math.cos(value + 300) *70) + 150+"px";
  game.notes[2].style.left = (Math.cos(value + 600) * 70)+ 200 +"px";
  game.notes[3].style.left = (Math.cos(value + 900) * 30)+ 250 +"px";
},0)
*/


var cardboard = document.createElement("img");
//document.getElementById("GAME").appendChild(cardboard)
cardboard.src = game.modsFolder + "/Images/cardboard.png";
cardboard.style.position = "absolute";
cardboard.style.left = "-100px";
cardboard.style.top = "-40px";
cardboard.style.scale = 0.2;
cardboard.style.zIndex = "6";