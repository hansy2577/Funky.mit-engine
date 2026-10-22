/*function gameMenuStart(param) {
  transition(0)
  sessionStorage.setItem("skip opening",true)
}*/


let menu = {
  modsList: null,
  songList: null,
  selecte: false,
  modsChoise: FMD_getStorage("mods choise"),
  
  step: 0,
  
  moddingMenu: true
}

if (localStorage.getItem("FM : newPlayer1") == null || localStorage.getItem("FM : flashLight") == null){
  localStorage.setItem("FM : newPlayer1",false)
  if (window.confirm('hey !, before start ,do  you want disable flashLight ?')) {
    localStorage.setItem("FM : flashLight",false);
  } else {
    localStorage.setItem("FM : flashLight",true);
  };
};

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
          
          sessionStorage.setItem("modsList game", allText)
          
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

var e = 0;
setInterval(() => {
  e++;
  document.getElementById("mmh").style.top = ((Math.sin(e * 0.005)*10)-600)+"px"
  document.getElementById("fnflogo").style.top = ((Math.sin((e + 100) * 0.01)*2)-400)+"px"
},5)

let pressMenu = new Audio("assets/sounds/confirmMenu.ogg");

function letFunky() {
  whiteFlash()
  pressMenu.play()
      FMS_makeCSSanim("press!!!", 0.1, "ease", 15,
    [{ filter: "brightness(50%)" }, { filter: "brightness(200%)" }]).onfinish = function () {
          
    transition(2,false)}
}

document.addEventListener("keypress",function () {
  if (menu.step == 1) {
    letFunky();
  } else {
    /*document.getElementById("nothing").remove();
    menu.step++;*/
  }
})


function whiteFlash() {
  //window.open("settings-menu.html" ,"cible" ,"width=200, height=200, resizable=0, scrollbars=0, menubar=1, status=1, location=1, toolbar=1");
  if (localStorage.getItem("FM : flashLight") == "true") {
    const s = FMS_makeElement("", -40, -10,5,1000, 400);
    s.style.zIndex = 20;
    s.style.backgroundColor = "white";
    s.id = Math.random()
  
    FMS_makeCSSanim(s.id, 0.6, "ease", 1,
      [{ opacity: 1}, { opacity: 0}]).onfinish = function () {
        s.remove()
    }
  }
}