let global = {
  version: "5.3",
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

function transition(type,custom = false,func,customLink = false) {
  var number = 0;
  var x = -80;
  var intensity = 1.1;   // speed
  
  if (!custom && func == null) {
    FMS_makeCSSanim(document.body.id,1,"ease-out",0.7,[
      { filter:"brightness(-500%)", opacity: 0.2}]).onfinish = function () {
      document.body.style.filter = "brightness(-500%)";
      document.body.style.opacity = 0.2;
    }
  } else {
    func();
  }
  
  var loop = setInterval(() => {
    number += intensity;
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
          
          window.location = "game.html";
        }

        if (type == 2) {  // to menu
          
          window.location = "menu.html";
        }
        
        if (type == 3) {  // to game
          
          window.location = "editor2.html";
        }
        
        if (type == 4) {  // to freeplay directly
          
          window.location = "freeplay-menu.html";
        }
        
        if (customLink) {
          window.location = type+".html";
        }

        clearInterval(start);
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
  return (1000 / fps);
}

// initiating 

if (FMD_getStorage("FM : fps") !== null) {
  global.frameLimite = fpsToMS(FMD_getStorage("FM : fps"))
} else {
  global.frameLimite = 16;
}

document.addEventListener('keydown', function(event) {
  if (event.key == "7") {
    transition(3)
  }
});


