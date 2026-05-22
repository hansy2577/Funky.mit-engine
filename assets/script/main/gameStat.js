let o = JSON.parse(sessionStorage.getItem("game"))
if (sessionStorage.getItem("game") == undefined) {
  PreError("fail to get data from 'menu.html', try again", false, true)
}

global.tab = "game"

let game = {
  canStart: false,
  
  scores: 0,
  missed: 0,
  
  healthBars: {
    value: 50,
    bumpIcon: true,
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
    beatHit: false,
    beat4Hit: false
  },
  
  song: {
    chart: null,
    metadata: null,
    
    inst: null,
    voice: null,
    voice2: null
  },
  
  canMoveNote: true,
  
  notesPress: null,
  
  canLongNotes: {
    L: false,
    U: false,
    D: false,
    R: false
  },
  
  keyPress: {
    L: false,
    U: false,
    D: false,
    R: false
  },
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
    bumpingScreen: false,
    
    noteSplash: true,
    botplay: false,
    data: null,
    key: ["d","f","j","k"]
  },
  
  menuPause: {
    canMenuPause: true,
    activate: false
  },
  
  pauseGameState: false,
  
  modsSelect: "fail",
  songFolder: null,
  songSelect: null,
  modsFolder: null,
  songDifficulties: null,
  
  stage: {
    data: null,
    
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
try {

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
        PreError("getMainJson | no mods found or no main json found"+allText, false, true)
      } else {
        game.mainData = JSON.parse(allText);
        
        game.modsSelect = yourmods;
        game.songSelect = o[1];
        game.songDifficulties = o[2];
        game.songFolder = "mods/"+game.modsSelect+"/song/"+o[1]+"/"+o[2]
        game.modsFolder = "mods/"+game.modsSelect
        
        getSetingJson("mods/"+"settings.json");
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
        PreError("getSetingJson | fail to get the file, reson: "+allText, false, true)
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
        PreError("getMetadataJson | fail to get the file, reson: "+allText, false, true)
      } else {
        game.song.metadata = JSON.parse(allText)
        game.canStart = true;
        
        onPreLoad()
        getStageData(game.song.metadata.assets.stage)
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
        PreError("getChartJson | fail to get the file, reson: "+allText, false, true)
      } else {
        game.song.chart = JSON.parse(allText)
      }
    }
  }
  rawFile.send();
}

function getStageData(link) {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", game.modsFolder+"/stage/"+link+".json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        PreError("getChartJson | fail to get the file, reson: "+allText, false, true)
      } else {
        game.stage.data = JSON.parse(allText)
        loadStage(JSON.parse(allText))
      }
    }
  }
  rawFile.send();
}


// pre-load

function loadStage(data) {
  game.stage.BG = document.createElement("img");
  document.getElementById("GAME").appendChild(game.stage.BG);

  game.stage.BG.style.position = "absolute";
  game.stage.BG.src = "mods/" + game.modsSelect + "/" + data.src;
  game.stage.BG.onerror = function() {
    PreError("fail to load the background", false, false)
  }
  game.stage.BG.style.left = data.position[0] + "px";
  game.stage.BG.style.top = data.position[1] + "px";
  game.stage.BG.style.scale = data.scale;
  game.stage.BG.style.zIndex = -1;
  
  getCharacters()
}

var antiLoop = 0;
function onPreLoad() { if (antiLoop == 0 ) {
  // load all stage element
  
  const tscript = document.createElement("script");
  tscript.src = game.songFolder + "/main.js";
  document.body.appendChild(tscript);

  // load audio
  
  if /* disable voice */ (game.song.metadata["is Voice"]) {
    game.song.voice = new Audio(game.songFolder+ "/Voice"+game.song.metadata["song type"]);
    game.song.voice.onerror = function () {
      PreError("fail to load 'voice' audio", false, false)
    }
    game.song.voice.volume = game.song.metadata["chart"]["Voice volume"];
  }
  
  if /* disable voice */ (game.song.metadata["is Voice2"]) {
    game.song.voice2 = new Audio(game.songFolder+ "/Voice2"+game.song.metadata["song type"]);
    game.song.voice2.onerror = function () {
      PreError("fail to load 'voice2' audio", false, false)
    }
    game.song.voice.volume = game.song.metadata["chart"]["Voice volume"];
  }
  
  game.song.inst = new Audio(game.songFolder+ "/Inst"+game.song.metadata["song type"]);  
  game.song.inst.onerror = function () {
    PreError("fail to load 'Inst' audio", false, true)
  }
  game.song.inst.volume = game.song.metadata["chart"]["Inst volume"];
  
  // make note and other
  makeNote(153,"player");
  loadPauseMenu();
  
  antiLoop++;
}}

// starting

var onclickTime = 0;
document.onclick = function () {
  onclickTime++;
  if (onclickTime <= 1) {
    gameStart()
    document.getElementById("PressFoPlay").remove()
  }
}
  
function gameStart() {
  if (game.song.metadata["is Voice"]) {
    game.song.voice.play();
  }
  
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.play();
  }

  game.song.inst.play();
  
  game.cam.speed = game.song.metadata.assets["cam speed"] * 2.5;
  if (game.cam.speed <= 1) {
    PreError("'cam speed' value to negative",false ,true)
  }
  
  game.stage.bf = document.getElementById("bf");
  game.stage.gf = document.getElementById("gf");
  game.stage.dad = document.getElementById("dad");
  
  playChart()
  notesKey();
  startBPM(game.song.metadata.chart.BPM);
  MakeMobileButtonsNotes(true)
  
  game.song.voice.onended = function () {
    game.healthBars.bumpIcon = false;
  }
  
  game.song.inst.onended = function () {
    transition(2)
  }
}

// other

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
  
  if (type == 4) {
    Dad_L()
  }
  
  if (type == 6) { // oups
    Dad_U()
  }
  
  if (type == 5) {
    Dad_D()
  }
  
  if (type == 7) {
    Dad_R()
  }
}

// chart system

function playChart(type) {
  var timer = 0;
  var note = 0;
  var data = game.song.chart;
  
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;
  var loopP = setInterval(() => {
    if (game.song.inst.currentTime * 1000 >= 1 && reloadSong == 0) {
      reloadSong = 1;
      
      game.song.inst.currentTime = 0;
      if (game.song.metadata["is Voice"]) {
        game.song.voice.currentTime = 0;
      }
      
      if (game.song.metadata["is Voice2"]) {
        game.song.voice2.currentTime = 0;
      }
    }
    
    timer = game.song.inst.currentTime * 1000;
    if (game.settings.botplay == true) {
      timer = timer + 790;
    } else {
      timer = timer + 790;
    }
    
    if (A >= data.length) {
      localStorage.setItem(game.modsSelect+":"+o[0],game.scores)
      clearInterval(loopP)
      console.clear();
      console.info("chart ended")
    }


    if (timer >= data.length) {
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
          
          if (data[A].sectionNotes[B][1] >= 3) {
            generateDadNotes(data[A].sectionNotes[B][1])
            if (data[A].sectionNotes[B][2] >= 0) {
              makeDadLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
            }
          }
          
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
  })
}

function makeLongNotes(type,L) {
  var step = 0;
  var value = -50;
  //console.log(L)
  if (L >= 1) {
  var mb = setInterval(() => {
    
    if (value >= L) {
      clearInterval(mb);
    }
    
    value += 40;

    if (value >= step) {
      step += 300;
      generateNotes(type,true);
    }
  }, 13)
  }
}

function makeDadLongNotes(type,L) {
  var step = 0;
  var value = 0;
  //console.log(L)
  if (L >= 1) {
  var md = setInterval(() => {
    
    if (value >= L) {
      clearInterval(md);
    }
    
    value += 160;

    if (value >= step) {
      step += value * 3;
      generateDadNotes(type);
    }
  }, 55)
  }
}

// camera

let pl = document.createElement("a");
document.getElementById("GUI").appendChild(pl)

var camX = 0;
var camY = 0;
var camA = 0;
var camLoop = setInterval(() => {
  if (game.cam.x !== camX) {
    document.getElementById("GAME").style.left = camX + "px";
  }
  if (game.cam.y !== camY) {
    document.getElementById("GAME").style.top = camY + "px";
  }
  
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
  if (game.cam.autoCam == true && game.canMoveNote == true && game.pauseGameState == false && game.canStart == true && game.BPM.beatHit == true) {
    if /* cam as Dad */ (game.cam.asBf == false) {
      game.cam.x = game.stage.data.cam.Dad[0];
      game.cam.y = game.stage.data.cam.Dad[1];
    }
    
    if /* cam as BF */ (game.cam.asBf == true) {
      game.cam.x = game.stage.data.cam.bf[0];
      game.cam.y = game.stage.data.cam.bf[1];
    }
  }
},1)

setInterval(() => {
  //console.log(game.keyPress.U)
  if (game.menuPause.activate == true) {
    sessionStorage.setItem("game title",game.mainData.assets["custom Pause title text"])
  } else {
    sessionStorage.setItem("game title","Funky.mit engine | "+game.songSelect)
  }
},global.frameLimite * 2)


} catch (error) {
  PreError(error, false, true)
}