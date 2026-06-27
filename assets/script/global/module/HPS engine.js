// FMS = Funky.Mit Script

let fmsValue = {
  modsList: null
}

function FMS_makeElement(id = "element",putIn = "default",x = 1,y = 1,z = 1,w = 100,h = 100) {
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

function FMS_makeText(id = "element",putIn = "default",text = "Hello word !",x = 1,y = 1,z = 1,scale = 1) {
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

function FMS_makeImage(id = "element",putIn = "default",src,x = 1,y = 1,z = 1,scale = 1) {
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

function FMS_playScript(id = "myScript",src = "scripts/myScript.js",inMods = true) {
  if (fmsValue.modsList == null || inMods == false) {
    fmModule_getModsList(id,src,inMods)
  } else {
    fmModule_playScript(id,src)
  }
}

function fmModule_playScript(id,src,inMods) {
  var script = document.createElement("script");
  if (inMods) {
    script.src = "mods/"+fmsValue.modsList.mods[Number.parseInt(FMD_getStorage("mods choise"))]+"/"+ src;
  } else {
    script.src = src;
  }
  script.id = id;
  document.body.appendChild(script);
    
  return script;
}

function fmModule_getModsList(id,src) {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", "mods/modsList.txt", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("getModsList | fail to get the file, reson: "+allText)
      } else {
        fmsValue.modsList = JSON.parse(allText);
        
        fmModule_playScript(id,src)
      }
    }
  }
  rawFile.send();
}

/*
there are also :

FMS_health(value,reset)

FMS_playAnim(as,anim,isLoop)

in game
*/