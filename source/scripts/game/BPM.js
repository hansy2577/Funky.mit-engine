let bPMcount = 0;
let bpmL = null;

function startBPM(bpm) {
  if (!game.BPM.activate && bPMcount <= 1) {
    game.BPM.activate = true;
   

    var time2 = 0;
    var bmpVal = 0;
    bpmL = setInterval(() => {
      game.events.onBeatHit = true; 
      if (!game.song.onEnded) {
        characterBeatHit();
        camBeatHit();
        iconBeatHit();
        
        coreEvents_BeatHit();
      }
      
      time2++;
      
      if (game.BPM.time == 1) {
        game.BPM.time = 0;
      } else {
        game.BPM.time = 1;
      }
        
      if (time2 == 1 && game.settings.bumpingScreen) {
        ScreenBeat(1.005,0.5)
      }
        
      if (time2 == 4) {
        time2 = 0;
        // game.events.onStepHit = true; disabled because instable
        // ^ see this in chartPlayer.js
      }
      
    },bpmTomillisecond(bpm))
  }
}

function stopBPM() {
  game.BPM.activate = false;
  clearInterval(bpmL)
  bPMcount = 0;
}
