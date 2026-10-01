// freeplay.js is propably the worse script i made in F.M ever ,
// good luck for try to traducte them

let menu = {
  modsList: null,
  modsChoise: 0,
  songList: null,
  reset: false,
  selectionNeed: null,
  inFreeplay: false,
  songSelectioned: null,
  tuleDelete: false,
  tuleMake: 0,
  
  loadMods: false,
  
  sound: {
    selecte: new Audio('assets/sound/confirmMenu.ogg'),
    freakyMenu: new Audio('assets/music/freakyMenu.ogg')
  },
  
  difficulties_value: 0,
  position: 0
}

// freeplay()

global.tab = "freeplay";
sessionStorage.setItem("game title","Funky.mit engine | Freeplay")

// load data

if (FMD_getStorage("mods choise") !== null) {
  menu.modsChoise = Number.parseInt(FMD_getStorage("mods choise"));
}

document.getElementById("freeplay").style.visibility = "visible"
menu.inFreeplay = true;

getModsList()
function getModsList() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", "mods/modsList.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getModsList | fail to get the file, reson: "+allText)
      } else {
        menu.modsList = JSON.parse(allText);
        
        getMods()
      }
    }
  }
  rawFile.send();
}

function getMods() {
  // get the json file
  changeBG()
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", "mods/"+menu.modsList.mods[menu.modsChoise]+"/meta.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getModsMeta | fail to get the mods meta '"+menu.modsList.mods[menu.modsChoise]+"/meta.json' , reson: "+allText)
        
        metaOfRescuse()
      } else {
        menu.songList = JSON.parse(allText)
        
        if (!menu.loadMods) {
          afterLoad()
        }
      }
    }
  }
  
  if (!menu.loadMods) {
    
  }

  rawFile.send();
}

function metaOfRescuse() {
  // get the json file
  changeBG()
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", "assets/meta.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getModsMeta | fail to get the mods meta '"+menu.modsList.mods[menu.modsChoise]+"/meta.json' , reson: "+allText)
      } else {
        menu.songList = JSON.parse(allText)
        
        afterLoad()
        difficult()
      }
    }
  }
  rawFile.send();
}


var clicDov = false
document.onclick = function () {
  if (!clicDov) {
    clicDov = !clicDov
    StartFreakyMusic()
  }
}
//

function afterLoad() {
  freeplay()
  
  const tscript2 = document.createElement("script");
  tscript2.src = "mods/"+menu.modsList.mods[menu.modsChoise] + "/scripts/onFreeplay.js";
  document.body.appendChild(tscript2);
}

// menu section

function settingPress(name) {
  if (sessionStorage.getItem("FM : "+name) !== undefined && sessionStorage.getItem("FM : "+name) !== null && sessionStorage.getItem("FM : "+name) !== "false") {
    document.getElementById("S:"+name).style.border = "2px solid red";
    sessionStorage.setItem("FM : "+name,"false")
  } else {
    document.getElementById("S:"+name).style.border = "2px solid green";
    sessionStorage.setItem("FM : "+name,"true")
  }
}

function settingStart(name) {
  if (sessionStorage.getItem("FM : "+name) !== undefined && sessionStorage.getItem("FM : "+name) !== null && sessionStorage.getItem("FM : "+name) !== "false") {
    document.getElementById("S:"+name).style.cssText += "border: 2px solid green";
  } else {
    document.getElementById("S:"+name).style.cssText += "border: 2px solid red";
    sessionStorage.setItem("FM : "+name,"false")
  }
}

settingStart("Botplay");



// freeplay section

function freeplay() {
  document.getElementById("modsSelect").innerText = "mods: "+menu.modsList.mods[menu.modsChoise]

  setInterval(() => {
    if (menu.songSelectioned !== null) {
      if (menu.inFreeplay == true) {
        document.getElementById("BGcolor").style.visibility = "visible";
        document.getElementById("freeplayBG").style.visibility = "visible";
    
        var color = FMS_makeCSSanim("BGcolor", 0.9, "ease-in", "1", [
          { backgroundColor: menu.songList.song.data[menu.songSelectioned].color }
        ])
        
        color.play()
        
        document.getElementById("BGcolor").style.backgroundColor = menu.songList.song.data[menu.songSelectioned].color
  
      } else {
        document.getElementById("BGcolor").style.visibility = "hidden";
        document.getElementById("freeplayBG").style.visibility = "hidden";
      }
    }
  },10)
  
  var songListData = Object.keys(menu.songList.song.data)
  //animList.includes('Neutre')
  
  menu.tuleMake = 0;
  for (var i = 0; i < songListData.length; i++) {
    MakeSongElement(songListData[i],i,menu.songList.song.data[songListData[i]].name)
    menu.tuleMake++;
  }
  
  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[Object.keys(menu.songList.song.data)[menu.position]].difficulties[menu.difficulties_value]+" ›";
}

function StartFreakyMusic() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/music/freakyMenu.ogg").onloadeddata = function () {
    menu.sound.freakyMenu = new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/music/freakyMenu.ogg")
  }
  menu.sound.freakyMenu.play()
  menu.sound.freakyMenu.loop = true;
  menu.sound.freakyMenu.volume = 0;

  let defaultloop = setInterval(() => {
    if (menu.sound.freakyMenu.volume <= 0.9) {
      menu.sound.freakyMenu.volume += 0.01;
    } else {
      clearInterval(defaultloop)
    }
  },0)
}

function MakeSongElement(name,pos,altName) {
  var disableMove = false;
  var op = 0.5;
  var size = 19;
  var song = document.createElement("a");
  var epilepte = 0;
  var epilepte_time = 0;
  var oldPos = "12px";
  
  document.getElementById("freeplay").appendChild(song);
  
  song.id = "tule: "+name;
  song.name = "tule2: "+pos;
  song.innerText = name;
  song.style.cssText += "zIndex: 5; position: absolute; background-Color: #00000052; border-radius: 6px; padding: 6px; width: 300px";
  song.style.fontSize = "19px"
  song.style.top = "152px"
  song.style.left = "-100px";
  song.style.visibility = "hidden"
  
  
  var anim = setInterval(() => {
    song.style.visibility = "visible"
      FMS_makeCSSanim(song.id,0.5,"ease-out", "1",[{ left: "10px" }]).onfinish = function () 
  {
    song.style.left = "10px";
  }
  clearInterval(anim)
  },300)

  
  var oldPos
  var cur = "";
  var posYo = ""
  var loop = setInterval(() => {
    if (menu.tuleDelete) {
      song.remove();
      clearInterval(loop);
    }
    
    if (menu.position !== cur || menu.selectionNeed) {
      if (!menu.selectionNeed) {
        cur = menu.position;
        
        if (menu.position == pos) {
          song.style.top = posYo;
          posYo = "152px";
          song.style.fontSize = "19px";
          song.innerText = "> "+altName;
        
          if (menu.songSelectioned !== song.innerText) {
            menu.songSelectioned = name;
          }
        } else {
          // if not
        
          song.innerText = "< "+altName;
          song.style.fontSize = "15px";
      
          if (menu.position - 1 == pos) {
            song.style.opacity = "0.5";
            song.style.top = "152px";
            posYo = "60px"
          }
      
          if (menu.position + 1 == pos) {
            song.style.opacity = "0.5";
            song.style.top = "152px";
            posYo = "250px"
          }
        
          song.style.top = "152px";
            
          if (menu.position + 2 <= pos) {
            if (song.style.opacity !== "0") {
              FMS_makeCSS_opacity(song.id,0.3,[0.5,0],"ease",1).onfinish = function () {
                song.style.opacity = "0";
              }
              posYo = "300px"
            }
          }
      
          if (menu.position - 2 >= pos) {
            if (song.style.opacity !== "0") {
              FMS_makeCSS_opacity(song.id,0.3,[0.5,0],"ease",1).onfinish = function () {
                song.style.opacity = "0";
              }
              posYo = "20px"
            }
          }
        }
        
        oldPos = pos;
        if (song.style.opacity !== "0") {
          FMS_makeCSSanim(song.id,0.2,"ease-out", "1",[{ top: posYo }]).onfinish = function () 
          {
            song.style.top = posYo;
          }
          {
            song.style.top = song.style.top;
          }
          song.style.top = song.style.top;
        }
        
      } else {
        if (!disableMove) {
        if (menu.position == pos) {
          // if is the tule select xd
          
          disableMove = true;
          FMS_makeCSS_opacity(song.id,0.3,[0.5,0.4],"ease",1).onfinish = function () {
            song.style.opacity = "0.4";
            song.style.fontSize = "21px";
            
            FMS_makeCSSanim(song.id,0.1,"ease",15,[{ opacity:"1" },{ opacity:"0.4"}]).onfinish = function () {
              // play screen animation
              transition(1,false,FMS_makeCSSanim(document.body.id,2,"ease-in",0.7,[
                { scale: 3, opacity: 0.2}]).onfinish = function () {
                document.body.style.filter = "brightness(-500%)";
                document.body.style.opacity = 0;
              })
            }
          }
        } else {
          // if not
          
          if (song.style.opacity !== "0") {
            FMS_makeCSS_opacity(song.id,0.3,[0.5,0],"ease",1).onfinish = function () {
              song.style.opacity = "0";
            }
          }
        }
        }
      }
    }
  },50)
}

function changeBG() {
  document.getElementById("freeplayBG").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplayBG.png"
  document.getElementById("freeplayBG").onerror = function () {
    PreError("fail to get 'freeplayBG.png' in the mods '"+menu.modsList[menu.modsChoise]+"' ",false)
  }
}





var iSmoveUp = true;
function moveUp() {
  if (iSmoveUp) {
    iSmoveUp = false
    var lop = setInterval(() => {
      iSmoveUp = true
      crollSound()
      if (menu.position - 1>= 0 ) {
        menu.position--;
      } else {
        menu.position = Object.keys(menu.songList.song.data).length - 1;
      }
      menu.difficulties_value = 0;
      reLoadTuleSongData()
      clearInterval(lop)
      
    },200)
  }
}

var iSmoveDown= true;
function moveDown() {
  if (iSmoveDown) {
    iSmoveDown = false
    var lop = setInterval(() => {
      iSmoveDown = true
      crollSound()
      if (menu.position + 2 <= Object.keys(menu.songList.song.data).length) {
        menu.position++;
      } else {
        menu.position = 0
      }
        
      menu.difficulties_value = 0;
      reLoadTuleSongData()
      clearInterval(lop)
    },200)
  }
}

function reLoadTuleSongData() {
  document.getElementById(`difficult text`).innerText = menu.songList.song.data[Object.keys(menu.songList.song.data)[menu.position]].difficulties[menu.difficulties_value]
  document.getElementById(`difficult`).innerText = FMD_getStorage("FM : "+menu.songSelectioned+""+menu.modsList.mods[menu.modsChoise]);
  document.getElementById(`difficult icon`).src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplay/difficulties icon/"+menu.songList.song.data[Object.keys(menu.songList.song.data)[menu.position]].difficulties[menu.difficulties_value]+".png"
  
  if (FMD_getStorage("FM : "+menu.songSelectioned+""+menu.modsList.mods[menu.modsChoise]) !== null) {
    document.getElementById(`difficult`).innerText = FMD_getStorage("FM : "+menu.songSelectioned+""+menu.modsList.mods[menu.modsChoise]);
  } else {
    document.getElementById(`difficult`).innerText = 0
  }
}


function play() {
  sessionStorage.setItem("game",'["'+menu.modsList.mods[menu.modsChoise]+'","'+Object.keys(menu.songList.song.data)[menu.position]+'","'+menu.songList.song.data[Object.keys(menu.songList.song.data)[menu.position]].difficulties[menu.difficulties_value]+'"]')
  menu.selectionNeed = true;
  selectionnedSound()
}

function difficult() {
  if (menu.difficulties_value + 2 <= menu.songList.song.data[Object.keys(menu.songList.song.data)[menu.position]].difficulties.length) {
    menu.difficulties_value++;
  } else {
    menu.difficulties_value = 0;
  }
  
  crollSound()
  reLoadTuleSongData()
}

document.addEventListener('keydown', function(event) {
  if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
    document.getElementById("difficult icon").onclick();
  }
  
  if (event.key == "Enter") {
    play()
  }
  
  if (event.key == "ArrowDown") {
    moveDown()
  }

  if (event.key == "ArrowUp") {
    moveUp()
  }
  
  if (event.key == "Backspace") {
    transition(2)
  }
})

function crollSound() {
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/scrollMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/scrollMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/scrollMenu.ogg").play()
  }
}

function selectionnedSound() {
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/confirmMenu.ogg").play()
  }
}

function backSound() {
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/cancelMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/cancelMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/cancelMenu.ogg").play()
  }
  
  clearInterval(defaultloop)
  setInterval(() => {
    menu.sound.freakyMenu.volume -= 0.015;
  },0)
}

function changeModsSelect() {
  menu.modsChoise++;
  menu.loadMods = true;
  
  if (FMD_getStorage("mods choise") >= menu.modsList.mods.length - 1) {
    menu.modsChoise = 0;
  }
  FMD_setStorage("mods choise",menu.modsChoise)
  document.getElementById("modsSelect").innerText = "mods: "+menu.modsList.mods[menu.modsChoise]
  
  getMods()
  
  menu.position = 0;
  changeModsSelect2()
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
}

function changeModsSelect2() {
  document.getElementById("modsSelect").style.visibility = "hidden"
  menu.tuleDelete = true;
  
  updateMetaMods();
  var loop = setInterval(() => {
    menu.tuleDelete = false;
    document.getElementById("modsSelect").style.visibility = "visible"
    document.getElementById("mods icon").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/icon.png";
 
    changeBG()
    freeplay()
    clearInterval(loop)
  },500)
}


function updateMetaMods() {
  document.getElementById("md:icon").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/icon.png";
  document.getElementById("mods icon").innerText = menu.songList["mods alt name"]
}

function settingTab() {
  if (document.getElementById("settings").style.visibility == "hidden") {
    document.getElementById("settingSelect").style.backgroundColor = "black";
    document.getElementById("settings").style.visibility = "visible";
    FMS_makeCSS_Ypos("settings",0.1,[10,0],"ease-out",1)
  } else {
    document.getElementById("settingSelect").style.backgroundColor = "#00000052";
    FMS_makeCSS_Ypos("settings",0.05,[0,5],"ease-in",1).onfinish = function () {
      document.getElementById("settings").style.visibility = "hidden";
    }
  }
}