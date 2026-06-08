function makeNote(x,as) {
  var posi = x; // default arrows position
  if (as == "player") {
    for (var i = 0; i < 4; i++) {
    game.notes[i] = document.createElement("div");
    document.getElementById("notes").appendChild(game.notes[i]);

    game.notes[i].style.width = "158px";
    game.notes[i].style.height = "160px";

    game.notes[i].style.position = "absolute";
    game.notes[i].style.visiblility = "visible";
    game.notes[i].style.backgroundImage = "url("+"mods/"+game.modsSelect+"/"+game.song.metadata.assets["notes skin"][0][0]+")";
    game.notes[i].style.left = posi + "px";
    game.notes[i].style.top = "-50px";
    game.notes[i].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.notes[i].onerror = function () {
      PreError("fail to load notes assets",true)
    }
    
    posi += 42.5; // note Y delay
    
    // set arrows angle
    if (i == 0) {
      game.notes[i].style.transform = "rotate(-180deg)"
    }

    if (i == 1) {
      game.notes[i].style.transform = "rotate(90deg)";
    }
    
    if (i == 2) {
      game.notes[i].style.transform = "rotate(-90deg)";
    }
    
    if (i == 3) {
      game.notes[i].style.transform = "rotate(0deg)";
    }
    }
  }
  
  if (as == "opponent") {
    for (var i = 4; i < 8; i++) {
      game.notes[i] = document.createElement("img");
      document.getElementById("notes").appendChild(game.notes[i]);
      
      game.notes[i].style.position = "absolute";
      game.notes[i].style.visiblility = "visible";
      game.notes[i].src = "mods/" + game.modsSelect + "/" + game.song.metadata.assets["notes skin"][0][0];
      game.notes[i].style.left = posi + "px";
      game.notes[i].style.top = "-10px";
      game.notes[i].style.scale = game.song.metadata.assets["notes skin"][0][1];
      posi += 42.5; // note Y delay
      
      // set arrows angle
      if (i == 4) {
        game.notes[i].style.transform = "rotate(-180deg)"
      }
      
      if (i == 5) {
        game.notes[i].style.transform = "rotate(90deg)";
      }
      
      if (i == 6) {
        game.notes[i].style.transform = "rotate(-90deg)";
      }
      
      if (i == 7) {
        game.notes[i].style.transform = "rotate(0deg)";
      }
    }
  }

  // arrows key events
  
  document.addEventListener('keydown', function(event) {
    if (event.key == game.settings.key[0]) {
      game.notes[0].onpointerdown()
    }

    if (event.key == game.settings.key[1]) {
      game.notes[1].onpointerdown()
    }

    if (event.key == game.settings.key[2]) {
      game.notes[2].onpointerdown()
    }
    
    if (event.key == game.settings.key[3]) {
      game.notes[3].onpointerdown()
    }
  });
  
  document.addEventListener('keyup', function(event) {
    if (event.key == game.settings.key[0]) {
      game.notes[0].onpointerout()
    }
    
    if (event.key == game.settings.key[1]) {
      game.notes[1].onpointerout()
    }
    
    if (event.key == game.settings.key[2]) {
      game.notes[2].onpointerout()
    }
    
    if (event.key == game.settings.key[3]) {
      game.notes[3].onpointerout()
    }
  });
}

// put function in

function notesKey() {
  game.notes[0].onpointerdown = () => {
    game.notes[0].style.filter = "brightness(" + 30 + "%)";
    game.notes[0].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress.L = true;
  }
  
  game.notes[0].onpointerout = () => {
    game.notes[0].style.filter = "brightness(" + 100 + "%)";
    game.notes[0].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.keyPress.L = false;
    game.canLongNotes.L = false;
  }
  
  game.notes[1].onpointerdown = () => {
    game.notes[1].style.filter = "brightness(" + 30 + "%)";
    game.notes[1].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress.U = true;
  }
  
  game.notes[1].onpointerout = () => {
    game.notes[1].style.filter = "brightness(" + 100 + "%)";
    game.notes[1].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.keyPress.U = false;
    game.canLongNotes.U = false;
  }
  
  game.notes[2].onpointerdown = () => {
    game.notes[2].style.filter = "brightness(" + 30 + "%)";
    game.notes[2].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress.D = true;
  }
  
  game.notes[2].onpointerout = () => {
    game.notes[2].style.filter = "brightness(" + 100 + "%)";
    game.notes[2].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.keyPress.D = false;
    game.canLongNotes.D = false;
  }
  
  game.notes[3].onpointerdown = () => {
    game.notes[3].style.filter = "brightness(" + 30 + "%)";
    game.notes[3].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress.R = true;
  }
  
  game.notes[3].onpointerout = () => {
    game.notes[3].style.filter = "brightness(" + 100 + "%)";
    game.notes[3].style.scale = game.song.metadata.assets["notes skin"][0][1]
    game.keyPress.R = false;
    game.canLongNotes.R = false;
  }
  
}

function generateNotes(type,isLongNote,nl) {
  var type2 = type;
  
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
        tempoNote.style.backgroundImage = "url("+"mods/" + game.modsSelect + "/" + game.song.metadata.assets["notes skin"][1][0] + type2 + ".png)";
        tempoNote.style.left = game.notes[type2].style.left;
        tempoNote.style.top = "335px";
        tempoNote.style.scale = game.song.metadata.assets["notes skin"][1][1];
      } else {
        // long note
        var tempoNote = document.createElement("div");
        document.getElementById("notes").appendChild(tempoNote);
    
        tempoNote.style.width = "158px";
        tempoNote.style.height = "160px";
    
        tempoNote.style.position = "absolute";
        tempoNote.style.visiblility = "visible";
         tempoNote.style.backgroundImage = "url("+game.modsFolder+"/"+game.song.metadata.assets["long notes"][0] + ".png)";
        tempoNote.style.left = game.notes[type2].style.left;
        //tempoNote.style.width = "10px";
        /*tempoNote.style.width = 1000+"px";
        tempoNote.style.height = 100+"px";*/
        tempoNote.style.top = "335px";
        //tempoNote.style.backgroundColor = "blue"
        tempoNote.style.scale = game.song.metadata.assets["notes skin"][1][1];
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
    
      var loop = setInterval(() => {
        tempoNote.style.transform = `translateY(${Y - 500}px)`;
        tempoNote.style.transform += angle;
        
        if (tempoNote.style.left !== game.notes[type2].style.left) {
          tempoNote.style.left = game.notes[type2].style.left;
        }
        
        if (game.canMoveNote == true && game.pauseGameState == false) {
            Y -= game.song.metadata.chart.speed * 40;
            // Y = Y / 1.1;
            // Y -= 5;
        }
          if (game.settings.botplay !== true) {
            // manual mods
            if (isLongNote !== true) {
              // detecte 
              if (Y <= -900 && pressed !== true) {
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
              if (Y <= -900 && pressed == true) {
                
                tempoNote.remove()
                
                game.events.onNotesHit = true;
                playAnim(type2);
                
                healthBars("add",6)
                goodNoteHit()
                
                game.notesPress = null;
                if (game.settings.noteSplash) {
                  generateNotesEffect(type2)
                }
                clearInterval(loop);
              }
            } else {
              if (Y <= -1100 && pressed !== true) {
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

              
              if (Y <= -900 && pressed == true) {
                tempoNote.remove()
                healthBars("add",0.5)
                playAnim(type2)
                
                clearInterval(loop);
              }
            }
    
            if (Y <= -1900) {
              healthBars("remove",11)
              game.missed += 1;
              tempoNote.remove();
              clearInterval(loop);
              bf_miss()
            }
          } else {
            // botplay mods
            
            if (Y <= -1100 && play == true) {
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
                healthBars("add",5)
                if (game.settings.noteSplash == true) {
                  generateNotesEffect(type2)
                }
              }
            }
    
            if (Y <= -1100 && game.settings.botplay) {
              if (tempN <= 0) {
                healthBars("add",0.5)
                
                playAnim(type2);
                clearInterval(loop);
                game.notes[type].onpointerout()
              } else {
                tempN--;
              }
            }
          }
          
      },20.5)
    }
}

function generateDadNotes(type){
  var wait = setInterval(() => {
    if (type !== 3) {
      playAnim(type)
      game.events.onNotesOpponentHit = true;
    }
    clearInterval(wait)
  },530)
}

function generateNotesEffect(type) {
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
