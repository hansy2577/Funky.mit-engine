/*function gameMenuStart(param) {
  transition(0)
  sessionStorage.setItem("skip opening",true)
}*/

let menu = {
  modsList: null,
  songList: null,
  selecte: false,
  modsChoise: FMD_getStorage("mods choise"),
  
  moddingMenu: true
}

sessionStorage.setItem("game title","Funky.mit engine | menu")

getModsList()
function getModsList() {
    /* get the json file*/var rawFile = new XMLHttpRequest(); var reload = 0;rawFile.open("get",
    "mods/modsList.json",true);rawFile.onreadystatechange = function() { reload++;
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
      }
      
      if (reload == 3) {
        if (allText == "Error 404, file not found.") {
          alert("getModsList | fail to get the file, reson: " + allText)
        } else {
          var reset = false;
          if (JSON.parse(allText).mods[FMD_getStorage("mods choice")] == null) {
            FMD_setStorage("mods choise",0);
            reset = true;
          }
          
          menu.modsList = JSON.parse(allText);
          document.getElementById("nothing").style.visibility = "visible"
          document.getElementById("mmh").style.visibility = "visible"
          if (reset) {
            document.getElementById("nothing").src = "mods/"+JSON.parse(allText).mods[0]+"/images/titleScreen.png";
          } else {
            document.getElementById("nothing").src = "mods/"+JSON.parse(allText).mods[FMD_getStorage("mods choice")]+"/images/titleScreen.png";
          }
          
        }
      }
    }
  rawFile.send();
}