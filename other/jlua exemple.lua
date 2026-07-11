-- simple scripts for make 'hello word text'

local myText = "Hello word !"

local text = doc.createElement("a")
text.innerText = myText
doc.body.appendChild(text)
