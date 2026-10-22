let fmlValue = { 
 modsList: null 
}

function JULA_playScript(id = "myScript",src = "scripts/myScript.js") {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get", src, true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("Lua getFile | nan")
      } else {
        runLua(allText);
      }
    }
  }
  rawFile.send();
}
