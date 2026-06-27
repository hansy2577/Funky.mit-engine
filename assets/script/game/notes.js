function makeNote(x,as) {
  var posi = x; // default arrows position
  
  if (as == "player") {
    game.notesDefaultPosition = x;
    for (var i = 0; i < 4; i++) {
      
    // set arrows angle
    if (i == 0) {
      game.notesDefaultAngle[0] = -180
    }

    if (i == 1) {
      game.notesDefaultAngle[1] = 90
    }
    
    if (i == 2) {
      game.notesDefaultAngle[2] = -90
    }
    
    if (i == 3) {
      game.notesDefaultAngle[3] = 0
    }

      
    makeLocalAnim("MainNotes"+i,
      "mods/"+game.modsSelect+"/images/notes-skins/"+game.notesSkinSelecte+"/"+game.notesSkinData.notes.src,
      game.notesSkinData.notes.length,
      posi,"-50",
      game.notesSkinData.scales,
      "notes",
      fpsToMS(game.notesSkinData.notes.fps),
      false,
      game.notesSkinData.notes.position[0], game.notesSkinData.notes.position[1], false,
      game.notesSkinData.notes["Padding Length ?"],"transform: rotate("+game.notesDefaultAngle[i]+"deg);");

    game.notes[i] = document.getElementById("MainNotes"+i+" folder")
    
    game.notes[i].style.width = "158px";
    game.notes[i].style.height = "160px";
    
    game.notes[i].style.position = "absolute";
    game.notes[i].style.visibility = "visible";
    //game.notes[i].style.transform = "translateX("+game.notesSkinData.positions[0]+")";
    //game.notes[i].style.transform += "translateY("+game.notesSkinData.positions[1]+")";
    

    // Splash note sprites
    if (game.notesSkinData["notes splash"]["auto anim"]["activate"] !== true) {
      makeLocalAnim("notesSplash"+i,
      "mods/"+game.modsSelect+"/images/notes-skins/"+game.notesSkinSelecte+"/"+game.notesSkinData["notes splash"]["src"],
      game.notesSkinData["notes splash"]["default anim"].length,
      posi,"-50",
      game.notesSkinData["notes splash"].scale,
      "notes",
      fpsToMS(game.notesSkinData["notes splash"]["default anim"].fps),
      false,
      game.notesSkinData["notes splash"].position[0], game.notesSkinData["notes splash"].position[1], false,
      game.notesSkinData["notes splash"]["default anim"]["Padding Length ?"]);
    
      game.notesSplash[i] = document.getElementById("notesSplash"+i+" folder")
      game.notesSplash[i].style.opacity = 0.8;
    }

    posi += 42.5; // note Y delay
    
    }
  }
  
  if (as == "opponent") {
    for (var i = 0; i < 4; i++) {
      game.notesOpponent[i] = document.createElement("img");
      document.getElementById("notes").appendChild(game.notesOpponent[i]);
      
      game.notesOpponent[i].style.width = "158px";
      game.notesOpponent[i].style.height = "160px";
      
      game.notesOpponent[i].style.opacity = 0.5;
      game.notesOpponent[i].style.position = "absolute";
      game.notesOpponent[i].style.visiblility = "visible";
      game.notesOpponent[i].style.backgroundImage = "url("+"mods/"+game.modsSelect+"/images/notes-skins/"+game.notesSkinSelecte+"/"+game.notesSkinData.notes.src+game.notesSkinData.notes.length+".png)";
      game.notesOpponent[i].style.left = posi + "px";
      game.notesOpponent[i].style.top = "-50px";
      game.notesOpponent[i].style.scale = game.notesSkinData.scales;
      game.notesOpponent[i].style.transform = "translateX("+game.notesSkinData.positions[0]+")";
      game.notesOpponent[i].style.transform += "translateY("+game.notesSkinData.positions[1]+")";

      posi += 42.5; // note Y delay
      
      // set arrows angle
      if (i == 0) {
        game.notesOpponent[i].style.transform = "rotate(-180deg)"
      }
      
      if (i == 1) {
        game.notesOpponent[i].style.transform = "rotate(90deg)";
      }
      
      if (i == 2) {
        game.notesOpponent[i].style.transform = "rotate(-90deg)";
      }
      
      if (i == 3) {
        game.notesOpponent[i].style.transform = "rotate(0deg)";
      }
    }
  }

  // arrows key events
  
  document.addEventListener('keydown', function(event) {
    if (event.key == game.settings.key[0] || event.key == "ArrowLeft") {
      game.notes[0].onpointerdown()
    }

    if (event.key == game.settings.key[1] || event.key == "ArrowUp") {
      game.notes[1].onpointerdown()
    }

    if (event.key == game.settings.key[2] || event.key == "ArrowDown") {
      game.notes[2].onpointerdown()
    }
    
    if (event.key == game.settings.key[3] || event.key == "ArrowRight") {
      game.notes[3].onpointerdown()
    }
  });
  
  document.addEventListener('keyup', function(event) {
    if (event.key == game.settings.key[0] || event.key == "ArrowLeft") {
      game.notes[0].onpointerout()
    }
    
    if (event.key == game.settings.key[1] || event.key == "ArrowUp") {
      game.notes[1].onpointerout()
    }
    
    if (event.key == game.settings.key[2] || event.key == "ArrowDown") {
      game.notes[2].onpointerout()
    }
    
    if (event.key == game.settings.key[3] || event.key == "ArrowRight") {
      game.notes[3].onpointerout()
    }
  });
}




// put function in

function notesKey() {
  game.notes[0].onpointerdown = () => {
    game.notes[0].style.filter = "brightness(" + 30 + "%)";
    game.notes[0].style.scale = 0.99
    game.keyPress.L = true;
  }
  
  game.notes[0].onpointerout = () => {
    game.notes[0].style.filter = "brightness(" + 100 + "%)";
    game.notes[0].style.scale = 1
    game.keyPress.L = false;
    game.canLongNotes.L = false;
  }
  
  game.notes[1].onpointerdown = () => {
    game.notes[1].style.filter = "brightness(" + 30 + "%)";
    game.notes[1].style.scale = 0.99
    game.keyPress.U = true;
  }
  
  game.notes[1].onpointerout = () => {
    game.notes[1].style.filter = "brightness(" + 100 + "%)";
    game.notes[1].style.scale = 1
    game.keyPress.U = false;
    game.canLongNotes.U = false;
  }
  
  game.notes[2].onpointerdown = () => {
    game.notes[2].style.filter = "brightness(" + 30 + "%)";
    game.notes[2].style.scale = 0.99
    game.keyPress.D = true;
  }
  
  game.notes[2].onpointerout = () => {
    game.notes[2].style.filter = "brightness(" + 100 + "%)";
    game.notes[2].style.scale = 1
    game.keyPress.D = false;
    game.canLongNotes.D = false;
  }
  
  game.notes[3].onpointerdown = () => {
    game.notes[3].style.filter = "brightness(" + 30 + "%)";
    game.notes[3].style.scale = 0.99
    game.keyPress.R = true;
  }
  
  game.notes[3].onpointerout = () => {
    game.notes[3].style.filter = "brightness(" + 100 + "%)";
    game.notes[3].style.scale = 1
    game.keyPress.R = false;
    game.canLongNotes.R = false;
  }
  
}

function generateNotes(type,isLongNote,customNotesSkin = false,spawnTime = game.song.inst.currentTime) {
  var type2 = type;
  var notesTimeGenerated = spawnTime;
  
    if (type2 <= 3) {
      if (isLongNote !== true) {
        var tempoNote = document.createElement("div");
        document.getElementById("notes").appendChild(tempoNote);
        
        //tempoNote.style.backgroundColor = "red";
        tempoNote.style.width = "158px";
        tempoNote.style.height = "160px";
        //tempoNote.style.borderRadius = "100px"
        
        tempoNote.style.zIndex += 1;
        tempoNote.style.position = "absolute";
        tempoNote.style.visiblility = "visible";
        if (customNotesSkin !== false) {
          tempoNote.style.backgroundImage = "url("+customNotesSkin+")";
        } else {
          tempoNote.style.backgroundImage = "url("+"mods/"+game.modsSelect+"/images/notes-skins/"+game.notesSkinSelecte+"/"+game.notesSkinData["strumb notes"]+type2+".png)";
        }
        
        tempoNote.style.left = (game.notesDefaultPosition + (42.5 * type)) + "px"
        tempoNote.style.top = "335px";
        tempoNote.style.scale = game.notesSkinData.scales
      } else {
        // long note
        var tempoNote = document.createElement("div");
        document.getElementById("notes").appendChild(tempoNote);
    
        tempoNote.style.width = "158px";
        tempoNote.style.height = "160px";
    
        tempoNote.style.position = "absolute";
        tempoNote.style.visiblility = "visible";
         tempoNote.style.backgroundImage = "url("+"mods/"+game.modsSelect+"/images/notes-skins/"+game.notesSkinSelecte+"/"+game.notesSkinData["long notes"]+".png)";
        tempoNote.style.left = (game.notesDefaultPosition + (42.5 * type)) + "px";
        //tempoNote.style.width = "10px";
        /*tempoNote.style.width = 1000+"px";
        tempoNote.style.height = 100+"px";*/
        tempoNote.style.top = "335px";
        //tempoNote.style.backgroundColor = "blue"
        tempoNote.style.scale = game.notesSkinData.scales;
      }
      
      var angle = "";
      if (isLongNote !== true) {
        if (type2 == 0) {
          angle = "rotate(-180deg)"
        }
    
        if (type2 == 1) {
          angle = "rotate(90deg)";
        }
    
        if (type2 == 2) {
          angle = "rotate(-90deg)";
        }
    
        if (type2 == 3) {
          angle = "rotate(0deg)";
        }
      }
      
      var Y = 335;
      var tempN = 0;
      var play = true;
      var pressed = false;
      var notesClickDetection = -430;
      
      if (game.song.inst.currentTime >= notesTimeGenerated + 10) {
        tempoNote.remove()
      }

      var loop = setInterval(() => {
        tempoNote.style.transform = `translateY(${Y - 100}px)`;
        tempoNote.style.transform += angle;
        
        if /* sync with the player notes */ (tempoNote.style.left !== (game.notesDefaultPosition + (42.5 * type)) + "px") {
          tempoNote.style.left = (game.notesDefaultPosition + (42.5 * type)) + "px"
        }
        
        if /* move the notes */ (game.canMoveNote == true && game.pauseGameState == false) {
          // *old system not sound time sycroniser | Y -= game.song.metadata.chart.speed * 40;
          
          Y = "-"+(((game.song.inst.currentTime * 900) - 
          (notesTimeGenerated * 900)) * 
          (game.song.metadata.chart.speed * 2.4));
          
        }
        
          if (game.settings.botplay !== true) {
            // manual mods
            if (isLongNote !== true) {
              // detecte 
              if (Y <= (-900 + notesClickDetection) && pressed !== true) {
                if (type == 0) {
                  if (game.keyPress.L == true) {
                    pressed = true;
                    game.keyPress.L = false;
                    game.canLongNotes.L = true;
                  }
                }
                
                if (type == 1) {
                  if (game.keyPress.U == true) {
                    pressed = true;
                    game.keyPress.U = false;
                    game.canLongNotes.U = true;
                  }
                }


                if (type == 2) {
                  if (game.keyPress.D == true) {
                    pressed = true;
                    game.keyPress.D = false;
                    game.canLongNotes.D = true;
                  }
                }


                if (type == 3) {
                  if (game.keyPress.R == true) {
                    pressed = true;
                    game.keyPress.R = false;
                    game.canLongNotes.R = true;
                  }
                }
              }
              
              // when before/after note 
              if (Y <= (-900 + notesClickDetection) && pressed == true) {
                
                tempoNote.remove()
                
                game.events.onNotesHit = true;
                playAnim(type2);
                
                FMS_health(-6)
                goodNoteHit()
                
                game.notesPress = null;
                if (game.settings.noteSplash) {
                  generateNotesEffect(type2)
                }
                clearInterval(loop);
              }
            } else {
              if (Y <= (-1100 + notesClickDetection) && pressed !== true) {
                if (type == 0) {
                  if (game.canLongNotes.L == true) {
                    pressed = true;
                    game.keyPress.L = false;
                  }
                }
                
                if (type == 1) {
                  if (game.canLongNotes.U == true) {
                    pressed = true;
                    game.keyPress.U = false;
                  }
                }


                if (type == 2) {
                  if (game.canLongNotes.D == true) {
                    pressed = true;
                    game.keyPress.D = false;
                  }
                }

                if (type == 3) {
                  if (game.canLongNotes.R == true) {
                    pressed = true;
                    game.keyPress.R = false;
                  }
                }
              }

              
              if (Y <= (-900 + notesClickDetection) && pressed == true) {
                tempoNote.remove()
                FMS_health(-0.5)
                playAnim(type2)
                
                clearInterval(loop);
              }
            }
    
            if (Y <= (-1900 + notesClickDetection)) {
              FMS_health(11)
              game.missed += 1;
              tempoNote.remove();
              clearInterval(loop);
              bf_miss()
            }
          } else {
            // botplay mods
            
            if (Y <= (-1100 + notesClickDetection) && play == true) {
              tempoNote.remove()
              
              if (game.settings.soundOnPressNote == true && isLongNote !== true) {
                new Audio("assets/sound/hitsound.ogg").play()
              }
              
              if (isLongNote !== true) {
                tempN = 5;
                game.events.onNotesHit = true;
              } else {
                tempN = 10;
              }
      
              play = false;
              
              game.notes[type].onpointerdown()
      
              game.notesPress = null;
              if (isLongNote !== true) {
                goodNoteHit()
                FMS_health(-5)
                if (game.settings.noteSplash == true) {
                  generateNotesEffect(type2)
                }
              }
            }
    
            if (Y <= (-1100 + notesClickDetection) && game.settings.botplay) {
              if (tempN <= 0) {
                FMS_health(-0.5)
                
                playAnim(type2);
                clearInterval(loop);
                tempoNote.remove();
                game.notes[type].onpointerout()
              } else {
                tempN--;
              }
            }
          }
          
      },fpsToMS(55))
    }
}

function generateDadNotes(type,isLongNotes = false){
  var wait = setInterval(() => {
    if (type !== 3) {
      var timeD = 200;
      if (isLongNotes == true) {
        timeD = 300;
      }
      
      
      playAnim(type)
      game.events.onNotesOpponentHit = true;
      
      game.notesOpponent[type - 4].style.opacity = 0.8;
      game.notesOpponent[type - 4].style.scale = game.notesSkinData.scales - 0.04;
      game.notesOpponent[type - 4].style.filter = "brightness(" + 30 + "%)";
    
      var wait2 = setInterval(() => {
        game.notesOpponent[type - 4].style.opacity = 0.5;
        game.notesOpponent[type - 4].style.scale = game.notesSkinData.scales;
        game.notesOpponent[type - 4].style.filter = "brightness(" + 100 + "%)";
        
        clearInterval(wait2)
        clearInterval(wait)
      },timeD)
    } else {
      clearInterval(wait)
    }
  },530)
}

function generateNotesEffect(type) {
  playLocalAnim("MainNotes"+type);
  if (game.notesSkinData["notes splash"]["auto anim"]["activate"] !== true) {
    playLocalAnim("notesSplash"+type);
  } else {
  
  var tempoNote = document.createElement("img");
  document.getElementById("notes").appendChild(tempoNote);

  tempoNote.style.position = "absolute";
  tempoNote.style.cssText = "z-index: 11; position: absolute;";
  tempoNote.style.visiblility = "visible";
  tempoNote.src = "mods/"+game.modsSelect+"/"+game.song.metadata.assets["note splash"][0];
  tempoNote.style.left = game.notes[type].style.left;
  tempoNote.style.top = game.notes[type].style.top;
  
  var op = 1;
  var S = game.song.metadata.assets["note splash"][1];
  var T = game.song.metadata.assets["note splash"][2];
  tempoNote.style.transform = "scale("+S+")";

  
  var loop = setInterval(() => {
    op -= 0.02
    tempoNote.style.opacity = op;
    if (game.song.metadata.assets["note splash"][3]["auto animate"] == true) {
      S -= 0.004;
      tempoNote.style.transform = "scale("+S+")";
    }
    
    if (T <= 0) {
      tempoNote.remove()
      clearInterval(this);
      clearInterval(loop);
    }
    
    T -= 3;
  }, global.frameLimite)
  }
}

function makeLongNotes(type,L,spawnTime) {
  var step = 0;
  var value = 0;  // delay
  //console.log(L)
  if (L >= 1) {
  var mb = setInterval(() => {
    
    if (value >= L * 0.4) {
      clearInterval(mb);
    }
    
    value += 110;  // speed

    if (value >= step) {
      step += 110;
      generateNotes(type,true,false,spawnTime);
    }
  }, 0)
  }
}

function makeDadLongNotes(type,L) {
  var step = 0;
  var value = -159;
  //console.log(L)
  if (L >= 1) {
  var mb = setInterval(() => {
    
    if (value >= L * 1.4) {
      clearInterval(mb);
    }
    
    value += 80;

    if (value >= step) {
      step += 150;
      generateDadNotes(type,true);
    }
  }, 0)
  }
}


function NotesScriptLoop() {
  var loop = setInterval(() => {
    if (game.notesSkinData["notes splash"]["auto anim"]["activate"] !== true && game.isSongFinished == false) {
      if (IsStopped_LocalAnim("notesSplash0") == "true") {
        game.notesSplash[0].style.opacity = 0
      } else {
        game.notesSplash[0].style.opacity = game.notesSkinData["notes splash"]["opacity"]
      }
    
      if (IsStopped_LocalAnim("notesSplash1") == "true") {
        game.notesSplash[1].style.opacity = "0";
      } else {
        game.notesSplash[1].style.opacity = game.notesSkinData["notes splash"]["opacity"]
      }

      if (IsStopped_LocalAnim("notesSplash2") == "true") {
        game.notesSplash[2].style.opacity = 0
      } else {
        game.notesSplash[2].style.opacity = game.notesSkinData["notes splash"]["opacity"]
      }

      if (IsStopped_LocalAnim("notesSplash3") == "true") {
        game.notesSplash[3].style.opacity = "0";
      } else {
        game.notesSplash[3].style.opacity = game.notesSkinData["notes splash"]["opacity"]
      }
    }
  },0)
}