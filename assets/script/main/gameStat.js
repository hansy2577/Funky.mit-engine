let o = JSON.parse(sessionStorage.getItem("game"))

let game = {
  canStart: false,
  
  scores: 0,
  missed: 0,
  
  healthBars: {
    value: 50,
    data: {
      bar: null,
    
      bf: null,
      dad: null
    }
  },

  BPM: {
    currentBPM: null,
    activate: false,
    time: 0,
    beatHit: false
  },
  
  song: {
    chart: null,
    metadata: null,
    
    inst: null,
    voice: null,
  },
  
  canMoveNote: true,
  
  notesPress: null,
  keyPress: null,
  notes:[null,null,null,null],
  notesPlayer: {
    position:[[0,0],[0,0],[0,0],[0,0]]
  },
  
  data: {
    bf: null,
    dad: null,
    gf: null
  },
  
  modChoiceData: null,
  mainData: null,
  
  settings: {
    soundOnPressNote: false,
    
    botplay: true,
    data: null,
    key: ["d","f","j","k"]
  },
  
  menuPause: {
    canMenuPause: true,
    activate: false
  },
  
  pauseGameState: false,
  
  modsSelect: "fail",
  musicSelect: "fail",
  songFolder: null,
  modsFolder: null,
  
  stage: {
    dad: null,
    gf: null,
    bf: null,
    
    BG: null
  },
  
  cam: {
    autoCam: true,
    asBf: false,
    
    speed: 4,
    angle: 0,
    x: 0,
    y: 0
  }
};

// get file get file get file get file get...
getMainJson(o[0])


function getMainJson(yourmods) {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+yourmods+"/meta.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getMainJson | no mods found or no main json found"+allText)
      } else {
        game.mainData = JSON.parse(allText);
        
        game.modsSelect = yourmods;
        game.musicSelect = o[1];
        game.songFolder = "mods/"+game.modsSelect+"/song/"+o[1]
        game.modsFolder = "mods/"+game.modsSelect;
        
        getSetingJson("mods/"+"settings"+".json");
      }
    }
  }
  rawFile.send();
}

function getSetingJson(link) {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", link, true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getSetingJson | fail to get the file, reson: "+allText)
      } else {
        game.settings.data = JSON.parse(allText);
        
        game.settings.key[0] = game.settings.data.gameplay.key[1][0];
        game.settings.key[1] = game.settings.data.gameplay.key[1][1];
        game.settings.key[2] = game.settings.data.gameplay.key[1][2];
        game.settings.key[3] = game.settings.data.gameplay.key[1][3];
        
        getMetadataJson()
        getChartJson();
      }
    }
  }
  rawFile.send();
}

function getMetadataJson() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  
  rawFile.open("get", game.songFolder+"/metadata.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getMetadataJson | fail to get the file, reson: "+allText)
      } else {
        game.song.metadata = JSON.parse(allText)
        game.canStart = true;
        
        onPreLoad()
      } 
    }
  }
  rawFile.send();
}

function getChartJson() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", game.songFolder+"/chart.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getChartJson | fail to get the file, reson: "+allText)
      } else {
        game.song.chart = JSON.parse(allText)
      }
    }
  }
  rawFile.send();
}

// pre-load

var antiLoop = 0;
function onPreLoad() { if (antiLoop == 0 ) {
  // load all stage element
  
  game.stage.BG = document.createElement("img");
  document.getElementById("GAME").appendChild(game.stage.BG);

  game.stage.BG.style.position = "absolute";
  game.stage.BG.src = "mods/"+game.modsSelect+"/"+game.song.metadata.assets.BG[0]
  game.stage.BG.onerror = function () {
    PreError("fail to load the background", false)
  }
  game.stage.BG.style.left = game.song.metadata.assets.BG[1] + "px";
  game.stage.BG.style.top = game.song.metadata.assets.BG[2] + "px";
  game.stage.BG.style.scale = game.song.metadata.assets.BG[3];
  game.stage.BG.style.zIndex = -1;
  
  const tscript = document.createElement("script");
  tscript.src = game.songFolder + "/main.js";
  document.body.appendChild(tscript);

  // load audio
  if /* disable voice */ (game.song.metadata["is Voice"]) {
    game.song.voice = new Audio(game.songFolder+ "/Voices"+game.song.metadata["song type"]);
    game.song.voice.onerror = function () {
      PreError("fail to load 'voice' audio", false)
    }
    game.song.voice.volume = game.song.metadata["chart"]["Voice volume"];
  }
  game.song.inst = new Audio(game.songFolder+ "/Inst"+game.song.metadata["song type"]);  
  game.song.inst.onerror = function () {
    PreError("fail to load 'Inst' audio", true)
  }
  game.song.inst.volume = game.song.metadata["chart"]["Inst volume"];
  
  // make note and other
  makeNote(153,"player");
  getCharacters()
  loadPauseMenu();
  
  antiLoop++;
}}

// starting

var onclickTime = 0;
document.onclick = function () {
  onclickTime++;
  if (onclickTime <= 1) {
    gameStart()
  }
}
  
function gameStart() {
  if (game.song.metadata["is Voice"]) {
    game.song.voice.play();
  }
  
  game.song.inst.play();
  
  game.cam.speed = game.song.metadata.assets["cam speed"];
  
  game.stage.bf = document.getElementById("bf");
  game.stage.gf = document.getElementById("gf");
  game.stage.dad = document.getElementById("dad");
  
  playChart()
  notesKey();
  startBPM(game.song.metadata.chart.BPM);
  
  game.song.inst.onended = function () {
    document.body.remove();
  }
}

// other

function makeNote(x,as) {
  var posi = x; // default arrows position
  if (as == "player") {
    for (var i = 0; i < 4; i++) {
    game.notes[i] = document.createElement("img");
    document.getElementById("notes").appendChild(game.notes[i]);

    game.notes[i].style.position = "absolute";
    game.notes[i].style.visiblility = "visible";
    game.notes[i].src = "mods/"+game.modsSelect+"/"+game.song.metadata.assets["notes skin"][0][0];
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
      
      setInterval(() => {
        game.notes
      },0)
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
      game.notes[0].style.filter = "brightness(" + 100 + "%)";
      game.notes[0].style.scale = game.song.metadata.assets["notes skin"][0][1];
    }
    
    if (event.key == game.settings.key[1]) {
      game.notes[1].style.filter = "brightness(" + 100 + "%)";
      game.notes[1].style.scale = game.song.metadata.assets["notes skin"][0][1];
    }
    
    if (event.key == game.settings.key[2]) {
      game.notes[2].style.filter = "brightness(" + 100 + "%)";
      game.notes[2].style.scale = game.song.metadata.assets["notes skin"][0][1];
    }
    
    if (event.key == game.settings.key[3]) {
      game.notes[3].style.filter = "brightness(" + 100 + "%)";
      game.notes[3].style.scale = game.song.metadata.assets["notes skin"][0][1];
    }
  });
}

function notesKey() {
  game.notes[0].onpointerdown = () => {
    game.notes[0].style.filter = "brightness(" + 30 + "%)";
    game.notes[0].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.notesPress = 0
    game.keyPress = true;
    //generateNotesEffect(0)
  }
  
  game.notes[0].onpointerout = () => {
    game.notes[0].style.filter = "brightness(" + 100 + "%)";
    game.notes[0].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.notesPress = null;
    game.keyPress = false;
  }
  
  game.notes[1].onpointerdown = () => {
    game.notes[1].style.filter = "brightness(" + 30 + "%)";
    game.notes[1].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.notesPress = 1
    game.keyPress = true;
  }
  
  game.notes[1].onpointerout = () => {
    game.notes[1].style.filter = "brightness(" + 100 + "%)";
    game.notes[1].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.keyPress = false;
    game.notesPress = null;
  }
  
  game.notes[2].onpointerdown = () => {
    game.notes[2].style.filter = "brightness(" + 30 + "%)";
    game.notes[2].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress = true;
    game.notesPress = 2
    
  }
  
  game.notes[2].onpointerout = () => {
    game.notes[2].style.filter = "brightness(" + 100 + "%)";
    game.notes[2].style.scale = game.song.metadata.assets["notes skin"][0][1];
    game.keyPress = false;
    game.notesPress = null;
  }
  
  game.notes[3].onpointerdown = () => {
    game.notes[3].style.filter = "brightness(" + 30 + "%)";
    game.notes[3].style.scale = game.song.metadata.assets["notes skin"][0][1] - 0.04;
    game.keyPress = true;
    game.notesPress = 3
    
  }
  
  game.notes[3].onpointerout = () => {
    game.notes[3].style.filter = "brightness(" + 100 + "%)";
    game.notes[3].style.scale = game.song.metadata.assets["notes skin"][0][1]
    game.keyPress = false;
    game.notesPress = null;
  }
  
}

// key

document.addEventListener('keydown', function(event) {
  if (event.key == "E" && event.key == "7") {
    window.location = "script/editorTab.html"
  }
});

function generateNotes(type,isLongNote,nl) {
  var type2 = type;
  
    if (type2 <= 3) {
      if (isLongNote !== true) {
        var tempoNote = document.createElement("img");
        document.getElementById("notes").appendChild(tempoNote);
        
        tempoNote.style.position = "absolute";
        tempoNote.style.visiblility = "visible";
        tempoNote.src = "mods/" + game.modsSelect + "/" + game.song.metadata.assets["notes skin"][1][0] + type2 + ".png";
        tempoNote.style.left = game.notes[type2].style.left;
        tempoNote.style.top = "335px";
        tempoNote.style.scale = game.song.metadata.assets["notes skin"][1][1];
      } else {
        // long note
        var tempoNote = document.createElement("img");
        document.getElementById("notes").appendChild(tempoNote);
    
        tempoNote.style.position = "absolute";
        tempoNote.style.visiblility = "visible";
        tempoNote.src = game.modsFolder+"/"+game.song.metadata.assets["long notes"][0] + ".png";
        tempoNote.style.left = game.notes[type2].style.left;
        //tempoNote.style.width = "10px";
        /*tempoNote.style.width = 1000+"px";
        tempoNote.style.height = 100+"px";*/
        tempoNote.style.top = "335px";
        //tempoNote.style.backgroundColor = "blue"
        tempoNote.style.scale = game.song.metadata.assets["notes skin"][1][1];
      }
      
      if (isLongNote !== true) {
      if (type2 == 0) {
        tempoNote.style.transform = "rotate(-180deg)"
      }
    
      if (type2 == 1) {
        tempoNote.style.transform = "rotate(90deg)";
      }
    
      if (type2 == 2) {
        tempoNote.style.transform = "rotate(-90deg)";
      }
    
        if (type2 == 3) {
          tempoNote.style.transform = "rotate(0deg)";
        }
      }

      var Y = 335;
      var tempN = 0;
      var play = true;
      
      var loop = setInterval(() => {
        tempoNote.style.top = Y + "px";
        tempoNote.style.left = game.notes[type2].style.left;

          if (game.settings.botplay !== true) {
            // manual mods
            
            if (isLongNote !== true) {
              if (Y <= -10 && game.notesPress == type2 /*-50*/) {
                tempoNote.remove()
                playAnim(type2);
                healthBars("add",5)
                goodNoteHit()
                
                game.notesPress = null;
                generateNotesEffect(type2)
                clearInterval(this);
                clearInterval(loop);
              }
            } else {
              if (Y <= -10 && game.keyPress == true) {
                tempoNote.remove()
                healthBars("add",0.5)
                
                playAnim(type2)
                
                clearInterval(loop);
              }
            }
    
            if (Y <= -90) {
              healthBars("remove",11)
              tempoNote.remove()
              clearInterval(this);
              clearInterval(loop);
            }
            
          } else {
            // botplay mods
            
            if (Y <= -50 && play == true) {
              tempoNote.remove()
      
              if (game.settings.soundOnPressNote == true && isLongNote !== true) {
                new Audio("assets/sound/hitsound.ogg").play()
              }
              
              if (isLongNote !== true) {
                tempN = 25;
              } else {
                tempN = 25;
              }
      
              play = false;
              
              game.notes[type].onpointerdown()
      
              game.notesPress = null;
              if (isLongNote !== true) {
                goodNoteHit()
                healthBars("add",5)
                generateNotesEffect(type2)
              }
            }
    
            if (Y <= -50) {
              if (tempN <= 0) {
                healthBars("add",0.5)
                
                playAnim(type2);
                clearInterval(this);
                clearInterval(loop);
                game.notes[type].onpointerout()
              } else {
                tempN--;
              }
            }
          }
          
          if (game.canMoveNote == true && game.pauseGameState == false) {
            Y -= 3;
          }
      },0)
    }
}


function playAnim(type) {
  if (type == 0) {
    bf_L()
  }
      
  if (type == 2) { // oups
    bf_U()
  }
      
  if (type == 1) {
    bf_D()
  }
      
  if (type == 3) {
    bf_R()
  }
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
  tempoNote.style.scale = S;
  
  var loop = setInterval(() => {
    op -= 0.02
    tempoNote.style.opacity = op;
    if (game.song.metadata.assets["note splash"][3]["auto animate"] == true) {
      S -= 0.004;
      tempoNote.style.scale = S;
    }
    
    if (T <= 0) {
      tempoNote.remove()
      clearInterval(this);
      clearInterval(loop);
    }
    
    T -= 3;
  }, 0)
}

// chart system

function playChart(type) {
  var timer = 0;
  var note = 0;
  var data = game.song.chart;
  
  var A = 0;
  var B = 0;
  var C = 0;
  var beat = 1;
  var loop = setInterval(() => {
    
    timer = game.song.inst.currentTime * 1000;
    if (game.settings.botplay == true) {
      timer = timer + 740;
    } else {
      timer = timer + 707;
    }

    if (timer >= data.length) {
      if (A >= data.length) {
        clearInterval(loop)
        console.info("chart ended")
      }
      game.cam.asBf = data[A].mustHitSection;
      /*if (data[A].mustHitSection == false) {
        game.song.camAs = 1; // bf
      } else {
        game.song.camAs = 0; // dad
      }*/
      
      
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
  },0)
}

function makeLongNotes(type,L) {
  var step = 0;
  var value = 0;
  //console.log(L)
  if (L >= 1) {
  var m = setInterval(() => {
    value++;
    
    if (value >= L) {
      clearInterval(m);
    }
    
    if (value >= step) {
      value += 100;
      generateNotes(type,true);
    }
  }, 55)
  }
}

// anim

/* L = left, U = up, D = down, R = right */

function bf_L() {
  hideBf()
  
  document.getElementById("bf L").style.scale = 1
  playAnim_bf_L()
}

function bf_U() {
  hideBf()
  
  document.getElementById("bf U").style.scale = 1
  playAnim_bf_U()
}


function bf_D() {
  hideBf()
  
  document.getElementById("bf D").style.scale = 1
  playAnim_bf_D()
}

function bf_R() {
  hideBf()
  
  document.getElementById("bf R").style.scale = 1
  playAnim_bf_R()
}

hideBf()
function hideBf() {
  document.getElementById("bf N").style.scale = 0.0001
  
  document.getElementById("bf L").style.scale = 0.0001
  document.getElementById("bf U").style.scale = 0.0001
  document.getElementById("bf D").style.scale = 0.0001
  document.getElementById("bf R").style.scale = 0.0001
}

// Dad ( enemy )

function Dad_L() {
  playAnim_Dad_L()
}

function Dad_U() {
  playAnim_Dad_U()
}

function Dad_D() {
  playAnim_Dad_D()
}

function Dad_R() {
  playAnim_Dad_R()
}
// camera

let pl = document.createElement("a");
document.getElementById("GUI").appendChild(pl)

var camX = 0;
var camY = 0;
var camA = 0;
var camLoop = setInterval(() => {
  document.getElementById("GAME").style.left = camX + "px";
  document.getElementById("GAME").style.top = camY + "px";
  
  if (game.canMoveNote == true && game.pauseGameState == false) {
    if (game.cam.x >= camX - 1) {
      camX += game.cam.speed;
    }
  
    if (game.cam.x <= camX + 1) {
      camX -= game.cam.speed;
    }
  
    if (game.cam.y >= camY + 1) {
      camY += game.cam.speed;
    }
  
    if (game.cam.y <= camY - 1) {
      camY -= game.cam.speed;
    }

    if (game.cam.angle >= camA) {
      camA += game.cam.speed;
    }
  
    if (game.cam.angle <= camA) {
      camA -= game.cam.speed;
    }
  }
  // auto cam scroll
  if (game.cam.autoCam == true && game.canMoveNote == true && game.pauseGameState == false && game.canStart == true) {
    if /* cam as Dad */ (game.cam.asBf == false) {
      game.cam.x = game.song.metadata.assets.cam.Dad[0];
      game.cam.y = game.song.metadata.assets.cam.Dad[1];
    }
    
    if /* cam as BF */ (game.cam.asBf == true) {
      game.cam.x = game.song.metadata.assets.cam.bf[0];
      game.cam.y = game.song.metadata.assets.cam.bf[1];
    }
  }
},0)

setInterval(() => {
  if (game.menuPause.activate == true) {
    sessionStorage.setItem("game title",game.mainData.assets["custom Pause title text"])
  } else {
    sessionStorage.setItem("game title","Funky.mit engine | "+game.musicSelect)
  }
},0)

