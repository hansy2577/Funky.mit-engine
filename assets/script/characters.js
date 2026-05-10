function getCharacters() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.bf[0]+".json", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get the file, reson: "+allText)
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
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.dad[0]+".json", true);
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
        loadGameGui()
      } 
    }
  }
  rawFile.send();
}



function loadCharacther() {
  loadanim_bf_N(game.data.bf.src +"/"+ game.data.bf.animations["Neutre"].anim,"bf N",game.data.bf["alt name"],game.song.metadata.assets.bf[1],game.song.metadata.assets.bf[2],game.data.bf.scale,game.data.bf.animations["Neutre"]["length"],game.data.bf.animations["Neutre"]["speed"]);
  
  loadanim_bf_L(game.data.bf.src +"/"+ game.data.bf.animations["L"].anim,"bf L",game.data.bf["alt name"],game.song.metadata.assets.bf[1],game.song.metadata.assets.bf[2],game.data.bf.scale,game.data.bf.animations["L"]["length"],game.data.bf.animations["L"]["speed"]);
  loadanim_bf_U(game.data.bf.src +"/"+ game.data.bf.animations["U"].anim,"bf U",game.data.bf["alt name"],game.song.metadata.assets.bf[1],game.song.metadata.assets.bf[2],game.data.bf.scale,game.data.bf.animations["U"]["length"],game.data.bf.animations["U"]["speed"]);
  loadanim_bf_D(game.data.bf.src +"/"+ game.data.bf.animations["D"].anim,"bf D",game.data.bf["alt name"],game.song.metadata.assets.bf[1],game.song.metadata.assets.bf[2],game.data.bf.scale,game.data.bf.animations["D"]["length"],game.data.bf.animations["D"]["speed"]);
  loadanim_bf_R(game.data.bf.src +"/"+ game.data.bf.animations["R"].anim,"bf R",game.data.bf["alt name"],game.song.metadata.assets.bf[1],game.song.metadata.assets.bf[2],game.data.bf.scale,game.data.bf.animations["R"]["length"],game.data.bf.animations["R"]["speed"]);
}

function Boyfriend(x,y,name) {
  //playLocalAnim("bf",23,100);
  /*game.stage.bf = document.createElement("img");
  document.getElementById("Boyfriend").appendChild(game.stage.bf);

  game.stage.bf.style.position = "absolute";
  game.stage.bf.src = "mods/"+game.modsSelect+"/"+game.song.metadata.assets.BG[0]
  game.stage.bf.style.left = game.song.metadata.assets.BG[1] + "px";
  game.stage.bf.style.top = game.song.metadata.assets.BG[2] + "px";
  game.stage.bf.style.scale = game.song.metadata.assets.BG[3];
  game.stage.bf.style.zIndex = 1;*/
}