let o = JSON.parse(sessionStorage.getItem("game"))
if (sessionStorage.getItem("game") == undefined) {
  PreError("fail to get data from 'menu.html', try again", false, true)
}

global.tab = "game"

let game = {
  canStart: false,
  isStarting: false,
  
  scores: 0,
  missed: 0,
  
  characters: {
    gfIdAnim: {
      NR: "gf NR",
      NL: "gf NL"
    },
    
    bfIdAnim: {
      L: "bf L",
      U: "bf U",
      D: "bf D",
      R: "bf R",
      miss: "bf Miss",
      hey: "bf hey"
    },
    
    dadIdAnim:{
      L: "dad L",
      U: "dad U",
      D: "dad D",
      R: "dad R",
      hey: "dad hey"
    }
  },
  
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
    inMilliseconds: null
  },
  
  song: {
    name: null,
    difficulties: null,
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
    bumpingScreen: true,
    
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
  },
  
  events: {
    onBeatHit: false,
    onStepHit: false,
    onNotesHit: false,
    onGoodNotesHit: false,
    onMiss: false,
    onRandomKeyPress: false,
    onNotesOpponentHit: false,
    onDadIconWin: false,
    onBFIconWin: false
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
        game.song.name = o[1];  // just like up
        game.songDifficulties = o[2];
        game.song.difficulties = o[2]; // just like up
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
        
        game.BPM.currentBPM = game.song.metadata.chart.BPM;
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
  rawFile.open("get", game.modsFolder+"/stages/"+link+".json", true);
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
  game.stage.BG.style.zIndex = -10;
  
  getCharacters()
}

var antiLoop = 0;
function onPreLoad() { if (antiLoop == 0 ) {
  // load all stage element
  
  const tscript = document.createElement("script");
  tscript.src = game.songFolder + "/main.js";
  document.body.appendChild(tscript);

  const tscript2 = document.createElement("script");
  tscript2.src = game.modsFolder + "/scripts/onGame.js";
  document.body.appendChild(tscript2);

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
    game.song.voice2.volume = game.song.metadata["chart"]["Voice volume"];
  }
  
  game.song.inst = new Audio(game.songFolder+ "/Inst"+game.song.metadata["song type"]);  
  game.song.inst.onerror = function () {
    PreError("fail to load 'Inst' audio", false, true)
  }
  game.song.inst.volume = game.song.metadata["chart"]["Inst volume"];
  
  game.song.inst.onloadeddata = function () {
    songLoadedVerifier()
  }
  
  if (game.song.metadata["is Voice"]) {
  game.song.voice.onloadeddata = function () {
    songLoadedVerifier()
  }
  }
  
  if (game.song.metadata["is Voice2"]) {
  game.song.voice2.onloadeddata = function () {
    songLoadedVerifier()
  }
  }

  
  // make note and other
  
  document.getElementById("menu songName").innerText = game.songSelect +" - "+game.songDifficulties;
  
  game.BPM.inMilliseconds = bpmTomillisecond(game.BPM.currentBPM)
  makeNote(153,"player");
  loadPauseMenu();
  
  antiLoop++;
}}

var songLoadedVerifier_value = 0;
function songLoadedVerifier() {
  if (songLoadedVerifier_value <= 4) {
  songLoadedVerifier_value++;
  
  if (game.song.metadata["is Voice"]) {
    if (game.song.metadata["is Voice2"]) {
      if (songLoadedVerifier_value >= 2) {
        endLoading()
      }
    } else {
      if (songLoadedVerifier_value >= 1) {
        endLoading()
      }
    }
  } else {
    if (songLoadedVerifier_value >= 0) {
      endLoading()
    }
  }
  }
}

function endLoading() {
  var somethingRandom = setInterval(() => {
    if (game.isStarting == false) {
      document.getElementById("loadingS").remove()
      clearInterval(somethingRandom)
    }
  },3000)
}

function startingGlobalGame() {
  gameStart()
  game.isStarting = true;
  document.getElementById("PressFoPlay").remove()
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
    PreError("'cam speed' value can't be negative",false ,true)
  }
  
  game.stage.bf = document.getElementById("Boyfriend");
  game.stage.gf = document.getElementById("gf");
  game.stage.dad = document.getElementById("dad");
  
  playChart_BF()
  playChart_DAD()
  
  notesKey();
  startBPM(game.BPM.currentBPM);
  if (localStorage.getItem("FM : mobile key") == "true") {
    MakeMobileButtonsNotes(true)
  }
  
  game.song.voice.onended = function () {
    game.healthBars.bumpIcon = false;
  }
  
  game.song.inst.onended = function () {
    transition(4)
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

function makeLongNotes(type,L) {
  var step = 0;
  var value = -50;
  //console.log(L)
  if (L >= 1) {
  var mb = setInterval(() => {
    
    if (value >= L * 1.6) {
      clearInterval(mb);
    }
    
    value += 35;

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
    
    if (value >= L * 1.5) {
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
  if (game.cam.autoCam == true && game.canMoveNote == true && game.pauseGameState == false && game.canStart == true && game.events.onBeatHit == true) {
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