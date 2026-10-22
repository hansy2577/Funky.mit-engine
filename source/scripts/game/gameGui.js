
let iconSlowmove = 0;
let gameGui_beatHit = false;

function loadGameGui() {
  let bumpIconType = localStorage.getItem("FM : custom icon bumping");
  
  game.healthBars.bar = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.bar)
  game.healthBars.bar.src = game.modsFolder + "/images/healthBar.png"
  game.healthBars.bar.style.position = "absolute";
  game.healthBars.bar.style.left = "-5px";
  game.healthBars.bar.style.top = "310px";
  game.healthBars.bar.style.scale = 0.4;
  
  game.healthBars.value = document.createElement("progress");
  document.getElementById("health bars").appendChild(game.healthBars.value)
  game.healthBars.value.id = "healthBar-value"
  game.healthBars.value.style.cssText = `
  position: absolute;`
  
  game.healthBars.value.style.zIndex = "-1";

  game.healthBars.value.value = 50;
  game.healthBars.value.max = 100;
  game.healthBars.value.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);"
  game.healthBars.value.style.left = "56px";
  game.healthBars.value.style.top = "315px";
  game.healthBars.value.style.width = "480px"
  game.healthBars.value.style.height = "10px"
  game.healthBars.value.style.scale = 0.5;

  
  game.healthBars.score = document.createElement("a");
  document.getElementById("GUI").appendChild(game.healthBars.score)
  game.healthBars.score.style.position = "absolute";
  game.healthBars.score.innerText = "absolute";
  game.healthBars.score.style.left = "70px";
  game.healthBars.score.style.top = "320px";
  game.healthBars.score.style.width = "500px"
  game.healthBars.score.style.scale = 0.5;
  
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
  time.style.visibility = 'hidden'
  time.innerText = "00:00";
  time.style.left = "300px";
  time.style.top = "50px";
  time.style.width = "200px";
  time.style.scale = 0.5;
  
  game.healthBars.missed = document.createElement("a");
  document.getElementById("GUI").appendChild(game.healthBars.missed)
  game.healthBars.missed.style.position = "absolute";
  game.healthBars.missed.innerText = "absolute";
  game.healthBars.missed.style.left = "300px";
  game.healthBars.missed.style.top = "320px";
  game.healthBars.missed.style.width = "200px"
  game.healthBars.missed.style.scale = 0.5;
  
  game.healthBars.bfIcon = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.bfIcon)
  game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  game.healthBars.bfIcon.style.position = "absolute";
  game.healthBars.bfIcon.style.left = "50px";
  game.healthBars.bfIcon.style.top = "68px";
  game.healthBars.bfIcon.style.scale = 0.07;

  game.healthBars.dadIcon = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.dadIcon)
  game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
  game.healthBars.dadIcon.style.position = "absolute";
  game.healthBars.dadIcon.style.left = "-10px";
  game.healthBars.dadIcon.style.top = "68px";
  game.healthBars.dadIcon.style.scale = 0.07;
game.healthBars.bfIcon.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);"

  // v switch the image sens
  
  let modsVersion = document.createElement("a");
  document.getElementById("GUI").appendChild(modsVersion)
  modsVersion.id = "text modsVersion"
  modsVersion.style.position = "absolute";
  modsVersion.innerText = game.mainData["mods alt name"] +" v"+ game.mainData.version
  modsVersion.style.left = "-182px";
  modsVersion.style.top = "326px";
  modsVersion.style.width = "500px"
  modsVersion.style.scale = 0.3;
  FMstyle_putShadow(modsVersion.id,"black");

  
  let version = document.createElement("a");
  document.getElementById("GUI").appendChild(version)
  version.id = "text version"
  version.style.position = "absolute";
  version.innerText = "Funky.mit bêta v"+global.version;
  version.style.left = "-182px";
  version.style.top = "333px";
  version.style.width = "500px"
  version.style.scale = 0.3;
  FMstyle_putShadow(version.id,"black");
  
  var iconSize = 0.07;
  var beatHitTime = 0;
  var iconSlowmovePut = false;
  var goldenApple = { value1: 0, value2: 0, value3: 0, }
  
  setInterval(() => {
    if (game.healthBars.bumpIcon == true) {
      if (bumpIconType == "default") {
        if (gameGui_beatHit == true) {
          iconSize = 0.08;
        } else {
          if (iconSize >= 0.07) {
          //iconSize -= 0.0002;            
            iconSize = iconSize / 1.008;
            
            game.healthBars.bfIcon.style.scale = iconSize;
            game.healthBars.dadIcon.style.scale = iconSize;
          }
        }
      }
        
      if (bumpIconType == "golden apple") {
        if (gameGui_beatHit == true) {
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
            iconSize = iconSize / 1.009;
            
            //game.healthBars.bfIcon.style.scale = iconSize;
            //game.healthBars.dadIcon.style.scale = iconSize;
          }
        }
        
        if (goldenApple.value1 <= 1) {
          goldenApple.value1 += 0.01;
        }
        
        if (goldenApple.value2 >= 1.1) {
          goldenApple.value2 = goldenApple.value2 / 1.07;
          
          game.healthBars.dadIcon.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.dadIcon.style.transform += "scaleX("+goldenApple.value2+")";
          
          game.healthBars.bfIcon.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.bfIcon.style.transform += "scaleX(-"+goldenApple.value2 +")";
        }
      }
    }
    
    if (game.BPM.beat4Hit == true && beatHitTime == 0) {
      beatHitTime = 1;
    } else if (game.BPM.beat4Hit == true && beatHitTime == 1) {
      beatHitTime = 0;
    }
    
    // icon
    
    game.healthBars.dadIcon.style.left = game.health + 28 + "px";
    game.healthBars.bfIcon.style.left = game.health + 63 + "px";
    
    // game.healthBars.score
    
    game.healthBars.score.innerText = "score :"+game.scores;
    game.healthBars.missed.innerText = "missed :"+game.missed;
    
    // botplay
    
    if (game.settings.botplay) {
      if (game.BPM.beat4Hit == true && beatHitTime == 0) {
        botplayOpacity_In()
      }
      
      if (game.BPM.beat4Hit == true && beatHitTime == 1) {
        botplayOpacity_Out()
      }
    }
  }, fpsToMS(50))
}

function iconBeatHit() {
  gameGui_beatHit = true;
  
  var looop = setInterval(() => {
    gameGui_beatHit = false;
    clearInterval(looop);
    
    if (game.health >= game.healthBars.iconPosition.minPos) {
      game.health -= 1;
    }

    if (game.health <= game.healthBars.iconPosition.maxPos) {
      game.health += 1;
    }
  },50)
}

function FMS_health(value,reset) {
  Frechicon()
  
  if (value <= 0) {
    document.getElementById("healthBar-value").value -= value*0.3;
    if (game.health >= game.healthBars.iconPosition.minPos) {
      game.health += value;

    }
  } else {
    if (game.health <= game.healthBars.iconPosition.maxPos) {
      game.health += value;
    }
    document.getElementById("healthBar-value").value -= value;
  }

  if (reset == true) {
    game.health = 0;
  }
  
  return game.health;
}

function Frechicon() {
  if (game.health >= -70) {
    game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
  } else {
    game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/1.png";
  }

  if (game.health <= 70) {
    game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  } else {
    game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/1.png";
  }
}

// -------------

function botplayOpacity_In() {
  var css = FMS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 1, scale: 0.5 } // Y 50
  ])
  
  css.play()
  css.onfinish = function () { document.getElementById("botplayText").style.opacity = 1; }
}

function botplayOpacity_Out() {
  var css = FMS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 0.2, scale: 0.51 } // Y 50
  ])
  
  css.play()
  css.onfinish = function() { document.getElementById("botplayText").style.opacity = 0; }
}
