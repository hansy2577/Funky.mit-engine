let menu = {
  modsList: null,
  songList: null,
  selecte: false,
  modsChoise: FMD_getStorage("mods choise"),
  
  moddingMenu: true
}

let freeplayMenuSongs = new Audio('assets/music/freakyMenu.ogg');

if (menu.modsChoise == null) {
  menu.modsChoise = 1
  FMD_setStorage("mods choice",1);
}

sessionStorage.setItem("game title","Funky.mit engine | menu")

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
  freeplayMenuSongs = new Audio("source/mods/"+settings.modsList.mods[settings.modsChoise]+"/music/freakyMenu.ogg");
  freeplayMenuSongs.play();
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

function selectionnedSound(id) {
  if (!menu.selecte) {
  menu.selecte = true;
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").play()
  new Audio("mods/" + menu.modsList.mods[menu.modsChoise] + "/sounds/confirmMenu.ogg").onerror = function fname(param) {
    new Audio("assets/sounds/confirmMenu.ogg").play()
  }
  
  document.getElementById(id).style.filter = "brightness(100%)"
  document.getElementById(id).style.scale += 4
  
  FMS_makeCSSanim(id,0.1,"ease",10,
  [{ filter:"brightness(50%)" },{ filter:"brightness(200%)"}])
  }
}
