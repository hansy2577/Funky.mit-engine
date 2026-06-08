function ScreenBeat(intensity,speed) {
  var defaultZoom = document.getElementById("GAME").style.scale;
  var s = intensity;
  var loop = setInterval(() => {
   // pretty simple, right ?
    document.getElementById("GAME").style.transform = "scale("+s+")";
    document.getElementById("GUI").style.transform = "scale("+s+")";
    
    if (s >= 1) {
      s -= speed;
    } else {
      clearInterval(loop);  // stop the loop
    }
  },20)
}

function camZoom(zoom = 1,ease = "ease-out",speed = 1) {
  var myAnimation = HJS_makeCSSanim("GAME",speed,ease,"1",[
    { transform: 'scale('+zoom+","+zoom+')' }
  ])
  
  myAnimation.play()
  myAnimation.onfinish = function () { 
    document.getElementById("GAME").style.transform = "scale("+zoom+","+zoom+")";
  }
}

// in wip
/* 
var value = 0;
setInterval(() => {
  if (game.BPM.beat4Hit == true) {
    if (value == 0) {
      camZoom(2, "ease-out", 2)
      value = 1;
    } else {
      camZoom(1, "ease-out", 1)
      value = 0;
    }
  }
}, 0)
*/

setInterval(() => {
  if (game.events.onNotesHit == true) {
    game.events.onNotesHit = false;
  }
  
  if (game.events.onMiss == true) {
    game.events.onMiss = false;
  }

  if (game.events.onGoodNotesHit == true) {
    game.events.onGoodNotesHit = false;
  }

  if (game.events.onNotesOpponentHit == true) {
    game.events.onNotesOpponentHit = false;
  }
},5)

function cameraPos(x,y,angle,speed) {
  game.cam.x = x;
  game.cam.y = y;
  game.cam.angle = 0;
  game.cam.speed = speed;
}

function goodNoteHit() {
  game.scores += 130;
}