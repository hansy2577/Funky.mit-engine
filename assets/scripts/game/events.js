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

function coreEvents_BeatHit() {
  beatHit()
}

function coreEvents_stepHit() {
  stepHit();
}

function coreEvents_onMiss(longNotes) {
  onMiss(longNotes)
}

function coreEvents_onNotesHit(longNotes) {
  onNotesHit(longNotes);
}

// all function events (don't use it, is for the mods)
function beatHit() {}
function stepHit() {}
function onMiss(longNotes) {}
function onNotesHit(longNotes) {};
function onNotesOpponentHit() {};

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
  
}

function cameraPos(x,y,angle,speed) {
  //in w.i.p
}
