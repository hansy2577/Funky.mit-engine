function startBPM(bpm) {
  if (game.BPM.activate == false) {
    game.BPM.activate = true;
    
    var time2 = 0;
    var bmpVal = 0;
    var bpmL = setInterval(() => {
      if (game.song.inst.currentTime >= bmpVal) {
        bmpVal += 60 / bpm;
        bmpVal -= 0.01
        
        time2++;
        game.events.onBeatHit = true; 
        
        if (game.BPM.time == 1) {
          game.BPM.time = 0;
        } else {
          game.BPM.time = 1;
        }
        
        if (time2 == 1 && game.settings.bumpingScreen) {
          //ScreenBeat(1.015, 0.003)
        }
        
        if (time2 == 4) {
          time2 = 0;
          // game.events.onStepHit = true; // disabled because instable
          // ^ see this in chartPlayer.js
        }
        
        
      } else {
        if (game.events.onBeatHit == true) {
          game.events.onBeatHit = false;
        }
        
        if (game.events.onStepHit == true) {
          game.events.onStepHit = false;
        }
      }
    
      if (game.BPM.activate == false) {
        clearInterval(bpmL)
      }
    },2)
  }
}

function stopBPM() {
  game.BPM.activate = false;
}