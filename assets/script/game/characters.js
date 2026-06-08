try {
function getCharacters() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[0]+"/main.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get '"+"mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[0]+"/main.json' file, reson: "+allText)
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
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[2]+"/main.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get '"+"mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[2]+"/main.json' file, reson: "+allText)
      } else {
        game.data.dad = JSON.parse(allText);
        
        getCharacters3()
      } 
    }
  }
  rawFile.send();
}

function getCharacters3() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[1]+"/main.json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get '"+"mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[1]+"/main.json' json file, reson: "+allText)
      } else {
        game.data.gf = JSON.parse(allText);
        
        loadCharacther()
        loadCharacther2()
        loadCharacther3()
        loadGameGui()
      } 
    }
  }
  rawFile.send();
}


function loadCharacther() {
  var flipAll = false;
  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  if (game.data.bf["flipX ?"] == true) {
    flipAll = true;
  }

  if (animList.includes('Neutre')) {
    makeLocalAnim("bf N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["Neutre"].anim,game.data.bf.animations["Neutre"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["Neutre"]["speed"],game.data.bf.animations["Neutre"]["isloop ?"],game.data.bf.animations["Neutre"]["position"][0],game.data.bf.animations["Neutre"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'Neutre' animation")
  }
  
  
  if (animList.includes('L')) {
    makeLocalAnim(game.characters.bfIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["L"].anim,game.data.bf.animations["L"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["L"]["speed"],game.data.bf.animations["L"]["isloop ?"],game.data.bf.animations["L"]["position"][0],game.data.bf.animations["L"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'L' animation")
  }
  
  if (animList.includes('U')) {
    makeLocalAnim(game.characters.bfIdAnim.U,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["U"].anim,game.data.bf.animations["U"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["U"]["speed"],game.data.bf.animations["U"]["isloop ?"],game.data.bf.animations["U"]["position"][0],game.data.bf.animations["U"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'U' animation")
  }
  
  if (animList.includes('D')) {
    makeLocalAnim(game.characters.bfIdAnim.D,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["D"].anim,game.data.bf.animations["D"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["D"]["speed"],game.data.bf.animations["D"]["isloop ?"],game.data.bf.animations["D"]["position"][0],game.data.bf.animations["D"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'D' animation")
  }
  
  if (animList.includes('R')) {
    makeLocalAnim(game.characters.bfIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["R"].anim,game.data.bf.animations["R"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["R"]["speed"],game.data.bf.animations["R"]["isloop ?"],game.data.bf.animations["R"]["position"][0],game.data.bf.animations["R"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'R' animation")
  }
  
  if (animList.includes('Miss')) {
    makeLocalAnim(game.characters.bfIdAnim.miss,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["Miss"].anim,game.data.bf.animations["Miss"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["Miss"]["speed"],game.data.bf.animations["Miss"]["isloop ?"],game.data.bf.animations["Miss"]["position"][0],game.data.bf.animations["Miss"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'Miss' animation")
  }
  
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Neutre" &&  animList[i] !== "L" &&  animList[i] !== "U" &&  animList[i] !== "D" &&  animList[i] !== "R") {
      makeLocalAnim("bf "+animList[i],game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations[animList[i]].anim,game.data.bf.animations[animList[i]]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations[animList[i]]["speed"],game.data.bf.animations[animList[i]]["isloop ?"],game.data.bf.animations[animList[i]]["position"][0],game.data.bf.animations[animList[i]]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    }
  }
}

function loadCharacther2() {
  var flipAll = true;
  var animList = Object.keys(game.data.dad.animations) // Json key to array 
  if (game.data.dad["flipX ?"] == true) {
    flipAll = false;
  }
  
  makeLocalAnim("dad N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["Neutre"].anim,game.data.dad.animations["Neutre"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["Neutre"]["speed"],game.data.dad.animations["Neutre"]["isloop ?"],game.data.dad.animations["Neutre"]["position"][0],game.data.dad.animations["Neutre"]["position"][1], flipAll, game.data.dad["Padding Length ?"])

  makeLocalAnim(game.characters.dadIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["L"].anim,game.data.dad.animations["L"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["L"]["speed"],game.data.dad.animations["L"]["isloop ?"],game.data.dad.animations["L"]["position"][0],game.data.dad.animations["L"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  makeLocalAnim(game.characters.dadIdAnim.U,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["U"].anim,game.data.dad.animations["U"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["U"]["speed"],game.data.dad.animations["U"]["isloop ?"],game.data.dad.animations["U"]["position"][0],game.data.dad.animations["U"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  makeLocalAnim(game.characters.dadIdAnim.D,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["D"].anim,game.data.dad.animations["D"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["D"]["speed"],game.data.dad.animations["D"]["isloop ?"],game.data.dad.animations["D"]["position"][0],game.data.dad.animations["D"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  makeLocalAnim(game.characters.dadIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["R"].anim,game.data.dad.animations["R"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["R"]["speed"],game.data.dad.animations["R"]["isloop ?"],game.data.dad.animations["R"]["position"][0],game.data.dad.animations["R"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
}

function loadCharacther3() {
  var flipAll = false;
  if (game.data.gf["flipX ?"] == true) {
    flipAll = true;
  }
  
  makeLocalAnim(game.characters.gfIdAnim.NL,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[1] +"/"+ game.data.gf.animations["NL"].anim,game.data.gf.animations["NL"]["length"],game.stage.data.characters.gf[0],game.stage.data.characters.gf[1],game.data.gf.scale,"Girlfriend",game.data.gf.animations["NL"]["speed"],game.data.gf.animations["NL"]["isloop ?"],game.data.gf.animations["NL"]["position"][0],game.data.gf.animations["NL"]["position"][1], flipAll, game.data.gf["Padding Length ?"])
  makeLocalAnim(game.characters.gfIdAnim.NR,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[1] +"/"+ game.data.gf.animations["NR"].anim,game.data.gf.animations["NR"]["length"],game.stage.data.characters.gf[0],game.stage.data.characters.gf[1],game.data.gf.scale,"Girlfriend",game.data.gf.animations["NR"]["speed"],game.data.gf.animations["NR"]["isloop ?"],game.data.gf.animations["NR"]["position"][0],game.data.gf.animations["NR"]["position"][1], flipAll, game.data.gf["Padding Length ?"])

  idleAnim()
}

// -------


let bfIdle = 0;
let dadIdle = 0;

function bf_L() {
  hideBf()
  bfIdle = game.data.bf.animations["L"]["length"];
  
  document.getElementById(game.characters.bfIdAnim.L+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.L)
}

function bf_U() {
  hideBf()
  bfIdle = game.data.bf.animations["U"]["length"];

  document.getElementById(game.characters.bfIdAnim.U+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.U)
}

function bf_D() {
  hideBf()
  bfIdle = game.data.bf.animations["D"]["length"];
  
  document.getElementById(game.characters.bfIdAnim.D+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.D)
}

function bf_R() {
  hideBf()
  bfIdle = game.data.bf.animations["R"]["length"];
  
  document.getElementById(game.characters.bfIdAnim.R+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.R)
}

function bf_miss() {
  hideBf()
  bfIdle = game.data.bf.animations["Miss"]["length"];
  
  document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.miss)
}

function hideBf() {
  document.getElementById("bf N folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.L+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.U+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.D+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.R+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;

  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Miss" && animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R") {
      document.getElementById("bf "+animList[i]+" folder").style.scale = 0;
    }
  }
}


// Dad ( enemy )

function Dad_L() {
  hidedad()
  
  document.getElementById(game.characters.dadIdAnim.L+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.L)
}

function Dad_U() {
  hidedad()
  
  document.getElementById(game.characters.dadIdAnim.U+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.U)
}

function Dad_D() {
  hidedad()
  
  document.getElementById(game.characters.dadIdAnim.D+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.D)
}

function Dad_R() {
  hidedad()
  
  document.getElementById(game.characters.dadIdAnim.R+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.R)
}


function hidedad() {
  dadIdle = 3;
  document.getElementById("dad N folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.L+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.U+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.D+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.R+" folder").style.scale = 0;
  
  //makeIdleAnim("dad N folder",game.characters.dadIdAnim.L,game.characters.dadIdAnim.U,game.characters.dadIdAnim.D,game.characters.dadIdAnim.R)
}


function idleAnim() {
let gfIdle = 0;
let animList = Object.keys(game.data.bf.animations) // Json key to array 

setInterval(() => {
  if (IsStopped_LocalAnim("bf N") == "true") {
    if (bfIdle <= 0.1) {
      if (game.events.onBeatHit == true) {
        document.getElementById(game.characters.bfIdAnim.L + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.U + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.D + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.R + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;

        document.getElementById("bf N folder").style.scale = 1;
        
        for (var i = 0; i < animList.length; i++) {
          if (animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R" && animList[i] !== "Miss") {
            document.getElementById("bf "+animList[i]+" folder").style.scale = 0;
          }
        }
      
        playLocalAnim("bf N");
      }
    } else {
      bfIdle -= bpmTomillisecond(game.BPM.currentBPM) * 0.0001;
    }
  }
  
  if (IsStopped_LocalAnim("dad N") == "true") {
    if (dadIdle <= 0.1) {
      if (game.events.onBeatHit == true) {
        document.getElementById(game.characters.dadIdAnim.L + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.U + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.D + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.R + " folder").style.scale = 0;
      
        document.getElementById("dad N folder").style.scale = 1;
      
        playLocalAnim("dad N");
      }
    } else {
      dadIdle -= bpmTomillisecond(game.BPM.currentBPM) * 0.0001;
    }
  }
  
  
  if (game.events.onStepHit == true) {
    gfIdle = 0; // shhh...
  }
  if (game.events.onBeatHit == true) {
    if (gfIdle == 0 && IsStopped_LocalAnim("gf NL") == "true") {
      document.getElementById("gf NR folder").style.scale = 0;
      document.getElementById("gf NL folder").style.scale = 1;
      
      playLocalAnim("gf NL");
      gfIdle = 1;
    } else if (gfIdle == 1 && IsStopped_LocalAnim("gf NR") == "true") {
      document.getElementById("gf NR folder").style.scale = 1;
      document.getElementById("gf NL folder").style.scale = 0;
      
      playLocalAnim("gf NR");
      gfIdle = 0;
    }
  }
  

}, 0)
}

function playedBfAnim(anim){ // custom anim yay
  document.getElementById(game.characters.bfIdAnim.L + " folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.U + " folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.D + " folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.R + " folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;
  document.getElementById("bf N folder").style.scale = 0;
  
  bfIdle = game.data.bf.animations[anim]["length"];
  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== anim && animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R" && animList[i] !== "Miss") {
      document.getElementById("bf "+animList[i]+" folder").style.scale = 0;
    }
  }
  
  document.getElementById("bf "+anim+" folder").style.scale = 1;
  playLocalAnim("bf "+anim)
}


} catch (error) {
  PreError(error, false, true)
}