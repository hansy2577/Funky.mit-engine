// come from my other's game

eruda.init();

let x = 0;
let y = 0;
let select = "";      // select elements
let data = null;      // main json
let train = null;     // data for train main.json
let loaded = false;   // import
let globalType = "";     // train or obj
let folder = "";
let elmLenght = 0;
let xx = 300, yy = 200, ss = 1;

function load_Train() {
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+document.getElementById("modsN").value+"/stages/"+document.getElementById("stageN").value+".json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    if (reload == 3 ) {
      
      if (allText == "Error 404, file not found.") {
        alert("error ! | sorry no train asset found")
      } else {
        data = JSON.parse(allText);
        elmLenght = data.stage.length;
        load(folder)
      }
    }
  }
  rawFile.send();
}


function load(type) {
    makeObj(type,true);
}

function makeObj(src = null,rp = false) {
  for (var i = 0; i < data.stage.length; i++) {
    f = document.getElementById("game");
    
    const b = document.createElement("img");
    b.id = "p"+i//data.data[i].name;
    b.style.cssText = "position: absolute; z-index:"+data.stage[i].position[2]+"; left:"+(
      data.stage[i].position[0]
    )+"px; top:"+(
      data.stage[i].position[1]
    )+"px;";
    
    b.style.scale = data.stage[i].scale;

    b.src = "mods/"+document.getElementById("modsN").value+"/"+data.stage[i].src+".png";

    b.onclick = function () { reset(b.id) };
    f.appendChild(b);
  }
}


function makeTrain(srcLink) {}

function reset(id) {
document.getElementById("x").value = document.getElementById(id).style.left;
document.getElementById("y").value = document.getElementById(id).style.top;
document.getElementById("s").value = document.getElementById(id).style.scale;
document.getElementById("src2").value = document.getElementById(id).src;

select = id;
}

function saveD() {
    var objInfo = '{ "type":"'+data.type+'", "data":[';
    
    for (var i = 0; i < data.data.length; i++) {
     objInfo += '{ "name":"'+data.data[i].name+'", "src":"'+document.getElementById("p"+i).getAttribute("src").split("/").reverse()[0]+'", "position":['+((document.getElementById("p"+i).style.left).replace("px",""))+','+
     ((document.getElementById("p"+i).style.top).replace("px",""))+','+
     ((document.getElementById("p"+i).style.zIndex))+'], "scale":'+(document.getElementById("p"+i).style.scale)+'}'
     
     if (i >= data.data.length - 1) {
       objInfo += '], "scripts":["'+data.scripts+'"] }';
       JSON.parse(objInfo)
       prompt("replace your current .object file content by that :",objInfo);
     } else {
       objInfo += ',';
     }
  }
}

setInterval(() => {
    document.getElementById("game").style.left = xx+"px";
    document.getElementById("game").style.top = yy+"px"
    document.getElementById("game").style.scale = ss

  if (select !== "") {
    document.getElementById(select).style.left = document.getElementById("x").value;
    document.getElementById(select).style.top = document.getElementById("y").value;
    document.getElementById(select).style.scale = document.getElementById("s").value;
    document.getElementById(select).src = document.getElementById("src2").value;
  }
},100)

