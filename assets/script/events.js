function ScreenBeat(intensity,speed) {
  var defaultZoom = document.getElementById("GAME").style.scale;
  var s = intensity;
  var loop = setInterval(() => {
   // pretty simple, right ?
    document.getElementById("GAME").style.scale = s;
    document.getElementById("GUI").style.scale = s;
    
    if (s >= 1) {
      s -= speed;
    } else {
      clearInterval(loop);  // stop the loop
    }
  },0)
}

function cameraPos(x,y,angle,speed) {
  game.cam.x = x;
  game.cam.y = y;
  game.cam.angle = 0;
  game.cam.speed = speed;
}

function goodNoteHit() {
  game.scores += 130;
}