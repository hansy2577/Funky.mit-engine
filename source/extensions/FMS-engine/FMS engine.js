// FMS = Funky.Mit Script
// made by hansy for FM

let fmsValue = {
  modsList: null
}

function FMS_$get(id) {
  return document.getElementById(id);
}

function FMS_$getStyle(id) {
  return document.getElementById(id).style;
}


function FMS_makeElement(id = "element",x = 1,y = 1,z = 1,w = 100,h = 100,putIn = "default") {
  var sprite = document.createElement("div")
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

function FMS_makeText(id = "element",text = "Hello word !",x = 1,y = 1,z = 1,scale = 1,putIn = "default") {
  var sprite = document.createElement("a")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.style.scale = scale;
  sprite.id = id;
  sprite.innerText = text;
  sprite.style.position = "absolute";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  return sprite;
}

function FMS_makeFolder(id = "element",putIn = "default") {
  var sprite = document.createElement("div")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.style.position = "absolute";
  sprite.style.left = "0px";
  sprite.style.top = "0px";
  return sprite;
}

function FMS_saveFile(filename = "myText",data = "hello words !",as = "text/plain") {
  try {
    const blob = new Blob([data], { as });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Cleanup memory
  } catch (err) {
    alert("Download failed | reason :", err);
  }
}

function FMS_makeImage(id = "element",src,x = 1,y = 1,z = 1,scale = 1,putIn = "default") {
  var sprite = document.createElement("img")
  if (putIn !== "default") {
    document.getElementById(putIn).appendChild(sprite);
  } else {
    document.body.appendChild(sprite);
  }
  
  sprite.id = id;
  sprite.src = src;
  sprite.onerror = function () {
    alert("fail to load '"+id+"' image")
  }
  sprite.style.position = "absolute";
  sprite.style.left = x + "px";
  sprite.style.top = y + "px";
  sprite.style.scale = scale;
  return sprite;
}


function FMS_makeCSSanim(id,duration = 1,easing = "ease",loopTime = "Infinity",anim) {
  var doc = document.getElementById(id).animate(
  anim,{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  return doc;
}

function FMS_makeCSS_opacity(id,duration = 1,[start_value = 1,end_value = 0],easing = "ease",loopTime = "Infinity") {
  var doc = document.getElementById(id).animate(
  [{ opacity: start_value },{ opacity: end_value }],{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  return doc;
}

function FMS_makeCSS_Xpos(id,duration = 1,[start_value = 1,end_value = 0],easing = "ease",loopTime = "Infinity") {
  var doc = document.getElementById(id).animate(
  [{ transform: "translateX("+start_value+"px)" },{ transform: "translateX("+end_value+"px)" }],{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  return doc;
}

function FMS_makeCSS_Ypos(id,duration = 1,[start_value = 1,end_value = 0],easing = "ease",loopTime = "Infinity") {
  var doc = document.getElementById(id).animate(
  [{ transform: "translateY("+start_value+"px)" },{ transform: "translateY("+end_value+"px)" }],{ duration: duration * 1000, easing: easing, iterations: loopTime, })
  return doc;
}



function FMS_playScript(id = "myScript",src = ["scripts/myScript.js"]) {
  for (var i = 0; i < src.length; i++) {
    var script = document.createElement("script");
    script.src = src[i];
    script.id = id;
    document.body.appendChild(script);
  }
}

function FMstyle_putShadow(id,color = "black",delayX = "1",delayY = "1",blurRadius = "2") {
  document.getElementById(id).style.textShadow = delayX+"px "+delayY+"px "+blurRadius+"px "+color
}


/*
there are also :

FMS_health(value,reset)

FMS_playAnim(as,anim,isLoop)

in game
*/