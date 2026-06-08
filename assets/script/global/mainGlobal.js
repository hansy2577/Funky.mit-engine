let global = {
  version: "2.5",
  tab: "menu",
  frameLimite: 20,
  pauseGameState: false
}

function PreError(message,stopGame,toMenu) {
  alert("error | "+message)
  if (stopGame == true) {
    document.body.remove()
    window.close()
    sessionStorage.setItem("game close",true)
  }
  
  if (toMenu == true) {
    window.location = "menu.html";
  }
}

function transition(type,custom = false) {
  var number = 0;
  var x = -80;
  var loop = setInterval(() => {
    number++;
    x += 50;
    
    if (number <= 15) {
      // make the element
      var element = document.createElement("div")
      document.body.appendChild(element);
      element.style.height = "700px"
      element.style.width = "100px";
      element.style.position = "absolute"
      element.style.top = "-40px";
      element.style.left = x + "px";
      element.style.backgroundColor = "black";
      element.style.zIndex = 10;
      
      var transitionInTransition = function() {
        var y = 10;
        var opacity = 1;
        var loop3 = setInterval(() => {
          // after some sec
          y -= 1;
          opacity -= 0.005
          element.style.top = y + "px";
          element.style.opacity = opacity;
          if (y <= -90) {
            clearInterval(loop3)
            clearInterval(loop)
            element.remove()
            
            if (type == 1 || type == 2) {
              //PreError("fail to change tab", true, false)
            }
          
            return true;
          }
        }, 0)
      }
      
      var start = setInterval(() => {
        // after some sec
        
        if (type == 0) {  // to freeplay
          document.getElementById("mmh").style.visibility = "hidden"
          document.getElementById("freeplay").style.visibility = "visible"
          menu.inFreeplay = true;
        }
           
        if (type == 1) {  // to game
          document.body.remove()
          window.location = "game.html";
        }

        if (type == 2) {  // to menu
          document.body.remove()
          window.location = "menu.html";
        }
        
        if (type == 3) {  // to game
          document.body.remove()
          window.location = "editor2.html";
        }
        
        if (type == 4) {  // to freeplay directly
          document.body.remove()
          window.location = "freeplay-menu.html";
        }
        
        if (custom) {
          document.body.remove()
          window.location = type+".html";
        }

        clearInterval(loop2);
        console.clear()
        transitionInTransition()
      }, 2000)

      }
    }, 20)
}

function bpmTomillisecond(bpm) {
  const ms = 60000 / bpm;
  return ms;
}

function fpsToMS(fps) {
  if (typeof fps !== "number" || !isFinite(fps) || fps <= 0) {
    throw new Error("FPS must be a positive number.");
  }
  alert(1000 / fps)
}

// initiating 

if (localStorage.getItem("FM : fps") !== null) {
  global.frameLimite = fpsToMS(localStorage.getItem("FM : fps"))
} else {
  global.frameLimite = 16;
}

document.addEventListener('keydown', function(event) {
  if (event.key == "7") {
    transition(3)
  }
});
