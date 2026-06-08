let settings = {
  modsList: null,
  songList: null,
  scroll: new Audio("assets/sounds/scrollMenu.ogg"),
  theme: null,
  
  modsChoise: localStorage.getItem("mods choise"),
  
  settingsTab: ["gameplay","visual","graphics","mobile"],
  settingsList: [
    ["disable move cam?"," for better performances | if you want the cam don't move",0,
    "gameplay","boolean",["boolean"]],
    
    // ---
    
    ["setting key","for pc player only",0,
    "graphics",null],
    
    // ---
    
    ["screen bounce on beatHit","if the screen zoom bounce when a beat",0,
    "visual","boolean",["boolean"]],
    
    ["text bounce on beatHit", "if the text bounce when a beat", 40,
    "visual", "boolean", ["boolean"]],
    
    ["custom icon bumping","type of icon effect",80,
    "visual","options",["default","golden apple"]],
    
    ["show timer?","show the timer ( and the bar ) in game",120,
    "visual","boolean",["boolean"]],
    
    ["show healthBar?","show the healthBar and the icon",160,
    "visual","boolean",["boolean"]],
    
    ["show ranking?","can lag in some devise | show you rank (sick , good , bad , shit)",200,
    "visual","boolean",["boolean"]],

    // ---
    
    ["mobile key","for pc player only",0,
    "mobile","boolean"]
  ]
}

if (settings.modsChoise == null) {
  settings.modsChoise = 1
  localStorage.setItem("mods choice",1);
}

sessionStorage.setItem("game title","Funky.mit engine | settings")

getModsList()
function getModsList() {
    // get the json file
    var rawFile = new XMLHttpRequest();
    var reload = 0;
    rawFile.open("get", "mods/modsList.txt", true);
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
      settings.theme.play()
      settings.theme.loop = true;
    }
  }
}


function loadSetting() {
  for (var i = 0; i < settings.settingsList.length; i++) {
    const name = settings.settingsList[i][0];
    const type = settings.settingsList[i][4];
    var SE = document.createElement("a");
    
    document.getElementById(settings.settingsList[i][3]).appendChild(SE)
    if (type == "options") {
      var option = settings.settingsList[i][5];
    }

    SE.innerText = settings.settingsList[i][0];
    
    if (name == "setting key") {
      SE.innerText = "setting key - "+localStorage.getItem(name)
    }

    SE.id = settings.settingsList[i][0];
    SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px;";
    SE.onclick = function () {
      scrollSound()
      if (type == "boolean") {
        settingButtons('FM : '+name,name)
      }
      
      if (type == "options") {
        localStorage.setItem("FM : "+name,option[prompt("choise as ["+option+"] |  0 = first, 1 = second")]);
      }
      
      if (name == "setting key") {
        localStorage.setItem("FM : "+name,prompt("left","d")+prompt("left","f")+prompt("left","j")+prompt("left","k"));
        document.getElementById(name).innerText = "setting key - "+localStorage.getItem("FM : "+name)
      }
    }
    
    if (type == "boolean") {
      if (localStorage.getItem('FM : '+SE.id) !== null) {
        if (localStorage.getItem('FM : '+SE.id) == "true") {
          SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid green";
        } else {
          SE.style = "z-index: 2; font-size: 10px; color: white; position: absolute; left: 250px; top: "+settings.settingsList[i][2]+"px; width: 200px; background-Color: #5050507D; border-radius: 2px; padding: 5px; border: 2px solid red";
        }
      } else {
        localStorage.setItem("FM : screen bounce on beatHit",false)
      }
    }
  }
  

}

function settingButtons(localStorageId,id) {
  if (localStorage.getItem(localStorageId) !== null) {
    if (localStorage.getItem(localStorageId) == "true") {
      localStorage.setItem(localStorageId,false)
      document.getElementById(id).style.border = "2px solid red"
    } else {
      localStorage.setItem(localStorageId,true)
      document.getElementById(id).style.border = "2px solid green"
    }
  } else {
    localStorage.setItem(localStorageId,true)
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