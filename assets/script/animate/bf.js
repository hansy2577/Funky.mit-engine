// script create an animation using only inserted images. 
let playBf = false;
let bf = {
  L: null,
  U: null,
  D: null,
  R: null,
  
  hey: null
}


let bf_N_value = 0;
function loadanim_bf_N(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"bf N");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  bf.N = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: bf.N.i,
    i2: bf.N.i2,
    i3: bf.N.i3,
    L2: bf.N.L2,
    animLength: bf.N.animLength
  }
  
  let loopBfL = setInterval(() => {

  if (bf.N.i <= bf.N.animLength) {
    if (bf.N.i2 == 0) {
      //document.getElementById(name + bf.N.i).style.zindex = "5px";
      //document.getElementById(name + bf.N.i).style.opacity = 0.5;
       
      document.getElementById(name + bf.N.i).style.visibility = "visible"
      
      
      if (bf.N.i == 0) {
        for (var i = 1; i < bf.N.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      bf.N.i2 = 1;
    } else {
      // document.getElementById(name + bf.N.i).style.zindex = "0"
      // document.getElementById(name + bf.N.i).style.opacity = 1;
      document.getElementById(name + bf.N.i).style.visibility = "hidden"
      
      bf.N.i2 = 0;
      bf.N.i++;
      bf.N.i3 = bf.N.i + 1;
    }
  }
  
  if (bf.N.i >= bf.N.animLength) {
    
    
    bf.N.i = bf.N.animLength;
    bf.N.i2 = bf.N.animLength;
    bf.N.i3 = bf.N.animLength;
    document.getElementById(name + bf.N.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + bf.N.i).style.visibility = "visible";
  }
  //console.log(bf.N.i,document.getElementById("bf" + bf.N.i).style.zindex)
  }, cspeed)
}

setInterval(() => {
  if (game.BPM.beatHit == true && bf.N.i + 1 >= bf.N.animLength) {
    bf.N.i = 0;
    bf.N.i2 = 0;
    bf.N.i3 = 0;
    
    if (bf_N_value <= 1) {
      document.getElementById("bf N").style.scale = "1"
      
      document.getElementById("bf L").style.scale = 0.0001
      document.getElementById("bf U").style.scale = 0.0001
      document.getElementById("bf D").style.scale = 0.0001
      document.getElementById("bf R").style.scale = 0.0001
    } else {
      bf_N_value -= 1;
    }
  }
},0)




// make boyfriend all anim

function loadanim_bf_L(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"bf L");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  bf.L = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: bf.L.i,
    i2: bf.L.i2,
    i3: bf.L.i3,
    L2: bf.L.L2,
    animLength: bf.L.animLength
  }
  
  let loopBfL = setInterval(() => {

  if (bf.L.i <= bf.L.animLength) {
    if (bf.L.i2 == 0) {
      //document.getElementById(name + bf.L.i).style.zindex = "5px";
      //document.getElementById(name + bf.L.i).style.opacity = 0.5;
       
      document.getElementById(name + bf.L.i).style.visibility = "visible"
      
      
      if (bf.L.i == 0) {
        for (var i = 1; i < bf.L.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      bf.L.i2 = 1;
    } else {
      // document.getElementById(name + bf.L.i).style.zindex = "0"
      // document.getElementById(name + bf.L.i).style.opacity = 1;
      document.getElementById(name + bf.L.i).style.visibility = "hidden"
      
      bf.L.i2 = 0;
      bf.L.i++;
      bf.L.i3 = bf.L.i + 1;
    }
  }
  
  if (bf.L.i >= bf.L.animLength) {
    
    
    bf.L.i = bf.L.animLength;
    bf.L.i2 = bf.L.animLength;
    bf.L.i3 = bf.L.animLength;
    document.getElementById(name + bf.L.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + bf.L.i).style.visibility = "visible";
  }
  //console.log(bf.L.i,document.getElementById("bf" + bf.L.i).style.zindex)
  }, cspeed)
}
function playAnim_bf_L() {
  bf.L.i = 0;
  bf.L.i2 = 0;
  bf.L.i3 = 0;
  
  bf_N_value = 2;
}



function loadanim_bf_U(src,name,altName,x,y,s,length_,cspeed = 1) {
  makeLocalAnim(name,"mods/"+game.modsSelect+"/characters/"+src,length_,x,y,s,"bf U");
  //alert(src+" | "+name+" | "+altName+" | "+x+" | "+y+" | "+length_)
  
  bf.U = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: bf.U.i,
    i2: bf.U.i2,
    i3: bf.U.i3,
    L2: bf.U.L2,
    animLength: bf.U.animLength
  }
  
  let loopBfU = setInterval(() => {

  if (bf.U.i <= bf.U.animLength) {
    if (bf.U.i2 == 0) {
      //document.getElementById(name + bf.U.i).style.zindex = "5px";
      //document.getElementById(name + bf.U.i).style.opacity = 0.5;
      
      document.getElementById(name + bf.U.i).style.visibility = "visible"
      
      
      if (bf.U.i == 0) {
        for (var i = 1; i < bf.U.animLength + 1; i++) {
          document.getElementById(name + i).style.visibility = "hidden";
        }
      }
      
      bf.U.i2 = 1;
    } else {
      // document.getElementById(name + bf.U.i).style.zindex = "0"
      // document.getElementById(name + bf.U.i).style.opacity = 1;
      document.getElementById(name + bf.U.i).style.visibility = "hidden"
      
      bf.U.i2 = 0;
      bf.U.i++;
      bf.U.i3 = bf.U.i + 1;
    }
  }
  
  if (bf.U.i >= bf.U.animLength) {
    
    
    bf.U.i = bf.U.animLength;
    bf.U.i2 = bf.U.animLength;
    bf.U.i3 = bf.U.animLength;
    document.getElementById(name + bf.U.i).style.visibility = "visible";
    
    
    //clearInterval(loop);
  } else {
    //console.log("j")
    document.getElementById(name + bf.U.i).style.visibility = "visible";
  }
  //console.log(bf.U.i,document.getElementById("bf" + bf.U.i).style.zindex)
  }, cspeed)
}
function playAnim_bf_U() {
  bf.U.i = 0;
  bf.U.i2 = 0;
  bf.U.i3 = 0;
  
  bf_N_value = 2;
}


function loadanim_bf_D(src, name, altName, x, y, s, length_, cspeed = 1) {
  makeLocalAnim(name, "mods/" + game.modsSelect + "/characters/" + src, length_, x, y, s, "bf D");
  //alert(src + " | " + name + " | " + altName + " | " + x + " | " + y + " | " + length_)
  
  bf.D = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: bf.D.i,
    i2: bf.D.i2,
    i3: bf.D.i3,
    L2: bf.D.L2,
    animLength: bf.D.animLength
  }
  
  let loopBfD = setInterval(() => {
    
    if (bf.D.i <= bf.D.animLength) {
      if (bf.D.i2 == 0) {
        //document.getElementById(name + bf.D.i).style.zindex = "5px";
        //document.getElementById(name + bf.D.i).style.opacity = 0.5;
        
        document.getElementById(name + bf.D.i).style.visibility = "visible"
        
        
        if (bf.D.i == 0) {
          for (var i = 1; i < bf.D.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
        
        bf.D.i2 = 1;
      } else {
        // document.getElementById(name + bf.D.i).style.zindex = "0"
        // document.getElementById(name + bf.D.i).style.opacity = 1;
        document.getElementById(name + bf.D.i).style.visibility = "hidden"
        
        bf.D.i2 = 0;
        bf.D.i++;
        bf.D.i3 = bf.D.i + 1;
      }
    }
    
    if (bf.D.i >= bf.D.animLength) {
      
      
      bf.D.i = bf.D.animLength;
      bf.D.i2 = bf.D.animLength;
      bf.D.i3 = bf.D.animLength;
      document.getElementById(name + bf.D.i).style.visibility = "visible";
      
      
      //clearInterval(loop);
    } else {
      //console.log("j")
      document.getElementById(name + bf.D.i).style.visibility = "visible";
    }
    //console.log(bf.D.i,document.getElementById("bf" + bf.D.i).style.zindex)
  }, cspeed)
}
function playAnim_bf_D() {
  bf.D.i = 0;
  bf.D.i2 = 0;
  bf.D.i3 = 0;
  
  bf_N_value = 2;
}



function loadanim_bf_R(src, name, altName, x, y, s, length_, cspeed = 1) {
  makeLocalAnim(name, "mods/" + game.modsSelect + "/characters/" + src, length_, x, y, s, "bf R");
  //alert(src + " | " + name + " | " + altName + " | " + x + " | " + y + " | " + length_)
  
  bf.R = {
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: length_
  };
  
  var localAnimValue = {
    i: bf.R.i,
    i2: bf.R.i2,
    i3: bf.R.i3,
    L2: bf.R.L2,
    animLength: bf.R.animLength
  }
  
  let loopBfR = setInterval(() => {
    
    if (bf.R.i <= bf.R.animLength) {
      if (bf.R.i2 == 0) {
        //document.getElementById(name + bf.R.i).style.zindex = "5px";
        //document.getElementById(name + bf.R.i).style.opacity = 0.5;
        
        document.getElementById(name + bf.R.i).style.visibility = "visible"
        
        
        if (bf.R.i == 0) {
          for (var i = 1; i < bf.R.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
        
        bf.R.i2 = 1;
      } else {
        // document.getElementById(name + bf.R.i).style.zindex = "0"
        // document.getElementById(name + bf.R.i).style.opacity = 1;
        document.getElementById(name + bf.R.i).style.visibility = "hidden"
        
        bf.R.i2 = 0;
        bf.R.i++;
        bf.R.i3 = bf.R.i + 1;
      }
    }
    
    if (bf.R.i >= bf.R.animLength) {
      
      
      bf.R.i = bf.R.animLength;
      bf.R.i2 = bf.R.animLength;
      bf.R.i3 = bf.R.animLength;
      document.getElementById(name + bf.R.i).style.visibility = "visible";
      
      
      //clearInterval(loop);
    } else {
      //console.log("j")
      document.getElementById(name + bf.R.i).style.visibility = "visible";
    }
    //console.log(bf.R.i,document.getElementById("bf" + bf.R.i).style.zindex)
  }, cspeed)
}
function playAnim_bf_R() {
  bf.R.i = 0;
  bf.R.i2 = 0;
  bf.R.i3 = 0;
  
  bf_N_value = 2;
}