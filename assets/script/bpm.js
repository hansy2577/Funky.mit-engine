function startBPM(bpm) {
  if (game.BPM.activate == false) {
    game.BPM.activate = true;
    
    var time2 = 0;
    var bmpVal = 0;
    var bpmL = setInterval(() => {
      if (game.song.inst.currentTime >= bmpVal) {
        bmpVal += 60 / bpm;
        time2++;
        game.BPM.beatHit = true;
        
        if (game.BPM.time == 1) {
          game.BPM.time = 0;
        } else {
          game.BPM.time = 1;
        }
        
        if (time2 == 1) {
          ScreenBeat(1.03, 0.0004)
        }
        
        if (time2 == 4) {
          time2 = 0;
          game.BPM.beat4Hit = true;
        }
        
        
      } else {
        if (game.BPM.beatHit == true) {
          game.BPM.beatHit = false;
        }
        
        if (game.BPM.beat4Hit == true) {
          game.BPM.beat4Hit = false;
        }
      }
    
      if (game.BPM.activate == false) {
        clearInterval(bpmL)
      }
    },1)
  }
}

function stopBPM() {
  game.BPM.activate = false;
}