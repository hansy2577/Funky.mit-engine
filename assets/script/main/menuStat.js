let menu = {
  modsList: null,
  modsChoise: 1,
  songList: null,
  reset: false,
  
  position: 0
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
  var song = document.createElement("a");
  document.body.appendChild(song);
  song.innerText = name;
  song.style.cssText += "zIndex: 5; position: absolute; background-Color: #00000052; border-radius: 6px; padding: 6px; left: 10px; width: 300px";
  song.style.fontSize = "19px"
  song.style.top = "152px"
  
  var loop = setInterval(() => {
    if (menu.position == pos) {
      song.style.visibility = "visible";
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
  },0)
}

function changeBG() {
  document.getElementById("freeplayBG").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/Images/freeplayBG.png"
  document.getElementById("freeplayBG").onerror = function () {
    PreError("fail to get 'freeplayBG.png' in the mods '"+menu.modsList[menu.modsChoise]+"' ",false)
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

function play(param) {
  sessionStorage.setItem("game",'["'+menu.modsList.mods[menu.modsChoise]+'","'+menu.songList.song[menu.position]+'"]')
  window.location = "game.html";
}