function ScreenBeat(intensity,speed) {
  var defaultZoom = document.getElementById("GAME").style.scale;
  var s = intensity;
  
  /*document.getElementById("GAME").style.transform = "scale("+intensity+","+intensity+")";
  var myAnimation = FMS_makeCSSanim("GUI",speed,"ease-out","1",[
    { transform: 'scale(1,1)' }
  ]).onfinish = function () {
    document.getElementById("GAME").style.transform = "scale("+1+","+1+")"; 
  }*/
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
  
  if (game.events.onBeatHit) {
    //console.log(`7`)
  }
},0.1)

function beatHitEvents() {
  var wait = setInterval(() => {
  if (game.events.onBeatHit == true) {
    game.events.onBeatHit = false;
  }
  
  /*if (game.events.onStepHit == true) {
    game.events.onStepHit = false;
  }*/
  
  clearInterval(wait)
  }, 0)
}


function cameraPos(x,y,angle,speed) {
  //in w.i.p
}

function goodNoteHit() {
  game.scores += 130;
}