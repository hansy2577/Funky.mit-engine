function ScreenBeat(intensity,speed) {
  var defaultZoom = document.getElementById("GAME").style.scale;
  var s = intensity;
  
  document.getElementById("GUI").style.transform = "scale("+intensity+")";
  document.getElementById("GAME").style.transform = "scale("+intensity*1.01+")";

  FMS_makeCSSanim("GUI",speed,"ease-out",speed,[
    { transform: 'scale(1)' }
  ]).onfinish = function () {
    document.getElementById("GUI").style.transform = "scale("+1+")"; 
  }
  
  FMS_makeCSSanim("GAME",speed,"ease-out",speed*1.2,[
    { transform: 'scale(1)' }
  ]).onfinish = function () {
    document.getElementById("GAME").style.transform = "scale("+1+")"; 
  }
}

function camZoom(zoom = 1,ease = "ease-out",speed = 1) {
  var myAnimation = FMS_makeCSSanim("GAME",speed,ease,"1",[
    { transform: 'scale('+zoom+","+zoom+')' }
  ])
  
  myAnimation.play()
  myAnimation.onfinish = function () { 
    document.getElementById("GAME").style.transform = "scale("+zoom+","+zoom+")";
  }
}

function gameEvents() {
  var value = { a: 0, b:0 };
  
  setInterval(() => {
    if (game.events.onBeatHit == true) {
      game.events.onBeatHit = false;
    } 
    
    if (game.events.onStepHit == true) {
      game.events.onStepHit = false;
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
  
    if (game.events.onNotesHit == true) {
      game.events.onNotesHit = false;
    }
  },100)
}

function cameraPos(x,y,angle,speed) {
  //in w.i.p
}

function goodNoteHit() {
  game.scores += 130;
}