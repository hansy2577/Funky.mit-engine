<img width="500" alt="image" src="https://github.com/hansy2577/Funky.mit-engine/blob/main/F.M logo.png" />

___

<img width="1196" height="698" alt="image" src="https://github.com/hansy2577/Funky.mit-engine/blob/main/other/screenshots/1.4 gameplay.png" />


_Pysch engine but re-code in HTML JS !!1!!1!11_
<br><br><br>
____

**Funky.mit.engine** (or F.M engine) it a engine inspired by [Pysch engine](https://e) and [FNF-PlusEngine](https://github.com/Psych-Plus-Team/FNF-PlusEngine) but recode in **JavaScript** brute with no extensions !<br>. Before, it was my little favorite engine i made just for me in [scratch](https://scratch.mit.edu).

# features :
* simple script function ( inpired by **Pysch engine** and **Haxeflixel** ):

## make a simple cube :
> subject to change  <br>

```js
var myCube = FMS_makeElement("a cube","GAME",0,0,1,100,100)
myCube.style.backgroundColor = "red";
```
or
```js
var myCube = document.createElement("div")
document.getElementById("GAME").appendChild(myCube);
//  document.getElementById("GUI").appendChild(myCube);
  
myCube.id = id;
myCube.style.position = "absolute";
myCube.style.width = "100px";
myCube.style.height = "100px";
myCube.style.backgroundColor = "red";
myCube.style.left = "0px";
myCube.style.top = "0px";
```

## make a image :
> subject to change

```js
var myImage = FMS_makeImage("a image","GAME","/images/myImage.png",0,0,1,1)
```

## game values :
> subject to change
> there not all value

```js
game.modsSelect        // ex: 'base-game' or 'myMods'
game.modsFolder     // if you want get a image or any thing, ex: '/images/myImage.png

game.songSelect        // the song name
game.songDifficulties      // song difficultie, ex: 'hard'
game.songFolder     // if you want get a audio, ex: '/myText.txt'

game.BPM.currentBPM    // get default BPM, ex: '120'

game.isStarting   // for verifie if the game is started or not

// get stage as JSON

game.stage.data    // get JSON stage

game.stage.BG     // get the BG as HTML, ex: 'game.stage.data.style.scale = 0.5;'
game.stage.bf    // get the bf folder as HTML, ex: game.stage.bf.style.tranform = "scaleX(0.5)"
game.stage.dad    // indem but dad
game.stage.gf     // indem but gf

// get current pc key
game.settings.key     // ex: ["D","F","J","K"]

game.settings.key[0]  // ex: D 
game.settings.key[1]  // ex: F
game.settings.key[2]  // ex: J
game.settings.key[3]  // ex: K

// health bars
game.healthBars.data.bar  // get the bars as HTML element
game.healthBars.data.bf  // get bf icon as HTML element
game.healthBars.data.dad  // get dad icon as HTML element

```

## game events
> subject to change
```js
// some event

events {
  onBeatHit: false,
  onStepHit: false,
  onNotesHit: false,
  onGoodNotesHit: false,    // in WIP
  onMiss: false,
  onRandomKeyPress: false,    // in WIP
  onNotesOpponentHit: false,
  onDadIconWin: false,    // in WIP
  onBFIconWin: false    // in WIP
}

// work like this

setInterval(() => {
  if (game.events.onBeatHit == true) {
    // do something
  }
},0)
```
<br>

```js
// other

fpsToMS(60)  // turn FPS to milliseconde, can be use for setInterval

global.version    // get current game version

transition()    // do the game transition

ScreenBeat(1.05,2)    // make game beat ,'disable in v2.7- for octimisation probleme'

```

## other features
* redisign/fixe of the mods and song system
<img width="208" height="326" alt="IMG_20260604_184340" src="https://github.com/user-attachments/assets/b188c99c-28df-4afe-b45d-7b2cdf708bba" />

<br><br>

* new animation system for characters ,using a **Image sequence** system
<img width="645" height="78" alt="image" src="https://github.com/user-attachments/assets/e68bd0e6-a1f5-4f59-9ab4-aea8fa14123f" />

<br><br>

* simple custom note
<img width="775" height="122" alt="image" src="https://github.com/user-attachments/assets/3a3019bc-4be2-444a-9d6e-808af2496b57" />

<br><br>

probably more later


# check list:

- [ ] have a contributor for help
- [x] add Dad 
- [x] add healthBar
- [ ] add all FNF source
- [x] add options tab
- [x] better default mods 
- [ ] cutscene system
- [ ] funny song
  
