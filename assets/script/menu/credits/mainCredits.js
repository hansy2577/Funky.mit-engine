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
  position: 0,
  
  credit: [
    ["string","hansy2577",{ 
      "role":"coder/artist/animator/musician", 
      "color":"#8C380D", 
      "description":"make everything !"
    }],
    
    ["list","•",{"role":"", "color":"", "description":""}],

  ]
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
  credit()
    
  const tscript2 = document.createElement("script");
  tscript2.src = "mods/"+menu.modsList.mods[menu.modsChoise] + "/scripts/onFreeplay.js";
  document.body.appendChild(tscript2);
}

// menu section

// freeplay section

function credit() {
  document.getElementById(`role`).innerText = menu.credit[menu.position][2].role
  document.getElementById(`description`).innerText = menu.credit[menu.position][2].description
  
  setInterval(() => {
        var color = FMS_makeCSSanim("BGcolor", 0.9, "ease-in", "1", [
          { backgroundColor: menu.credit[menu.position][2].color }
        ])
        color.play()

    
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
  
  for (var i = 0; i < menu.credit.length; i++) {
    MakeTextElement(menu.credit[i],i)
  }
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

function MakeTextElement(data,pos) {
  var disableMove = false;
  var op = 0.5;
  var size = 19;
  var song = document.createElement("a");
  var epilepte = 0;
  var epilepte_time = 0;
  var oldPos = "12px";
  
  document.getElementById("freeplay").appendChild(song);

  
  song.id = "tule: "+data[1];
  song.innerText = data[1];
  song.style.cssText += "zIndex: 5; position: absolute; color: white; background-Color: #00000052; border-radius: 6px; padding: 6px; left: 250px; width: 300px";
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
        if (data[0] == "list") {
          song.innerText = data[1];
        } else {
          song.innerText = "> "+data[1];
        }
        
      } else {
        // if not
        
        if (data[0] == "list") {
          song.innerText = data[1];
        } else {
          song.innerText = "< "+data[1];
        }

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
  document.getElementById("freeplayBG").src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/creditsBG.png"
  document.getElementById("freeplayBG").onerror = function () {
    PreError("fail to get 'freeplayBG.png' in the mods '"+menu.modsList[menu.modsChoise]+"' ",false)
  }
}


function moveUp() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position - 1>= 0 ) {
    menu.position--;
  } else {
    menu.position = menu.credit.length - 1;
  }
  
  menu.difficulties_value = 0;
  document.getElementById(`description`).innerText = menu.credit[menu.position][2].description
  document.getElementById(`role`).innerText = menu.credit[menu.position][2].role
  document.getElementById(`difficult icon`).src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplay/difficulties icon/"+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+".png";
}


function moveDown() {
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  
  if (menu.position + 2 <= menu.credit.length) {
    menu.position++;
  } else {
    menu.position = 0;
  }
  
  menu.difficulties_value = 0;
  document.getElementById(`description`).innerText = menu.credit[menu.position][2].description
document.getElementById(`role`).innerText = menu.credit[menu.position][2].role
document.getElementById(`difficult icon`).src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplay/difficulties icon/"+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+".png"
}


function play() {

  
}

function difficult() {
  if (menu.difficulties_value + 2 <= menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties.length) {
    menu.difficulties_value++;
  } else {
    menu.difficulties_value = 0;
  }
  
  new Audio("mods/"+menu.modsList.mods[menu.modsChoise]+"/sounds/scrollMenu.ogg").play()
  document.getElementById(`difficult`).innerText = "‹ "+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+" ›";
  document.getElementById(`difficult icon`).src = "mods/"+menu.modsList.mods[menu.modsChoise]+"/images/freeplay/difficulties icon/"+menu.songList.song.data[menu.songList.song.list[menu.position]].difficulties[menu.difficulties_value]+".png"
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
