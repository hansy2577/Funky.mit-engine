editor = {
  chara: null,
  x:0,
  y:0,
  z:1,
  currentAnim: null,
  oldAnim: null,
  
  animDelay: {
    
  }
}

global.tab = "editor";

function getCharacters() {
    // get the json file
    var rawFile = new XMLHttpRequest();
    var reload = 0;
    rawFile.open("get", document.getElementById("file").value+".json", true);
    rawFile.onreadystatechange = function() {
      reload++;
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
      }
      
      if (allText == "") {
        PreError("fail to load '"+document.getElementById("file").value+".json' ", false, false)
      }

      if (reload == 3) {
        if (allText == "Error 404, file not found.") {
          PreError("fail to get the file, reson: " + allText, false, false)
        } else {
          alert("anim load")
          editor.chara = JSON.parse(allText);
          
          loadCharacther()
        }
      }
    }
  rawFile.send();
}
  
function addExtratAnim() {
  var name = prompt('Anim name');
  makeLocalAnim(name, document.getElementById("file2").value+ editor.chara.animations[name].anim, editor.chara.animations[name][name], 100, 80, editor.chara.scale, "GAME", editor.chara.animations[naùe]["speed"], editor.chara.animations[name]["isloop ?"])
  document.getElementById("s").style.scale = 1
}
  
function loadCharacther() {
    makeLocalAnim("N", document.getElementById("file2").value+"/"+ editor.chara.animations["Neutre"].anim, editor.chara.animations["Neutre"]["length"], 100, 80, editor.chara.scale, "GAME", editor.chara.animations["Neutre"]["speed"], editor.chara.animations["Neutre"]["isloop ?"], editor.chara.animations["Neutre"]["position"][0], editor.chara.animations["Neutre"]["position"][1])
    makeLocalAnim("L", document.getElementById("file2").value+"/"+ editor.chara.animations["L"].anim, editor.chara.animations["L"]["length"], 100, 80, editor.chara.scale, "GAME", editor.chara.animations["L"]["speed"], editor.chara.animations["L"]["isloop ?"] ,editor.chara.animations["L"]["position"][0], editor.chara.animations["L"]["position"][1])
    makeLocalAnim("U", document.getElementById("file2").value+"/"+ editor.chara.animations["U"].anim, editor.chara.animations["U"]["length"], 100, 80, editor.chara.scale, "GAME", editor.chara.animations["U"]["speed"], editor.chara.animations["U"]["isloop ?"] ,editor.chara.animations["U"]["position"][0], editor.chara.animations["U"]["position"][1])
    makeLocalAnim("D", document.getElementById("file2").value+"/"+ editor.chara.animations["D"].anim, editor.chara.animations["D"]["length"], 100, 80, editor.chara.scale, "GAME", editor.chara.animations["D"]["speed"], editor.chara.animations["D"]["isloop ?"] ,editor.chara.animations["D"]["position"][0], editor.chara.animations["D"]["position"][1])
    makeLocalAnim("R", document.getElementById("file2").value+"/"+ editor.chara.animations["R"].anim, editor.chara.animations["R"]["length"], 100, 80, editor.chara.scale, "GAME", editor.chara.animations["R"]["speed"], editor.chara.animations["R"]["isloop ?"] ,editor.chara.animations["R"]["position"][0], editor.chara.animations["R"]["position"][1])
    
    document.getElementById("L folder").style.opacity = 0.2
    document.getElementById("U folder").style.opacity = 0.2
    document.getElementById("D folder").style.opacity = 0.2
    document.getElementById("R folder").style.opacity = 0.2
    document.getElementById("N folder").style.opacity = 0.2
  }
  
document.addEventListener('keydown', function(event) {
  if (event.key == "ArrowLeft") {
    editor.x += 3;
    document.getElementById("GAME").style.left = `${editor.x}px`;
  }
  
  if (event.key == "ArrowRight") {
    editor.x -= 3;
    document.getElementById("GAME").style.left = `${editor.x}px`;
  }

  
  if (event.key == "ArrowDown") {
    editor.y -= 3;
    document.getElementById("GAME").style.top = `${editor.y}px`;
  }

  if (event.key == "ArrowUp") {
    editor.y += 3;
    document.getElementById("GAME").style.top = `${editor.y}px`;
  }
  
  
  if (event.key == "o") {
    editor.z -= 0.005;
    document.getElementById("GAME").style.scale = `${editor.z}`;
  }
  
  if (event.key == "i") {
    editor.z += 0.005;
    document.getElementById("GAME").style.scale = `${editor.z}`;
  }

})

function playAnimation() {
  playLocalAnim(document.getElementById("anim").value);
  editor.currentAnim = document.getElementById("anim").value;
  document.getElementById(document.getElementById("anim").value+" folder").style.opacity = 1;
  
  if (editor.oldAnim == null) {
    editor.oldAnim = document.getElementById("anim").value;
  } else {
    if (editor.oldAnim !== document.getElementById("anim").value) {
      document.getElementById(editor.oldAnim+" folder").style.opacity = 0.1
    }
  }
  
  editor.oldAnim = document.getElementById("anim").value;
}

function refrechDelay() {
  document.getElementById(editor.currentAnim+" folder").style.transform = "translateX("+document.getElementById('delay1').value+"px)";
  
  document.getElementById(editor.currentAnim+" folder").style.transform += "translateY("+document.getElementById('delay2').value+"px)";
}

function saveDelay() {
  prompt('put in your anim',document.getElementById(editor.currentAnim+" folder").style.transform = '"position":['+document.getElementById('delay1').value+','+document.getElementById('delay2').value+']');
}
  
  /*
  let bfIdle = 0;
  let dadIdle = 0;
  
  function bf_L() {
    hideBf()
    
    document.getElementById("bf L folder").style.scale = 1
    playLocalAnim("bf L")
  }
  
  function bf_U() {
    hideBf()
    
    document.getElementById("bf U folder").style.scale = 1
    playLocalAnim("bf U")
  }
  
  
  function bf_D() {
    hideBf()
    
    document.getElementById("bf D folder").style.scale = 1
    playLocalAnim("bf D")
  }
  
  function bf_R() {
    hideBf()
    
    document.getElementById("bf R folder").style.scale = 1
    playLocalAnim("bf R")
  }
  
  function hideBf() {
    bfIdle = 3;
    document.getElementById("bf N folder").style.scale = 0;
    document.getElementById("bf L folder").style.scale = 0;
    document.getElementById("bf U folder").style.scale = 0;
    document.getElementById("bf D folder").style.scale = 0;
    document.getElementById("bf R folder").style.scale = 0;
  }
  
  // Dad ( enemy )
  
  function Dad_L() {
    hidedad()
    
    document.getElementById("dad L folder").style.scale = 1
    playLocalAnim("dad L")
  }
  
  function Dad_U() {
    hidedad()
    
    document.getElementById("dad U folder").style.scale = 1
    playLocalAnim("dad U")
  }
  
  
  function Dad_D() {
    hidedad()
    
    document.getElementById("dad D folder").style.scale = 1
    playLocalAnim("dad D")
  }
  
  function Dad_R() {
    hidedad()
    
    document.getElementById("dad R folder").style.scale = 1
    playLocalAnim("dad R")
  }
  
  function hidedad() {
    dadIdle = 3;
    document.getElementById("dad N folder").style.scale = 0;
    document.getElementById("dad L folder").style.scale = 0;
    document.getElementById("dad U folder").style.scale = 0;
    document.getElementById("dad D folder").style.scale = 0;
    document.getElementById("dad R folder").style.scale = 0;
  }
  
  setInterval(() => {
    if (game.BPM.beatHit == true && IsStopped_LocalAnim("bf N") == "true") {
      if (bfIdle <= 1) {
        document.getElementById("bf L folder").style.scale = 0;
        document.getElementById("bf U folder").style.scale = 0;
        document.getElementById("bf D folder").style.scale = 0;
        document.getElementById("bf R folder").style.scale = 0;
        
        document.getElementById("bf N folder").style.scale = 1;
        
        playLocalAnim("bf N");
      } else {
        bfIdle -= 1;
      }
    }
    
    if (game.BPM.beatHit == true && IsStopped_LocalAnim("dad N") == "true") {
      if (dadIdle <= 1) {
        document.getElementById("dad L folder").style.scale = 0;
        document.getElementById("dad U folder").style.scale = 0;
        document.getElementById("dad D folder").style.scale = 0;
        document.getElementById("dad R folder").style.scale = 0;
        
        document.getElementById("dad N folder").style.scale = 1;
        
        playLocalAnim("dad N");
      } else {
        dadIdle -= 1;
      }
    }
  }, 1)
  */