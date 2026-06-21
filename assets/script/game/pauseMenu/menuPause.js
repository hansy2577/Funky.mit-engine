document.addEventListener('keydown', function(event) {
  if (event.key == "Enter") {
    if (game.isStarting == true) {
      document.getElementById("pauseMenu:resume").onclick()
    }
  }
  
  if (event.key == "Backspace" && game.menuPause.activate) {
    document.getElementById("pauseMenu:exit").onclick()
  }
})

window.onblur = function () {
  if (game.menuPause.activate == false && game.isStarting == true) {
    pauseMenu()
  }
}

let pauseSound = null;
function loadPauseMenu() {
  pauseSound = new Audio("mods/"+game.modsSelect+"/music/menuSong/cha-ching !!!.mp3")
  pauseSound.loop = true;
  
setInterval(() => {
  if (pauseSound.volume <= 0.7 && game.menuPause.activate == true) {
    pauseSound.volume += 0.0007;
  } 
  
  if (pauseBG_opacity <= 1) {
    document.getElementById("pauseMenu").style.opacity = pauseBG_opacity; 
    pauseBG_opacity += 0.07;
  }
}, global.frameLimite)
}

// load element before show pause screen

var pauseBG_opacity = 0
function playMenuSong() { 
  if (game.menuPause.activate == true) {
    pauseBG_opacity = 0;
    document.getElementById("pauseMenu").style.zIndex = 11; 
    document.getElementById("pauseMenu").style.opacity = pauseBG_opacity; 
    
    pauseSound.volume = 0;
    pauseSound.play()
  } else {
    pauseSound.pause();
  }
}

function pauseMenu() {
  if (game.menuPause.activate == false) {
    game.menuPause.activate = true;
    game.pauseGameState = true;

    game.song.inst.pause()
    
    if (game.song.metadata["is Voice"]) {
      game.song.voice.pause()
    }
    
    if (game.song.metadata["is Voice2"]) {
      game.song.voice2.pause()
    }
    
    game.canMoveNote = false;
    playMenuSong()
    
    document.getElementById("pauseMenu").style.visibility = "visible";
  } else {
    game.menuPause.activate = false;
    game.pauseGameState = false;

    game.song.inst.play()
    
    if (game.song.metadata["is Voice"]) {
      game.song.voice.play()
    }
    
    if (game.song.metadata["is Voice2"]) {
      game.song.voice2.play()
    }
    
    game.canMoveNote = true;
    playMenuSong()
    
    document.getElementById("pauseMenu").style.visibility = "hidden";
  }
}