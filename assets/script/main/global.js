function PreError(message,stopGame,toMenu) {
  alert("error | "+message)
  if (stopGame == true) {
    document.body.remove()
    window.close()
    sessionStorage.setItem("game close",true)
  }
  
  if (toMenu == true) {
    window.location = "menu.html"
  }

}

function transition(type) {
  var number = 0;
  var x = -80;
  setInterval(() => {
    number++;
    x += 50;
    
    if (number <= 15) {
      // make the element
      var element = document.createElement("div")
      document.body.appendChild(element);
      element.style.height = "500px"
      element.style.width = "60px";
      element.style.position = "absolute"
      element.style.top = "-10px";
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
            element.remove()
          
            return true;
          }
        }, 0)
      }
      
      var loop2 = setInterval(() => {
        // after some sec
        
        if (type == 0) {  // to freeplay
          document.getElementById("mmh").style.visibility = "hidden"
          document.getElementById("freeplay").style.visibility = "visible"
          menu.inFreeplay = true;
        }
           
        if (type == 1) {  // to game
          window.location = "game.html";
        }

        if (type == 2) {  // to freeplay ( directly )
          window.location = "menu.html";
        }

        clearInterval(loop2);
        transitionInTransition()
      }, 2000)
    }
  }, 20)
}