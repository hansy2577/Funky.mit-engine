
let iconSlowmove = 0;
function loadGameGui() {
  let bumpIconType = localStorage.getItem("FM : custom icon bumping");
  
  game.healthBars.data.bar = document.createElement("img");
  document.getElementById("GUI").appendChild(game.healthBars.data.bar)
  game.healthBars.data.bar.src = game.modsFolder + "/images/healthBar.png"
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
  
  if (game.settings.botplay) {
    let botplayText = document.createElement("a");
    document.getElementById("GUI").appendChild(botplayText)
    botplayText.style.position = "absolute";
    botplayText.innerText = "botplay";
    botplayText.id = "botplayText";
    botplayText.style.left = "-129px";
    botplayText.style.top = "300px";
    botplayText.style.width = "500px"
    botplayText.style.scale = 0.5;
    
    botplayOpacity_In()
  }
  
  let time = document.createElement("a");
  document.getElementById("GUI").appendChild(time)
  time.style.position = "absolute";
  time.id = "songTime"
  time.innerText = "00:00";
  time.style.left = "300px";
  time.style.top = "50px";
  time.style.width = "200px";
  time.style.scale = 0.5;
  
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
  game.healthBars.data.bf.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  game.healthBars.data.bf.style.position = "absolute";
  game.healthBars.data.bf.style.left = "50px";
  game.healthBars.data.bf.style.top = "68px";
  game.healthBars.data.bf.style.scale = 0.07;
  
  game.healthBars.data.dad = document.createElement("img");
  document.getElementById("GUI").appendChild(game.healthBars.data.dad)
  game.healthBars.data.dad.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
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
  
  var iconSize = 0.07;
  var beatHitTime = 0;
  var goldenApple = { value1: 0, value2: 0, value3: 0, }
  setInterval(() => {
    if (game.healthBars.bumpIcon == true) {
      if (bumpIconType == "default") {
        if (game.events.onBeatHit == true) {
          iconSize = 0.08;
        } else {
          if (iconSize >= 0.07) {
          //iconSize -= 0.0002;            
            iconSize = iconSize / 1.003;
            
            game.healthBars.data.bf.style.scale = iconSize;
            game.healthBars.data.dad.style.scale = iconSize;
          }
        }
      }
        
      if (bumpIconType == "golden apple") {
        if (game.events.onBeatHit == true) {
          iconSize = 0.08;
          goldenApple.value1 = 0.7;
          if (goldenApple.value3 == 1) {
            goldenApple.value2 = 2.9; // onbeat 1
            goldenApple.value3 = 0;
          } else {
            goldenApple.value2 = 2.5; // onbeat 2
            goldenApple.value3 = 1;
          }
          
        } else {
          if (iconSize >= 0.07) {
          //iconSize -= 0.0002;            
            iconSize = iconSize / 1.002;
            
            //game.healthBars.data.bf.style.scale = iconSize;
            //game.healthBars.data.dad.style.scale = iconSize;
          }
        }
        
        if (goldenApple.value1 <= 1) {
          goldenApple.value1 += 0.01;
        }
        
        if (goldenApple.value2 >= 1.1) {
          goldenApple.value2 = goldenApple.value2 / 1.03;
          
          game.healthBars.data.bf.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.data.bf.style.transform += "scaleX("+goldenApple.value2+")";
          
          game.healthBars.data.dad.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.data.dad.style.transform += "scaleX(-"+goldenApple.value2 +")";
        }
      }
    }
    
    if (game.BPM.beat4Hit == true && beatHitTime == 0) {
      beatHitTime = 1;
    } else if (game.BPM.beat4Hit == true && beatHitTime == 1) {
      beatHitTime = 0;
    }
    
    // icon
    
    if (iconSlowmove >= 0.1) {
      iconSlowmove -= 0.005
      game.healthBars.value += iconSlowmove;
    } 
    
    if (iconSlowmove <= -0.1) {
      iconSlowmove += 0.005
      game.healthBars.value += iconSlowmove;
    }
    
    game.healthBars.data.dad.style.left = game.healthBars.value - 20 + "px";
    game.healthBars.data.bf.style.left = game.healthBars.value + 10 + "px";
    
    // scores
    
    scores.innerText = "score :"+game.scores;
    missed.innerText = "missed :"+game.missed;
    
    // botplay
    
    if (game.settings.botplay) {
      if (game.BPM.beat4Hit == true && beatHitTime == 0) {
        botplayOpacity_In()
      }
      
      if (game.BPM.beat4Hit == true && beatHitTime == 1) {
        botplayOpacity_Out()
      }
    }
  }, 3)
}

setInterval(() => {
  document.getElementById("songTime").innerText = game.song.inst.currentTime+"/"+game.song.inst;
},global.frameLimite)

function healthBars(type,value,reset) {
  Frechicon()
  if (type == "add") {
    if (game.healthBars.value >= -65) {
      iconSlowmove -= value * 0.05;
    } else {
      iconSlowmove = 0;
    }
  }
  
  if (type == "remove") {
    if (game.healthBars.value <= 120) {
      iconSlowmove += value * 0.03;
    } else {
      iconSlowmove = 0;
    }
  }
  
  if (reset == true) {
    game.healthBars.value = 0;
  }
  
  if (type == undefined) {
    return game.healthBars.value;
  }
}

function Frechicon() {
  if (game.healthBars.value >= -40) {
    game.healthBars.data.dad.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
  } else {
    game.healthBars.data.dad.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/1.png";
  }

  if (game.healthBars.value <= 120) {
    game.healthBars.data.bf.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  } else {
    game.healthBars.data.bf.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/1.png";
  }
}

// -------------

function botplayOpacity_In() {
  console.log(HJS_verification())
  var css = HJS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 1, scale: 0.5 } // Y 50
  ])
  
  css.play()
  css.onfinish = function () { document.getElementById("botplayText").style.opacity = 1; }
}

function botplayOpacity_Out() {
  var css = HJS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 0.2, scale: 0.51 } // Y 50
  ])
  
  css.play()
  css.onfinish = function() { document.getElementById("botplayText").style.opacity = 0; }
}