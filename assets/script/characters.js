try {
function getCharacters() {
  // get the json file 
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[0]+".json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get bf json file, reson: "+allText)
      } else {
        game.data.bf = JSON.parse(allText);
        
        getCharacters2()
      } 
    }
  }
  rawFile.send();
}

function getCharacters2() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[2]+".json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get the file, reson: "+allText)
      } else {
        game.data.dad = JSON.parse(allText);
        
        loadCharacther()
        loadCharacther2()
        loadGameGui()
      } 
    }
  }
  rawFile.send();
}

function loadCharacther() {
  var flipAll = false;
  if (game.data.bf["flipX ?"] == true) {
    flipAll = true;
  }

  makeLocalAnim("bf N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["Neutre"].anim,game.data.bf.animations["Neutre"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"GAME",game.data.bf.animations["Neutre"]["speed"],game.data.bf.animations["Neutre"]["isloop ?"],game.data.bf.animations["Neutre"]["position"][0],game.data.bf.animations["Neutre"]["position"][1], flipAll)


  makeLocalAnim("bf L",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["L"].anim,game.data.bf.animations["L"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"GAME",game.data.bf.animations["L"]["speed"],game.data.bf.animations["L"]["isloop ?"],game.data.bf.animations["L"]["position"][0],game.data.bf.animations["L"]["position"][1], flipAll)
  makeLocalAnim("bf U",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["U"].anim,game.data.bf.animations["U"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"GAME",game.data.bf.animations["U"]["speed"],game.data.bf.animations["U"]["isloop ?"],game.data.bf.animations["U"]["position"][0],game.data.bf.animations["U"]["position"][1], flipAll)
  makeLocalAnim("bf D",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["D"].anim,game.data.bf.animations["D"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"GAME",game.data.bf.animations["D"]["speed"],game.data.bf.animations["D"]["isloop ?"],game.data.bf.animations["D"]["position"][0],game.data.bf.animations["D"]["position"][1], flipAll)
  makeLocalAnim("bf R",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["R"].anim,game.data.bf.animations["R"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"GAME",game.data.bf.animations["R"]["speed"],game.data.bf.animations["R"]["isloop ?"],game.data.bf.animations["R"]["position"][0],game.data.bf.animations["R"]["position"][1], flipAll)
}

function loadCharacther2() {
  var flipAll = true;
  if (game.data.dad["flipX ?"] == true) {
    flipAll = false;
  }
  
  makeLocalAnim("dad N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["Neutre"].anim,game.data.dad.animations["Neutre"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"GAME",game.data.dad.animations["Neutre"]["speed"],game.data.dad.animations["Neutre"]["isloop ?"],game.data.dad.animations["Neutre"]["position"][0],game.data.dad.animations["Neutre"]["position"][1], flipAll)

  makeLocalAnim("dad L",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["L"].anim,game.data.dad.animations["L"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"GAME",game.data.dad.animations["L"]["speed"],game.data.dad.animations["L"]["isloop ?"],game.data.dad.animations["L"]["position"][0],game.data.dad.animations["L"]["position"][1], flipAll)
  
  makeLocalAnim("dad U",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["U"].anim,game.data.dad.animations["U"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"GAME",game.data.dad.animations["U"]["speed"],game.data.dad.animations["U"]["isloop ?"],game.data.dad.animations["U"]["position"][0],game.data.dad.animations["U"]["position"][1], flipAll)
  
  makeLocalAnim("dad D",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["D"].anim,game.data.dad.animations["D"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"GAME",game.data.dad.animations["D"]["speed"],game.data.dad.animations["D"]["isloop ?"],game.data.dad.animations["D"]["position"][0],game.data.dad.animations["D"]["position"][1], flipAll)
  
  makeLocalAnim("dad R",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["R"].anim,game.data.dad.animations["R"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"GAME",game.data.dad.animations["R"]["speed"],game.data.dad.animations["R"]["isloop ?"],game.data.dad.animations["R"]["position"][0],game.data.dad.animations["R"]["position"][1], flipAll)
}

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
},1)


} catch (error) {
  PreError(error, false, true)
}