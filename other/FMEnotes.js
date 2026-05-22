// add in the future update


// 60 fps = 16.67
function fpsToMS(fps) {
  if (typeof fps !== "number" || !isFinite(fps) || fps <= 0) {
    throw new Error("FPS must be a positive number.");
  }
  alert(1000 / fps)
}

fpsToMS(59)
