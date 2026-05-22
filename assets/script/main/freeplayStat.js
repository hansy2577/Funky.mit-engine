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

// freeplay()

global.tab = "freeplay";
sessionStorage.setItem("game title","Funky.mit engine | freeplay ")

// load data

document.getElementById("freeplay").style.visibility = "visible"
menu.inFreeplay = true;

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
        alert("getModsList | fail to get the file, reson: "+allText)
      } else {
        menu.songList = JSON.parse(allText)
        
        afterLoad()
      }
    }
  }
  rawFile.send();
  StartFreakyMusic()
}


function afterLoad() {
    freeplay()
}

// menu section

// freeplay section

function freeplay() {
  setInterval(() => {
    if (menu.songSelectioned !== null) {
      if (menu.inFreeplay == true) {
        document.getElementById("BGcolor").style.visibility = "visible";
        document.getElementById("freeplayBG").style.visibility = "visible";
    
        document.getElementById("BGcolor").style.backgroundColor = menu.songList.song.data[menu.songSelectioned].color
      } else {
        document.getElementById("BGcolor").style.visibility = "hidden";
        document.getElementById("freeplayBG").style.visibility = "hidden";
      }
    }
  },10)
  
  for (var i = 0; i < menu.songList.song.list.length; i++) {
    MakeSongElement(menu.songList.song.list[i],i)
  }

  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+" ›";
}

function StartFreakyMusic() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/music/freakyMenu.ogg").onloadeddata = function () {
    menu.sound.freakyMenu = new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/music/freakyMenu.ogg")
  }
  menu.sound.freakyMenu.play()
  menu.sound.freakyMenu.loop = true;
  menu.sound.freakyMenu.volume = 0;

  setInterval(() => {
    if (menu.sound.freakyMenu.volume <= 0.9) {
      menu.sound.freakyMenu.volume += 0.01;
    }
  },0)
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
        // if selecte 
        if (menu.inFreeplay == true) {
          song.style.visibility = "visible";
        } else {
          song.style.visibility = "hidden";
        }
        song.style.opacity = "1";
        song.style.top = "152px"
        song.style.fontSize = "19px";
        song.innerText = "> "+name;
        
        if (menu.songSelectioned !== song.innerText) {
          menu.songSelectioned = name;
        }
        
        if (localStorage.getItem(menu.modsList.mods[menu.modsChoise]+":"+name) == undefined) {
          
        }
      } else {
        // if not
        song.innerText = "< "+name;
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
  document.getElementById("freeplayBG").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplayBG.png"
  document.getElementById("freeplayBG").onerror = function () {
    PreError("fail to get 'freeplayBG.png' in the mods '"+menu.modsList[menu.modsChoise]+"' ",false)
  }
}

function moveUp() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position - 1>= 0 ) {
    menu.position--;
  } else {
    menu.position = menu.songList.song.list.length - 1;
  }
  
  menu.difficulties_value = 0;
  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+" ›";
}


function moveDown() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position + 2 <= menu.songList.song.list.length) {
    menu.position++;
  } else {
    menu.position = 0;
  }
  
  menu.difficulties_value = 0;
  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+" ›";
}

function play() {
  sessionStorage.setItem("game",'["'+menu.modsList.mods[menu.modsChoise]+'","'+menu.songList.song.list[menu.position]+'","'+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+'"]')
  menu.selectionNeed = true;
  menu.sound.selecte.play()
}

function difficult() {
  if (menu.difficulties_value + 2 <= menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties.length) {
    menu.difficulties_value++;
  } else {
    menu.difficulties_value = 0;
  }
  
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+" ›";
}

document.addEventListener('keydown', function(event) {
  if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
    document.getElementById("difficult").onclick();
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