// script create an animation using only inserted images. 
function makeLocalAnim(name,animScr,animLength, x,y,s,putIn) {
  for (var i = 0; i < animLength + 1; i++) {
    
    var thing = document.createElement("img");
    document.getElementById(putIn).appendChild(thing);

    // custom setting
    thing.style.scale = s
    thing.style.position = "absolute";
    thing.style.top = y+"px"
    thing.style.left = x+"px"
    thing.style.zindex = "4";
    thing.onerror = function () {
      PreError("fail to load the characters"+name+" at the frame "+i+"", true)
    }
    //thing.style.backgroundColor = "black";

    // do not modify 
    thing.id = name + i;
    //thing.style.visibility = "hidden";
    if (i <= 9) {
      thing.src = animScr + "000" +i + ".png";
    } else {
      thing.src = animScr + "00" +i + ".png";
    }
    
    
    console.log(""+thing.src + " | "+animScr+" create")
  }
}