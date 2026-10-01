let chartEditor = {
  chart: null,
  chartType: "default",
  playing: false,
  
  song: {
    inst: null,
    voice: null,
    voice2: null
  }
}

function importB() {
  if (document.getElementById("importG").style.visibility == "hidden") {
    document.getElementById("importG").style.visibility = "visible";
  } else {
    document.getElementById("importG").style.visibility = "hidden";
  }
}

// import file

document.getElementById("FNF file").addEventListener('change', function() {
  const file = this.files[0]; // First selected file
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    if (e.target.result !== null) {
      alert("File " + file.name + " loaded successfully.");
      chartEditor.chart = JSON.parse(e.target.result);
      chartEditor.chartType = "FNF";
    } else {
      
    }
  };
  
  reader.onerror = function() {
    PreError("Import error" + reader.error, false, false);
  };
  
  reader.readAsText(file); // Read file as text
})

function loadLocalChart() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get",document.getElementById("file").value + "chart.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("fail to get the file"+allText, false, false)
      } else {
        chartEditor.chart = JSON.parse(allText);
        alert("success !")
      }
    }
  }
  rawFile.send();
}

function loadLocalVoice() {
  new Audio(document.getElementById("file").value + "Voice.ogg").onerror = function () {
    alert("Voice error")
    chartEditor.song.voice = null;
  }
  
  new Audio(document.getElementById("file").value + "Voice2.ogg").onerror = function () {
    alert("Voice2 error")
    chartEditor.song.voice2 = null;
  }

  
  new Audio(document.getElementById("file").value + "Voice.ogg").onloadeddata = function () {
    alert("Voice success !")
    
    chartEditor.song.voice = new Audio(document.getElementById("file").value + "Voice.ogg");
  }
  
  new Audio(document.getElementById("file").value + "Voice2.ogg").onloadeddata = function () {
    alert("and Voice2 !")
    
    chartEditor.song.voice2 = new Audio(document.getElementById("file").value + "Voice2.ogg");
  }


  if (chartEditor.playing == true) {
    chartEditor.song.inst.pause()
    chartEditor.song.voice.pause()
    chartEditor.song.voice2.pause()

    chartEditor.playing = false;
    document.getElementById("play").src = "assets/images/editor/play.png";
  }
}

function loadLocalInst() {
  new Audio(document.getElementById("file").value + "Inst.ogg").onerror = function () {
    alert("error")
  }
  new Audio(document.getElementById("file").value + "Inst.ogg").onloadeddata = function () {
    alert("success !")
    
    chartEditor.song.inst = new Audio(document.getElementById("file").value + "Inst.ogg");
  }

  if (chartEditor.playing == true) {
    chartEditor.song.inst.pause()
    chartEditor.playing = false;
    document.getElementById("play").src = "assets/images/editor/play.png";
  }
}


function playCharting() {
  if (chartEditor.playing !== true) {
    playChart(chartEditor.chart,"FNF")
    chartEditor.playing = true;
    document.getElementById("play").src = "assets/images/editor/play.png";
  } else {
    chartEditor.song.inst.pause()
    chartEditor.song.voice.pause()
    chartEditor.song.voice2.pause()

    chartEditor.playing = false;
    document.getElementById("play").src = "assets/images/editor/pause.png";
  }
}

// chart player

function playChart(chart,type) {
  chartEditor.song.inst.play();
  if (chartEditor.song.voice !== null) {
    chartEditor.song.voice.play(); 
  }
  if (chartEditor.song.voice2 !== null) {
    chartEditor.song.voice2.play()
  }


  var timer = 0;
  var note = 0;
  var data = chart;
  var first = 0;
  
  var A = 0;
  var B = 0;
  var C = 0;
  var beat = 1;
  var loopP = setInterval(() => {
    document.getElementById("songTime").innerText = timer = chartEditor.song.inst.currentTime;

    if (chartEditor.playing == false) {
      clearInterval(loopP)
    }
    
    timer = chartEditor.song.inst.currentTime * 1000;
    timer = timer + 840
    
    
    if (A >= data.length) {
      clearInterval(loopP)
      console.clear();
      console.info("chart ended")
    }


    if (timer >= data.length) {
      // game.cam.asBf = data[A].mustHitSection;
      if (data[A].mustHitSection == false) {
        document.getElementById("asIcon").src = "assets/images/editor/player icon.png" // bf
      } else {
        document.getElementById("asIcon").src = "assets/images/editor/oppenent icon.png" // dad
      }
      
      
      if (data[A].sectionNotes.length == 0) {
        A += 1;
      } else if (data[A].sectionNotes[B][0] <= timer) {
        if (B <= data[A].sectionNotes.length) {

          /*
          if (data[A].sectionNotes[B][1] >= 3) {
            generateDadNotes(data[A].sectionNotes[B][1])
            if (data[A].sectionNotes[B][2] >= 0) {
              makeDadLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
            }
          }
          
          */
          generateNotes(data[A].sectionNotes[B][1])

          
        }
        
        B++;
        
        if (B >= data[A].sectionNotes.length) {
          A += 1;
          //game.song.inst.currentTime * 1000;
          //game.song.voice.currentTime = game.song.inst.currentTime - 0.0001
          //console.clear()
          if (beat == 1) {
            beat = 0;
            if (first == 0) {
              
  chartEditor.song.inst.currentTime = 0;
  if (chartEditor.song.voice !== null) {
    chartEditor.song.voice.currentTime = 0; 
  }
  if (chartEditor.song.voice2 !== null) {
    chartEditor.song.voice2.currentTime = 0;
  }

first++;
            }
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
  },0)
}

function generateNotes(type) {
  var tempoNotes = document.createElement("img")
  document.body.appendChild(tempoNotes)
  tempoNotes.style.position = "absolute";
  tempoNotes.src = "assets/images/editor/note.png"
  tempoNotes.style.scale = "0.12"
  tempoNotes.style.top = "300px";
  
  if (type == 0) {
    tempoNotes.style.transform = "rotate(-180deg)"
    tempoNotes.style.left = "235px"
  }
  if (type == 1) {
    tempoNotes.style.transform = "rotate(90deg)";
    tempoNotes.style.left = "255px"
  }
  if (type == 2) {
    tempoNotes.style.transform = "rotate(-90deg)";
    tempoNotes.style.left = "275px"
  }
  if (type == 3) {
    tempoNotes.style.left = "295px"
  }
  
  if (type == 4) {
    tempoNotes.style.transform = "rotate(-180deg)"
    tempoNotes.style.left = "335px"
  }
  if (type == 5) {
    tempoNotes.style.transform = "rotate(90deg)";
    tempoNotes.style.left = "355px"
  }
  if (type == 6) {
    tempoNotes.style.transform = "rotate(-90deg)";
    tempoNotes.style.left = "375px"
  }
  if (type == 7) {
    tempoNotes.style.left = "395px"
  }

  var y = 290;
  var loop = setInterval(() => {
    tempoNotes.style.top = y+"px";
    if (y >= -60) {
      y -= 8;
    } else {
      clearInterval(loop)
      tempoNotes.remove()
    }
  },20)
}

for (var i = 0; i < 7; i++) {
  generateNotes(i)
}