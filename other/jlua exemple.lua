-- simple scripts for make 'hello word text'

local myText = "Hello word !"

local text = doc.createElement("a")
text.innerText = myText
doc.body.appendChild(text)

-- say loop time every 1 secondes ( 1000 milliseconds )

local time = 0
loop(function ()
    print("it been the "+time+" loop")
end,1000)

-- print in the console when the game ended

function TheGameEnded()
  print("you finish the song yay !!!")
end

local myLoop = loop(function ()
  if game.song.ended then
      TheGameEnded()
      clearInterval(myLoop)
      return;
  end
end,0)

-- execute FMS function

