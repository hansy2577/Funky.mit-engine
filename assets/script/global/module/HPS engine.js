function HJS_makeSprite(id = "element",putIn = "default",type = "div",x = 1,y = 1,z = 1,w = 100,h = 100) {
  var sprite = document.createElement(type)
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.style.position = "absolute";
  sprite.style.width = w + "px";
  sprite.style.height = h + "px";
  sprite.style.backgroundColor = "red";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  return sprite;
}

function HJS_verification(){
  return true;
}

function HJS_makeCSSanim(id,duration = 1,easing = "ease",loopTime = "Infinity",anim) {
  var doc = document.getElementById(id).animate(
  anim,{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  //console.log(doc)
  return doc;
}

function HJS_playScript(id = "myScript",src = "myMods/scripts/myScript.js") {
  var script = document.createElement("script");
  script.src = "mods/"+src;
  script.id = id;
  document.body.appendChild(script);
  
  return script;
}


/*
*/

// ----------------

/*
function HJSanime(id = "element",putIn = "default",src = "assets/my-anime",length = 5,speed = 10,x = 1,y = 1,z = 1,extraSetting = { isLoop = false, flipX = false, iSpadding = false }) {
  makeLocalAnim(id,src,length,x,y,1,putIn,speed,isLoop,0,0,flipX,false,iSpadding)
}
*/