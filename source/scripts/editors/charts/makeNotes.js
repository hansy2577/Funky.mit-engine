let noteZoneSpawn = 10;
let noteRealyHere = false;

let noteReset = false;
let canMake = true;

let user_yDe = 0;
let user_xDe = 2;
let xDe = 7;
let yDe = -3;

function makeNotes(x,y) {
  if (x >= 305 && x <= 474 && y <= 320) {
    var xx = x - 80;
    var yy = y - 80;
    var localstep = chartEditor.step;
    var dat = FMS_makeImage("","assets/images/editor/note.png",x,y,10,0.12,"notes")
    dat.onclick = function() {
      noteRealyHere = true;
      dat.remove();
    }
    // grille ( god )

    if (yy <= -55- user_yDe) {
      yy = -69 - yDe
    } else {
      if (yy <= -40 - user_yDe) {
        yy = -49 - yDe;
      } else {
        if (yy <= -20 - user_yDe) {
          yy = -28 - yDe;
        } else {
          if (yy <= 0 - user_yDe) {
            yy = -7 - yDe;
          } else {
            if (yy <= 20 - user_yDe) {
              yy = 14 - yDe;
            } else {
              if (yy <= 40 - user_yDe) {
                yy = 34 - yDe;
              } else {
                if (yy <= 60 - user_yDe) {
                  yy = 54 - yDe;
                } else {
                  if (yy <= 80 - user_yDe) {
                    yy = 74 - yDe;
                  } else {
                    if (yy <= 100 - user_yDe) {
                      yy = 95 - yDe;
                    } else {
                      if (yy <= 120 - user_yDe) {
                        yy = 116- yDe;;
                      } else {
                        if (yy <= 140 - user_yDe) {
                          yy = 136- yDe;
                        } else {
                          if (yy <= 160 - user_yDe) {
                            yy = 156 - yDe;
                          } else {
                            if (yy <= 180 - user_yDe) {
                              yy = 178 - yDe;
                            } else {
                              if (yy <= 200- user_yDe) {
                                yy = 198 - yDe;
                              } else {
                                if (yy <= 225 - user_yDe) {
                                  yy = 218 - yDe;
                                } else {
                                  yy = 240 - yDe;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    if (xx <= 240 - user_xDe) {
      xx = 234 - xDe
      dat.style.transform = "rotate(-180deg)"
    } else {
      if (xx <= 260 - user_xDe) {
        xx = 255 - xDe;
        dat.style.transform = "rotate(90deg)"
      } else {
        if (xx <= 285 - user_xDe) {
          xx = 276 - xDe;
          dat.style.transform = "rotate(-90deg)"
        } else {
          if (xx <= 308 - user_xDe) {
            xx = 297 - xDe;
          } else {
            // for the player
            
            if (xx <= 330 - user_xDe) {
              xx = 320 - xDe;
              dat.style.transform = "rotate(-180deg)"
            } else {
              if (xx <= 350 - user_xDe) {
                xx = 340 - xDe;
                dat.style.transform = "rotate(90deg)"
              } else {
                if (xx <= 370 - user_xDe) {
                  xx = 362 - xDe;
                  dat.style.transform = "rotate(-90deg)"
                } else {
                  xx = 383 - xDe;
                }
              }
            }
          }
        }
      }
    }
    
    dat.style.left = (xx)+ "px";
    dat.style.top = (yy)+ "px";
    dat.style.zIndex = 2;
    var l = 0;
    var loop = setInterval(() => {
      l++;
      if (l <= 10 && noteRealyHere) {
        noteRealyHere = false;
        dat.remove();
      }
      
      if (noteReset) {
        clearInterval(loop)
        dat.remove();
      }
      
      if (localstep !== chartEditor.step) {
        dat.style.visibility = "hidden";
      } else {
        dat.style.visibility = "visible";
      }
      
    },2)
  
    
    //document.getElementById("file").value = (x - 80)+"px; "+(y - 80)+"px;"
  }
}

document.addEventListener('keypress',function (e) {
  if (e.key == "s") {
    if (canMake) {
      canMake = false;
    } else {
      canMake = true;
    }
  }
  
  if (e.key == "ArrowDown") {
    chartEditor.step++;
  }
})

document.addEventListener("click",function (e) {
  if (canMake) {
    makeNotes(e.clientX,e.clientY);
  }
})