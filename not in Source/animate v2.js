// script create an animation using only inserted images. 

makeLocalAnim("euuuuuh","mods/test/characters/BF/L",3,0,0,1,"body",60,true)
playLocalAnim("euuuuuh")

setInterval(() => {
  stopLocalAnim("euuuuuh",false)
},1000)

function removeLocalAnim(name) {
  // not done yet
}

function stopLocalAnim(name,afterEnd) {
  document.getElementById(name + " folder").style.left = "0.1px";
}

function playLocalAnim(name) {
  document.getElementById(name + " folder").style.top = "0.1px";
}

function makeLocalAnim(name,animScr,animLength, x,y,s,putIn,speed,isLoop) {
  var animData = document.createElement("div")
  animData.id = name+" folder";
  animData.style.left = "0px"
  animData.style.top = "0px"
  document.body.appendChild(animData);
    
  for (var i = 0; i < animLength + 1; i++) {
      var thing = document.createElement("img");
      document.getElementById(name+" folder").appendChild(thing);

      // custom setting
      thing.style.scale = s
      thing.style.position = "absolute";
      thing.style.top = y+"px"
      thing.style.left = x+"px"
      thing.style.zindex = "4";
      thing.onerror = function () {
        PreError("fail to load the characters "+name+" at the frame "+i+"", true)
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

  // make boyfriend all anim
  
  var animate = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: animLength
  };
  
  var animLoop = setInterval(() => {
    if (animate.i <= animate.animLength) {
      if (animate.i2 == 0) {
        //document.getElementById(name + animate.i).style.zindex = "5px";
        //document.getElementById(name + animate.i).style.opacity = 0.5;
       
        document.getElementById(name + animate.i).style.visibility = "visible"
      
        if (animate.i == 0) {
          for (var i = 1; i < animate.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
      
        animate.i2 = 1;
      } else {
        // document.getElementById(name + animate.i).style.zindex = "0"
        // document.getElementById(name + animate.i).style.opacity = 1;
        document.getElementById(name + animate.i).style.visibility = "hidden"
      
        animate.i2 = 0;
        animate.i++;  
        animate.i3 = animate.i + 1;
      }
    }
  
    if (animate.i >= animate.animLength) {
    
      if (isLoop == true) {
        animate.i = 0;
        animate.i2 = 0;
        animate.i3 = 0;
        
        document.getElementById(name + animate.i).style.visibility = "visible";
      } else {
        animate.i = animate.animLength;
        animate.i2 = animate.animLength;
        animate.i3 = animate.animLength;
        document.getElementById(name + animate.i).style.visibility = "visible";
      }
    
      //clearInterval(loop);
    } else {
      document.getElementById(name + animate.i).style.visibility = "visible";
    }
    //console.log(animate.i,document.getElementById("bf" + animate.i).style.zindex)
  }, speed)
    
  var otherLoop = setInterval(() => {
    if (document.getElementById(name + " folder").style.top == "0.1px") {
      for (var i = 0; i < animLength + 1; i++) {
        document.getElementById(name+i).style.visibility = "hidden";
        console.log("reset"+i)
      }

      animate.i = 0;
      animate.i2 = 0;
      animate.i3 = 0;
      document.getElementById(name + " folder").style.top = "0px";
      document.getElementById(name + animate.i).style.visibility = "visible";
    }

    if (document.getElementById(name + " folder").style.left == "0.1px") {
      clearInterval(animLoop)
      document.getElementById(name + " folder").style.top = "0px";
    }

  },0)
}
