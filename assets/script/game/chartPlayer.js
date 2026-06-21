function playChart_BF(type,chart = game.song.chart) {
  var timer = 0;
  var note = 0;
  var data = chart;
  
  game.song.inst.volume = 0;
  if (game.song.metadata["is Voice"]) {
    game.song.voice.volume = 0;
  }
      
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.volume = 0;
  }

  
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;
  var loopP = setInterval(() => {
    if (game.song.inst.currentTime * 1000 >= 500 && reloadSong == 0) {
      // replay the audio
      
      reloadSong = 1;
      
      game.song.inst.currentTime = 0;
      game.song.inst.volume = game.song.metadata["chart"]["Inst volume"];;
      if (game.song.metadata["is Voice"]) {
        game.song.voice.currentTime = 0;
        game.song.voice.volume = game.song.metadata["chart"]["Voice volume"];;
      }
      
      if (game.song.metadata["is Voice2"]) {
        game.song.voice2.currentTime = 0;
        game.song.voice2.volume = game.song.metadata["chart"]["Voice volume"];;
      }
    }
    
    timer = game.song.inst.currentTime * 1000;
    if (game.settings.botplay == true) {
      timer = timer + 750;
    } else {
      timer = timer + 790;
      timer -= game.song.metadata.chart.speed * 2;
    }
    
    if (A >= data.length) {
      localStorage.setItem(game.modsSelect+":"+o[0],game.scores)
      clearInterval(loopP)
      console.clear();
      console.info("bf chart ended")
    }


    if (timer >= data.length) {
      if (data[A].sectionNotes.length == 0) {
        A += 1;
      } else if (data[A].sectionNotes[B][0] <= timer) {
        if (B <= data[A].sectionNotes.length) {
          generateNotes(data[A].sectionNotes[B][1])
          if (data[A].sectionNotes[B][2] >= 0) {
            makeLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
          }
        }
        
        B++;
        if (B >= data[A].sectionNotes.length) {
          A += 1;
          game.song.inst.currentTime * 1000;
          game.events.onStepHit = true;
          
          //game.song.voice.currentTime = game.song.inst.currentTime - 0.0001
          //console.clear()
          if (beat == 1) {
            beat = 0;
          } else {
            beat = 1;
          }
          
          
          if (beat == 1) {
            //ScreenBeat(1.03,0.0004)
          }
          
          B = 0;
        }
      }
    } else {}
  })
}

function playChart_DAD(type,chart = game.song.chart) {
  var timer = 0;
  var note = 0;
  var data = chart;
  
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;
  var loopD = setInterval(() => {
    timer = game.song.inst.currentTime * 1000;
    timer = timer + 710;
    
    if (A >= data.length) {
      clearInterval(loopD)
      console.info("dad chart ended")
    }


    if (timer >= data.length) {
      game.cam.asBf = data[A].mustHitSection;
      
      if (data[A].sectionNotes.length == 0) {
        A += 1;
      } else if (data[A].sectionNotes[B][0] <= timer) {
        if (B <= data[A].sectionNotes.length) {
          if (data[A].sectionNotes[B][1] >= 3) {
            generateDadNotes(data[A].sectionNotes[B][1])
            if (data[A].sectionNotes[B][2] >= 0) {
              makeDadLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
            }
          }
        }
        
        B++;
        if (B >= data[A].sectionNotes.length) {
          A += 1;
          game.song.inst.currentTime * 1000;
          //game.song.voice.currentTime = game.song.inst.currentTime - 0.0001
          //console.clear()
          if (beat == 1) {
            beat = 0;
          } else {
            beat = 1;
          }
          
          
          if (beat == 1) {
            //ScreenBeat(1.03,0.0004)
          }
          
          B = 0;
        }
      }
    } else {}
  })
}
