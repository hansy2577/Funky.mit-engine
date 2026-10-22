eruda.init()

let settings = {
  modsList: null,
  songList: null,
  scroll: new Audio("assets/sounds/scrollMenu.ogg"),
  theme: null,
  
  modsChoise: FMD_getStorage("mods choise"),
  
  settingsTab: ["gameplay","visual","graphics","mobile"],
  settingsList: [
    ["disable move cam?"," for better performances | if you want the cam don't move",0,
    "gameplay","boolean",["boolean"],false],
    
    // ---
    
    ["setting key","for pc player only",0,
    "graphics",null,"dfjk"],
    
    // ---
    
    ["screen bounce on beatHit","if the screen zoom bounce when a beat",0,
    "visual","boolean",["boolean"],true],
    
    ["custom icon bumping","type of icon effect",80,
    "visual","options",["default","golden apple"],"default"],
    
    ["show timer?","show the timer ( and the bar ) in game",120,
    "visual","boolean",["boolean"],true],
    
    ["notes fps","notes fps",160,
    "visual",null,[""],60],
    
    ["show ranking?","can lag in some devise | show you rank (sick , good , bad , shit)",200,
    "visual","boolean",["boolean"],true],

    // ---
    
    ["mobile key","for pc player only",0,
    "mobile","boolean",false,false]
  ]
}


if (settings.modsChoise == null) {
  settings.modsChoise = 1
  FMD_setStorage("mods choice",1);
}

sessionStorage.setItem("game title","Funky.mit engine | settings")

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
          alert("getModsList | fail to get the file, reson: " + allText)
        } else {
          settings.modsList = JSON.parse(allText);
          
          sessionStorage.setItem("modsList game", allText)
          getMods()
        }
      }
    }
  rawFile.send();
}

function getMods() {
    // get the json file
    var rawFile = new XMLHttpRequest();
    var reload = 0;
    rawFile.open("get", "mods/" + settings.modsList.mods[settings.modsChoise] + "/meta.json", true);
    rawFile.onreadystatechange = function() {
      reload++;
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
      }
      
      if (reload == 3) {
        if (allText == "Error 404, file not found.") {
          alert("getModsList | fail to get the file, reson: " + allText)
        } else {
          settings.songList = JSON.parse(allText)
          sessionStorage.setItem("songList game", allText)
          
          loadingEnd()
        }
      }
    }
  rawFile.send();
}


function loadingEnd() {
  document.getElementById("settingsBG").src = "mods/" + settings.modsList.mods[settings.modsChoise] + "/images/settingBG.png";
  document.getElementById("settingsBG").onloadeddata = function () {}
  document.getElementById("settingsBG").onerror = function (h) { document.getElementById("settingsBG").src = "assets/images/settingBG.png" }
  
  loadSetting()
}

//window.clientInformation
var onclickTime = 0;
document.onclick = function () {
  onclickTime++;
  if (onclickTime <= 1) {
    new Audio("mods/"+settings.modsList.mods[settings.modsChoise]+"/music/settingSong.ogg").onloadeddata = function () {
      settings.theme = new Audio("mods/"+settings.modsList.mods[settings.modsChoise]+"/music/settingSong.ogg")
      //settings.theme.play()
      settings.theme.loop = true;
    }
  }
}


function loadSetting() {
  var newPlayer = false;
  
  if (localStorage.getItem("FM : newPlayer?") == null) {
    localStorage.setItem("FM : newPlayer?",false);
    newPlayer = true;
  }
  
  
  for (var i = 0; i < settings.settingsList.length; i++) {
    const name = settings.settingsList[i][0];
    const type = settings.settingsList[i][4];
    var SE = document.createElement("a");
    
    document.getElementById(settings.settingsList[i][3]).appendChild(SE)
    if (type == "options") {
      var option = settings.settingsList[i][5];
    }

    SE.innerText = settings.settingsList[i][0];
    
    if (type == "options") {
      if (newPlayer) {
        FMD_setStorage("FM : "+name,settings.settingsList[i][6])
        SE.innerText = settings.settingsList[i][0] + " - "+settings.settingsList[i][6]
      } else {
        SE.innerText = settings.settingsList[i][0] + " - "+FMD_getStorage("FM : "+name,settings.settingsList[i][0]);
      }
    }
    
    if (name == "setting key") {
      if (newPlayer) {
        FMD_setStorage("FM : "+name,settings.settingsList[i][5])
      }
      SE.innerText = "setting key - "+FMD_getStorage("FM : "+name)
    }

    SE.id = settings.settingsList[i][0];
    SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px;";
    SE.onclick = function () {
      scrollSound()
      if (type == "boolean") {
        settingButtons('FM : '+name,name)
      }
      
      if (type == "options") {
        var reponse = prompt("choise as ["+option+"] |  0 = first, 1 = second");
        if (reponse == "" || reponse == " " || reponse == "null") reponse = 0;
        FMD_setStorage("FM : "+name,option[reponse]);
        this.innerText = (this.innerText.split("-")[0])+" - "+option[reponse];
      }
      
      if (name == "setting key") {
        FMD_setStorage("FM : "+name,prompt("left","d")+prompt("left","f")+prompt("left","j")+prompt("left","k"));
        document.getElementById(name).innerText = "setting key - "+FMD_getStorage("FM : "+name)
      }
      
      if (name == "notes fps") {
        FMD_setStorage("FM : " + name,prompt("fps"));
        document.getElementById(name).innerText = "notes fps - " + FMD_getStorage("FM : " + name)+"fps"
      }
    }
    
    if (type == "boolean" && !newPlayer) {
      if (FMD_getStorage('FM : '+SE.id) !== null) {
        if (FMD_getStorage('FM : '+SE.id) == "true") {
          SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid green";
        } else {
          SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid red";
        }
      } else {
        FMD_setStorage("FM : screen bounce on beatHit",false)
      }
    }
    
    if (type == "boolean" && newPlayer) {
      alert(settings.settingsList[i][6])
      if (settings.settingsList[i][6] == true) {
        SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: " + settings.settingsList[i][2] + "px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid green";
      } else {
        SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: " + settings.settingsList[i][2] + "px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid red";
      }
      FMD_setStorage('FM : ' + SE.id,settings.settingsList[i][6]);
    }
  }
  

}

function settingButtons(localStorageId,id) {
  if (FMD_getStorage(localStorageId) !== null) {
    if (FMD_getStorage(localStorageId) == "true") {
      FMD_setStorage(localStorageId,false)
      document.getElementById(id).style.border = "2px solid red"
    } else {
      FMD_setStorage(localStorageId,true)
      document.getElementById(id).style.border = "2px solid green"
    }
  } else {
    FMD_setStorage(localStorageId,true);
    document.getElementById(id).style.border = "2px solid green";
  }
}

function loadTab() {
  scrollSound()
  for (var i = 0; i < settings.settingsTab.length; i++) {
    document.getElementById(settings.settingsTab[i]).style.visibility = "hidden"
    document.getElementById("B"+settings.settingsTab[i]).innerText = "< "+settings.settingsTab[i]
  }
}

function scrollSound() {
  new Audio("mods/"+settings.modsList.mods[settings.modsChoise]+"/sounds/scrollMenu.ogg").play()
  new Audio("mods/"+settings.modsList.mods[settings.modsChoise]+"/sounds/scrollMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/scrollMenu.ogg").play()
  }
}

function backSound() {
  new Audio("mods/" + settings.modsList.mods[settings.modsChoise] + "/sounds/cancelMenu.ogg").play()
  new Audio("mods/" + settings.modsList.mods[settings.modsChoise] + "/sounds/cancelMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/cancelMenu.ogg").play()
  }
  
  setInterval(() => {
    settings.theme.volume -= 0.005;
  },0)
}