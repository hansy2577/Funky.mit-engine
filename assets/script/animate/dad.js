// script create an animation using only inserted images. 
let playDad = false;
let dad = {
  L: null,
  U: null,
  D: null,
  R: null,
  
  hey: null
}


let dad_N_value = 0;
function loadanim_Dad_N(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"Dad N");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  dad.N = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: dad.N.i,
    i2: dad.N.i2,
    i3: dad.N.i3,
    L2: dad.N.L2,
    animLength: dad.N.animLength
  }
  
  let loopBfL = setInterval(() => {

  if (dad.N.i <= dad.N.animLength) {
    if (dad.N.i2 == 0) {
      //document.getElementById(name + dad.N.i).style.zindex = "5px";
      //document.getElementById(name + dad.N.i).style.opacity = 0.5;
       
      document.getElementById(name + dad.N.i).style.visibility = "visible"
      
      
      if (dad.N.i == 0) {
        for (var i = 1; i < dad.N.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      dad.N.i2 = 1;
    } else {
      // document.getElementById(name + dad.N.i).style.zindex = "0"
      // document.getElementById(name + dad.N.i).style.opacity = 1;
      document.getElementById(name + dad.N.i).style.visibility = "hidden"
      
      dad.N.i2 = 0;
      dad.N.i++;
      dad.N.i3 = dad.N.i + 1;
    }
  }
  
  if (dad.N.i >= dad.N.animLength) {
    
    
    dad.N.i = dad.N.animLength;
    dad.N.i2 = dad.N.animLength;
    dad.N.i3 = dad.N.animLength;
    document.getElementById(name + dad.N.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + dad.N.i).style.visibility = "visible";
  }
  //console.log(dad.N.i,document.getElementById("bf" + dad.N.i).style.zindex)
  }, cspeed)
}

setInterval(() => {
  if (game.BPM.beatHit == true && dad.N.i + 1 >= dad.N.animLength) {
    dad.N.i = 0;
    dad.N.i2 = 0;
    dad.N.i3 = 0;
    
    if (dad_N_value <= 1) {
      document.getElementById("Dad N").style.scale = "1"
      
      document.getElementById("Dad L").style.scale = 0.0001
      document.getElementById("Dad U").style.scale = 0.0001
      document.getElementById("Dad D").style.scale = 0.0001
      document.getElementById("Dad R").style.scale = 0.0001
    } else {
      dad_N_value -= 1;
    }
  }
},0)




// make boyfriend all anim

function loadanim_Dad_L(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"Dad L");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  dad.L = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: dad.L.i,
    i2: dad.L.i2,
    i3: dad.L.i3,
    L2: dad.L.L2,
    animLength: dad.L.animLength
  }
  
  let loopBfL = setInterval(() => {

  if (dad.L.i <= dad.L.animLength) {
    if (dad.L.i2 == 0) {
      //document.getElementById(name + dad.L.i).style.zindex = "5px";
      //document.getElementById(name + dad.L.i).style.opacity = 0.5;
       
      document.getElementById(name + dad.L.i).style.visibility = "visible"
      
      
      if (dad.L.i == 0) {
        for (var i = 1; i < dad.L.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      dad.L.i2 = 1;
    } else {
      // document.getElementById(name + dad.L.i).style.zindex = "0"
      // document.getElementById(name + dad.L.i).style.opacity = 1;
      document.getElementById(name + dad.L.i).style.visibility = "hidden"
      
      dad.L.i2 = 0;
      dad.L.i++;
      dad.L.i3 = dad.L.i + 1;
    }
  }
  
  if (dad.L.i >= dad.L.animLength) {
    
    
    dad.L.i = dad.L.animLength;
    dad.L.i2 = dad.L.animLength;
    dad.L.i3 = dad.L.animLength;
    document.getElementById(name + dad.L.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + dad.L.i).style.visibility = "visible";
  }
  //console.log(dad.L.i,document.getElementById("bf" + dad.L.i).style.zindex)
  }, cspeed)
}
function playAnim_Dad_L() {
  dad.L.i = 0;
  dad.L.i2 = 0;
  dad.L.i3 = 0;
  
  dad_N_value = 2;
}



function loadanim_Dad_U(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"Dad U");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  dad.U = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: dad.U.i,
    i2: dad.U.i2,
    i3: dad.U.i3,
    L2: dad.U.L2,
    animLength: dad.U.animLength
  }
  
  let loopBfU = setInterval(() => {

  if (dad.U.i <= dad.U.animLength) {
    if (dad.U.i2 == 0) {
      //document.getElementById(name + dad.U.i).style.zindex = "5px";
      //document.getElementById(name + dad.U.i).style.opacity = 0.5;
      
      document.getElementById(name + dad.U.i).style.visibility = "visible"
      
      
      if (dad.U.i == 0) {
        for (var i = 1; i < dad.U.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      dad.U.i2 = 1;
    } else {
      // document.getElementById(name + dad.U.i).style.zindex = "0"
      // document.getElementById(name + dad.U.i).style.opacity = 1;
      document.getElementById(name + dad.U.i).style.visibility = "hidden"
      
      dad.U.i2 = 0;
      dad.U.i++;
      dad.U.i3 = dad.U.i + 1;
    }
  }
  
  if (dad.U.i >= dad.U.animLength) {
    
    
    dad.U.i = dad.U.animLength;
    dad.U.i2 = dad.U.animLength;
    dad.U.i3 = dad.U.animLength;
    document.getElementById(name + dad.U.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + dad.U.i).style.visibility = "visible";
  }
  //console.log(dad.U.i,document.getElementById("bf" + dad.U.i).style.zindex)
  }, cspeed)
}
function playAnim_Dad_U() {
  dad.U.i = 0;
  dad.U.i2 = 0;
  dad.U.i3 = 0;
  
  dad_N_value = 2;
}


function loadanim_Dad_D(src, name, altName, x, y, s, length_, cspeed = 1) {
  makeLocalAnim(name, "mods/" + game.modsSelect + "/characters/" + src, length_, x, y, s, "Dad D");
  //alert(src + " | " + name + " | " + altName + " | " + x + " | " + y + " | " + length_)
  
  dad.D = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: dad.D.i,
    i2: dad.D.i2,
    i3: dad.D.i3,
    L2: dad.D.L2,
    animLength: dad.D.animLength
  }
  
  let loopBfD = setInterval(() => {
    
    if (dad.D.i <= dad.D.animLength) {
      if (dad.D.i2 == 0) {
        //document.getElementById(name + dad.D.i).style.zindex = "5px";
        //document.getElementById(name + dad.D.i).style.opacity = 0.5;
        
        document.getElementById(name + dad.D.i).style.visibility = "visible"
        
        
        if (dad.D.i == 0) {
          for (var i = 1; i < dad.D.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
        
        dad.D.i2 = 1;
      } else {
        // document.getElementById(name + dad.D.i).style.zindex = "0"
        // document.getElementById(name + dad.D.i).style.opacity = 1;
        document.getElementById(name + dad.D.i).style.visibility = "hidden"
        
        dad.D.i2 = 0;
        dad.D.i++;
        dad.D.i3 = dad.D.i + 1;
      }
    }
    
    if (dad.D.i >= dad.D.animLength) {
      
      
      dad.D.i = dad.D.animLength;
      dad.D.i2 = dad.D.animLength;
      dad.D.i3 = dad.D.animLength;
      document.getElementById(name + dad.D.i).style.visibility = "visible";
      
      
      //clearInterval(loop);
    } else {
      //console.log("j")
      document.getElementById(name + dad.D.i).style.visibility = "visible";
    }
    //console.log(dad.D.i,document.getElementById("bf" + dad.D.i).style.zindex)
  }, cspeed)
}
function playAnim_Dad_D() {
  dad.D.i = 0;
  dad.D.i2 = 0;
  dad.D.i3 = 0;
  
  dad_N_value = 2;
}



function loadanim_Dad_R(src, name, altName, x, y, s, length_, cspeed = 1) {
  makeLocalAnim(name, "mods/" + game.modsSelect + "/characters/" + src, length_, x, y, s, "Dad R");
  //alert(src + " | " + name + " | " + altName + " | " + x + " | " + y + " | " + length_)
  
  dad.R = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: dad.R.i,
    i2: dad.R.i2,
    i3: dad.R.i3,
    L2: dad.R.L2,
    animLength: dad.R.animLength
  }
  
  let loopBfR = setInterval(() => {
    
    if (dad.R.i <= dad.R.animLength) {
      if (dad.R.i2 == 0) {
        //document.getElementById(name + dad.R.i).style.zindex = "5px";
        //document.getElementById(name + dad.R.i).style.opacity = 0.5;
        
        document.getElementById(name + dad.R.i).style.visibility = "visible"
        
        
        if (dad.R.i == 0) {
          for (var i = 1; i < dad.R.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
        
        dad.R.i2 = 1;
      } else {
        // document.getElementById(name + dad.R.i).style.zindex = "0"
        // document.getElementById(name + dad.R.i).style.opacity = 1;
        document.getElementById(name + dad.R.i).style.visibility = "hidden"
        
        dad.R.i2 = 0;
        dad.R.i++;
        dad.R.i3 = dad.R.i + 1;
      }
    }
    
    if (dad.R.i >= dad.R.animLength) {
      
      
      dad.R.i = dad.R.animLength;
      dad.R.i2 = dad.R.animLength;
      dad.R.i3 = dad.R.animLength;
      document.getElementById(name + dad.R.i).style.visibility = "visible";
      
      
      //clearInterval(loop);
    } else {
      //console.log("j")
      document.getElementById(name + dad.R.i).style.visibility = "visible";
    }
    //console.log(dad.R.i,document.getElementById("bf" + dad.R.i).style.zindex)
  }, cspeed)
}
function playAnim_Dad_R() {
  dad.R.i = 0;
  dad.R.i2 = 0;
  dad.R.i3 = 0;
  
  dad_N_value = 2;
}