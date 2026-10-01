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
  if (pauseSound.volume <= 0.4 && game.menuPause.activate == true) {
    pauseSound.volume += 0.0007;
  } 
}, global.frameLimite)
}

// load element before show pause screen

var pauseBG_opacity = 0
function playMenuSong() { 
  if (game.menuPause.activate) {
    document.getElementById("pauseMenu").style.zIndex = 11; 
    pauseSound.volume = 0;
    pauseSound.play()
  } else {
    pauseSound.pause();
  }
}

function pauseMenu() {
  if (game.menuPause.activate == false) {
    // open
    FMS_makeCSS_opacity("pauseMenu",0.5,[0,1],"ease-out",1)
    
    stopBPM()
    
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
    // close
    FMS_makeCSS_opacity("pauseMenu",0.5,[1,0],"ease-out",1)
    FMS_makeCSS_Ypos("pauseMenu",1,[0,100],"ease-out",1)

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