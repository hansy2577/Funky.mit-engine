let menu = {
  modsList: null,
  songList: null,
  selecte: false,
  modsChoise: FMD_getStorage("mods choise"),
  
  moddingMenu: true
}

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

document.getElementById('freeplay').style.visibility = "visible";
document.getElementById('setting').style.visibility = "visible";
document.getElementById('credit').style.visibility = "visible";
document.getElementById('mods').style.visibility = "visible";

FMS_makeCSSanim("credit",0.5,"cubic-bezier(0.68, -0.6, 0.32, 1.6)",1,
[{ top:"200px" },{ top:"155px"}])

FMS_makeCSSanim("setting",0.5,"cubic-bezier(0.68, -0.6, 0.32, 1.6)",1,
[{ left:"-690px" },{ left:"-420px"}])

FMS_makeCSSanim("mods",0.5,"cubic-bezier(0.68, -0.6, 0.32, 1.6)",1,
[{ left:"-690px" },{ left:"-450px"}])

FMS_makeCSSanim("freeplay",0.6,"cubic-bezier(0.68, -0.6, 0.32, 1.6)",1,
[{ left:"-690px" },{ left:"-410px"}])
  
function menuModding() {
  if (!menu.moddingMenu) {
    menu.moddingMenu = true;
    
    document.getElementById("menuChoiseButton").style.transform = "scale(0)"
  } else {
    menu.moddingMenu = false;
    
    document.getElementById("menuChoiseButton").style.transform = "scale(1)"
  }
}

var getImages = {
  loop: function () {}
}

function getImagesVerification(id,param) {
  var ret;
  var reson;
  var test = document.createElement("img")
  test.id = "-"+Math.random();
  document.head.appendChild(test)
  test.src = param;
  
  test.onerror = function (e) {
    reson = e
    ret = false;
    test.remove()
  }
  
  test.onloadeddata = function (e) {
    reson = e
    ret = true;
    test.remove()
    alert("yes"+e)
  }
  
  var lopp = setInterval(() => {
    if (ret == true) {
      alert("true"+reson)
      if (id == "") {
        
      }
      
      
      clearInterval(lopp);
    } else {
      alert("g"+reson)
      clearInterval(lopp);
    }
  },0)
}