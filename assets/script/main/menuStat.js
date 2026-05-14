let menu = {
  modsList: null,
  modsChoise: 1,
  songList: null,
  reset: false,
  selectionNeed: false,
  inFreeplay: false,
  
  sound: {
    selecte: new Audio('assets/sound/confirmMenu.ogg')
  },
  
  position: 0
}

if (sessionStorage.getItem("skip opening") == "true") {
  document.getElementById("mmh").style.visibility = "hidden"
  document.getElementById("freeplay").style.visibility = "visible"
  menu.inFreeplay = true;
}

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
        alert("getModsList | fail to get the file, reson: "+allText)
      } else {
        menu.modsList = JSON.parse(allText);
        changeBG()
        getSong()
        
        new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/confirmMenu.ogg").onloadeddata = function () {
          menu.sound.selecte = new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/confirmMenu.ogg")
        }
        
      }
    }
  }
  rawFile.send();
}

function getSong() {
  // get the json file
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
        alert("getModsList | fail to get the file, reson: "+allText)
      } else {
        menu.songList = JSON.parse(allText)
        
        for (var i = 0; i < menu.songList.song.length; i++) {
          MakeSongElement(menu.songList.song[i],i)
        }
        
      }
    }
  }
  rawFile.send();
}

function MakeSongElement(name,pos) {
  var disableMove = false;
  var op = 0.5;
  var size = 19;
  var song = document.createElement("a");
  var epilepte = 0;
  var epilepte_time = 0;
  
  document.getElementById("freeplay").appendChild(song);
  song.innerText = name;
  song.style.cssText += "zIndex: 5; position: absolute; background-Color: #00000052; border-radius: 6px; padding: 6px; left: 10px; width: 300px";
  song.style.fontSize = "19px"
  song.style.top = "152px"
  
  var loop = setInterval(() => {
    if (disableMove == false) {
      if (menu.position == pos) {
        if (menu.inFreeplay == true) {
          song.style.visibility = "visible";
        } else {
          song.style.visibility = "hidden";
        }
        song.style.opacity = "1";
        song.style.top = "152px"
        song.style.fontSize = "19px";
      } else {
        song.style.fontSize = "15px";
      
        if (menu.position - 1 == pos) {
          song.style.opacity = "0.5";
          song.style.top = "60px"
        }
      
        if (menu.position + 1 == pos) {
          song.style.opacity = "0.5";
          song.style.top = "250px"
        }
      
        if (menu.position + 2 <= pos) {
          song.style.opacity = "0";
        }
      
        if (menu.position - 2 >= pos) {
          song.style.opacity = "0";
        }
      }
    
      if (menu.reset == true) {
        clearInterval(loop)
        menu.position = 0;
        song.remove()
      }
    }
    
    if (menu.selectionNeed == true && menu.position == pos) {
      // if it the right song, do the animation in loop
      
      disableMove = true;
      
      if (size <= 23) {
        size += 1;
      }
      
      song.style.fontSize = size+"px";
      
      if (epilepte <= 20) {
        song.style.backgroundColor = "#73737369"
      } else {
        song.style.backgroundColor = "#00000052"
      }
      
      if (epilepte >= 30) {
        epilepte = 0;
        epilepte_time++;
      }
      epilepte++;
      
      if (epilepte_time >= 9) {
        transition(1)
      }
      
      // end
    }
    
    if (menu.selectionNeed == true && menu.position !== pos) {
      disableMove = true;
      op -= 0.01;
      song.style.opacity = op;
    }
  },0)
}

function changeBG() {
  document.getElementById("freeplayBG").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/Images/freeplayBG.png"
  document.getElementById("freeplayBG").onerror = function () {
    PreError("fail to get 'freeplayBG.png' in the mods '"+menu.modsList[menu.modsChoise]+"' ",false)
  }
}

function moveUp() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position - 1>= 0 ) {
    menu.position--;
  } else {
    menu.position = menu.songList.song.length - 1;
  }
}


function moveDown() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position + 2 <= menu.songList.song.length) {
    menu.position++;
  } else {
    menu.position = 0;
  }
}

function play() {
  sessionStorage.setItem("game",'["'+menu.modsList.mods[menu.modsChoise]+'","'+menu.songList.song[menu.position]+'"]')
  menu.selectionNeed = true;
  menu.sound.selecte.play()
}