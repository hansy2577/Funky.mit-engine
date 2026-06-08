menu = {
  modsList: null,
  songList: null,
  
  modsChoise: localStorage.getItem("mods choise")
}

if (menu.modsChoise == null) {
  menu.modsChoise = 1
  localStorage.setItem("mods choice",1);
}

sessionStorage.setItem("game title","Funky.mit engine | menu")

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
          menu.modsList = JSON.parse(allText);
          
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
    rawFile.open("get", "mods/" + menu.modsList.mods[menu.modsChoise] + "/meta.json", true);
    rawFile.onreadystatechange = function() {
      reload++;
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
      }
      
      if (reload == 3) {
        if (allText == "Error 404, file not found.") {
          alert("getModsList | fail to get the file, reson: " + allText)
        } else {
          menu.songList = JSON.parse(allText)
          sessionStorage.setItem("songList game", allText)
          
          loadingEnd()
        }
      }
    }
  rawFile.send();
}


function loadingEnd() {
  const tscript = document.createElement("script");
  tscript.src = "mods/"+menu.modsList.mods[menu.modsChoise] + "/scripts/onMenu.js";
  document.body.appendChild(tscript);
  
  document.getElementById("menuBG").src = "mods/" + menu.modsList.mods[menu.modsChoise] + "/images/menuBG.png";
  document.getElementById("menuBG").onloadeddata = function () {}
  document.getElementById("menuBG").onerror = function (h) { document.getElementById("menuBG").src = "assets/images/menuBG.png" }
  
  document.getElementById("freeplay").src = "mods/" + menu.modsList.mods[menu.modsChoise] + "/images/menuButtons/freeplay.png";
  document.getElementById("freeplay").onloadeddata = function () {}
  document.getElementById("freeplay").onerror = function () { document.getElementById("menuBG").src = "assets/images/menuButtons/freeplay.png" }

  document.getElementById("setting").src = "mods/" + menu.modsList.mods[menu.modsChoise] + "/images/menuButtons/setting.png";
  document.getElementById("setting").onloadeddata = function () {}
  document.getElementById("setting").onerror = function () { document.getElementById("menuBG").src = "assets/images/menuButtons/setting.png" }

  document.getElementById("mods").src = "mods/" + menu.modsList.mods[menu.modsChoise] + "/images/menuButtons/mods.png";
  document.getElementById("mods").onloadeddata = function () {}
  document.getElementById("mods").onerror = function () { document.getElementById("menuBG").src = "assets/images/menuButtons/mods.png" }
}

function scrollSound() {
  new Audio("mods/" + settings.modsList.mods[settings.modsChoise] + "/sounds/scrollMenu.ogg").play()
  new Audio("mods/" + settings.modsList.mods[settings.modsChoise] + "/sounds/scrollMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/scrollMenu.ogg").play()
  }
}

function backSound() {
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/cancelMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/cancelMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/cancelMenu.ogg").play()
  }
}

function selectionnedSound() {
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/confirmMenu.ogg").play()
  }
}
