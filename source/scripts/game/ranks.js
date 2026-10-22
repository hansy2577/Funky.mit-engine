function makeRanks(type,src,{ scale = 1, x = 0, y = 0 }) {
  // it look like a mes as first see xd
  if (FMD_getStorage("FM : show ranking?") == "true") {
  var r = document.createElement("img");
  document.getElementById("ranks").appendChild(r)
  r.onerror = function() {
    r.src = "assets/images/ranks/" + type + ".png"
  }
  r.src = src+".png";
  r.style.cssText = "position: absolute; scale:"+scale+";";
  r.style.left = (150+x)+"px";
  r.style.top = (50+y)+"px";
  r.id = Math.random()+"";
  
  FMS_makeCSSanim(r.id,0.5,"ease-in",1,[{ opacity: 0 }]).onfinish = function () {
    r.style.opacity = 0;  // set opacity animation
  }
  
  var xx = 0, yy = 0;   
  var yyTorque = -0.2;
  
  setInterval(() => {
    r.style.top = ((50+y)+yy)+"px";  // use all delay for the position
    
    yy = yy+yyTorque;
    yyTorque += 0.06;
    
    if (yy >= 30) {
      // delete after reched the pos
      r.remove()
    }
  },10)
  }
}
// makeRanks("","Good",{ scale: 0.4 })