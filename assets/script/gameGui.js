function loadGameGui() {
  game.healthBars.data.bar = document.createElement("img");
  document.getElementById("GUI").appendChild(game.healthBars.data.bar)
  game.healthBars.data.bar.src = game.modsFolder + "/images//healthBar.png"
  game.healthBars.data.bar.style.position = "absolute";
  game.healthBars.data.bar.style.left = "-5px";
  game.healthBars.data.bar.style.top = "310px";
  game.healthBars.data.bar.style.scale = 0.4;
  
  let scores = document.createElement("a");
  document.getElementById("GUI").appendChild(scores)
  scores.style.position = "absolute";
  scores.innerText = "absolute";
  scores.style.left = "70px";
  scores.style.top = "320px";
  scores.style.width = "500px"
  scores.style.scale = 0.5;
  
  let missed = document.createElement("a");
  document.getElementById("GUI").appendChild(missed)
  missed.style.position = "absolute";
  missed.innerText = "absolute";
  missed.style.left = "300px";
  missed.style.top = "320px";
  missed.style.width = "200px"
  missed.style.scale = 0.5;
  
  game.healthBars.data.bf = document.createElement("img");
  document.getElementById("GUI").appendChild(game.healthBars.data.bf)
  game.healthBars.data.bf.src = game.modsFolder +"/images//icons/"+ game.data.bf.icon + "/0.png";
  game.healthBars.data.bf.style.position = "absolute";
  game.healthBars.data.bf.style.left = "50px";
  game.healthBars.data.bf.style.top = "68px";
  game.healthBars.data.bf.style.scale = 0.07;
  
  game.healthBars.data.dad = document.createElement("img");
  document.getElementById("GUI").appendChild(game.healthBars.data.dad)
  game.healthBars.data.dad.src = game.modsFolder +"/images//icons/"+ game.data.dad.icon + "/0.png";
  game.healthBars.data.dad.style.position = "absolute";
  game.healthBars.data.dad.style.left = "-10px";
  game.healthBars.data.dad.style.top = "68px";
  game.healthBars.data.dad.style.scale = 0.07;
  // v switch the image sens
  game.healthBars.data.dad.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);"
  
  let modsVersion = document.createElement("a");
  document.getElementById("GUI").appendChild(modsVersion)
  modsVersion.style.position = "absolute";
  modsVersion.innerText = game.mainData["mods alt name"] +" v"+ game.mainData.version
  modsVersion.style.left = "-182px";
  modsVersion.style.top = "326px";
  modsVersion.style.width = "500px"
  modsVersion.style.scale = 0.3;
  
  
  let version = document.createElement("a");
  document.getElementById("GUI").appendChild(version)
  version.style.position = "absolute";
  version.innerText = "Funky.mit bêta v"+global.version;
  version.style.left = "-182px";
  version.style.top = "333px";
  version.style.width = "500px"
  version.style.scale = 0.3;
  
  
  var iconSize = 0.07
  setInterval(() => {
    if (game.healthBars.bumpIcon == true) {
      if (game.BPM.beatHit == true) {
        iconSize = 0.08;
      } else {
        if (iconSize >= 0.07) {
          iconSize -= 0.0004;
          game.healthBars.data.bf.style.scale = iconSize;
          game.healthBars.data.dad.style.scale = iconSize;
        }
      }
    }
    
    game.healthBars.data.dad.style.left = game.healthBars.value - 20 + "px"
    game.healthBars.data.bf.style.left = game.healthBars.value + 10 + "px"
    
    // scores
    
    scores.innerText = "score :"+game.scores;
    missed.innerText = "missed :"+game.missed;
  }, 0)
}

function healthBars(type,value,reset) {
  if (type == "add") {
    if (game.healthBars.value >= -70) {
      game.healthBars.value -= value;
    }
  }
  
  if (type == "remove") {
    if (game.healthBars.value <= 120) {
      game.healthBars.value += value;
    } else {
      
    }
  }
  
  if (reset == true) {
    game.healthBars.value = 0;
  }
  
  if (type == undefined) {
    return game.healthBars.value;
  }
}