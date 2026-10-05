let menu = {
  modsList: null,
  modsChoise: 1,
  songList: null,
  reset: false,
  selectionNeed: null,
  inFreeplay: false,
  songSelectioned: null,
  
  sound: {
    selecte: new Audio('assets/sound/confirmMenu.ogg'),
    freakyMenu: new Audio('assets/music/freakyMenu.ogg')
  },
  
  difficulties_value: 0,
  position: 0
}

global.tab = "menu";

// load data

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
          sessionStorage("modsList game", allText)
          
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
          
          sessionStorage("songList game", allText)
        }
      }
    }
    rawFile.send();
    StartFreakyMusic()
  }
