document.addEventListener('keydown', function(event) {
  if (event.key == "Enter") {
    pauseMenu()
  }
})

window.onblur = function () {
  if (game.menuPause.activate == false) {
    pauseMenu()
  }
}

let pauseSound = null;
function loadPauseMenu() {
  pauseSound = new Audio("mods/"+game.modsSelect+"/music/MenuPause.ogg")
  pauseSound.loop = true;
  
setInterval(() => {
  if (pauseSound.volume <= 0.7 && game.menuPause.activate == true) {
    pauseSound.volume += 0.0002;
    if (pauseBG_opacity <= 0.7) {
      pauseBG.style.opacity = pauseBG_opacity; 
      pauseBG_opacity += 0.01;
    }
  }
},0)

}

// load element before show pause screen

let pauseBG = document.createElement("div");
document.getElementById("GUI").appendChild(pauseBG)
pauseBG.style.cssText = "position: absolute; left: -10px; top: -10px;"
pauseBG.style.backgroundColor = "black"
pauseBG.style.opacity = 0.7;
pauseBG.style.zIndex = 10;
pauseBG.style.width = "1000px"
pauseBG.style.height = "1000px"
pauseBG.style.visibility = "hidden";


var pauseBG_opacity = 0
function playMenuSong() { 
  if (game.menuPause.activate == true) {
    pauseBG_opacity = 0;
    pauseBG.style.opacity = pauseBG_opacity; 
    
    pauseSound.volume = 0;
    pauseSound.play()
  } else {
    pauseSound.pause();
  }
}

function pauseMenu() {
  if (game.menuPause.activate == false) {
    game.menuPause.activate = true;

    game.song.inst.pause()
    game.song.voice.pause()
    game.song.voice2.pause()
    
    game.canMoveNote = false;
    playMenuSong()
    
    pauseBG.style.visibility = "visible";
  } else {
    game.menuPause.activate = false;

    game.song.inst.play()
    game.song.voice.play()
    game.song.voice2.play()
    
    game.canMoveNote = true;
    playMenuSong()
    
    pauseBG.style.visibility = "hidden";
  }
}