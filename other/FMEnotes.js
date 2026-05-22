// add in the future update


// 60 fps = 16.67
function fpsToMS(fps) {
  if (typeof fps !== "number" || !isFinite(fps) || fps <= 0) {
    throw new Error("FPS must be a positive number.");
  }
  alert(1000 / fps)
}

fpsToMS(59)

// new BPM


function bpm(bpmm) {
    const quarterMs = 60000 / bpmm;
    return quarterMs;
}

var eu = bpm(200)
var euh = new Audio("/week 1 .mp3")
euh.volume = 1;
euh.play()

setInterval(() => {
  var euh = new Audio("z.mp3")
  euh.volume = 0.5;
  euh.play()
},eu)
