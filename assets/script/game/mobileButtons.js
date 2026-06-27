function MakeMobileButtonsNotes(inGame) {
  var interval = 0;
  var x = -160;
  var loop = setInterval(() => {
    
    x += 150
    if (interval <= 3) {
      var type = interval;
      var element = document.createElement("div")
      
      if (inGame == true) {
        document.getElementById("GUI").appendChild(element);
      } else {
        document.body.appendChild(element);
      }
      
      element.style.height = "500px"
      element.style.width = "150px";
      element.style.position = "absolute";
      element.style.top = "-10px";
      element.style.left = x + "px";
      element.style.backgroundColor = "blue";
      element.style.zIndex = 10;
      element.style.opacity = 0;
      
      element.onpointerdown = function () {
          if (inGame == true) {
            game.notes[type].onpointerdown()
            //element.style.opacity = 0.2;
          }
      }

      element.onpointerout = function () {
          if (inGame == true) {
            game.notes[type].onpointerout()
            //element.style.opacity = 0;
          }
      }
       interval++;
    } else {
      clearInterval(loop)
    }
  },1)
}