function PreError(message,stopGame) {
  alert("error | "+message)
  if (stopGame == true) {
    document.body.remove()
    window.close()
  }
}