<img width="500" alt="image" src="https://github.com/hansy2577/Funky.mit-engine/blob/main/arts/F.M logo.png" />

___
<img width="1196" height="698" alt="image" src="https://github.com/hansy2577/Funky.mit-engine/blob/main/other/screenshots/1.4 gameplay.png" />


_Pysch engine but re-code in HTML JS !!1!!1!11_
<br><br><br>
____

**Funky.mit.engine** (or F.M engine) it a fnf remade engine made for fun inspired ( for assets ) by [Pysch engine](https://github.com/ShadowMario/FNF-PsychEngine) and [FNF-PlusEngine](https://github.com/Psych-Plus-Team/FNF-PlusEngine) but recode in **JavaScript and HTML5**  with no external library/extension ( except for the console [eruda](https://eruda.liriliri.io/) ), the core and the source not working similar to the others engine like : for make custom difficulties you have to do subfolder before put data, exemple : 
```
/my songs
      /hard
            (songs data here)
      /easy
            ...
```
.<br>

**Funkin.mit engine** was not made for only my personnal usage but for you to :],the cool think in this engine is didn't needed : compilation, learn other language, hard time for learn the source code, a PC ( can be exe in all little operating systems ) !.

Before today,this was my personal little favorite engine i made just for me in [scratch](https://scratch.mit.edu), if you want play the old version play [Here !](https://scratch.mit.edu/projects/1179357342) ( *this old version it pretty buggy and hard to modified xd* )



# features :
* simple script function ( inpired by **Pysch engine** and **Haxeflixel** ):

## make a simple cube :

```js
var myCube = FMS_makeElement("a cube","GAME",0,0,1,100,100)
myCube.style.backgroundColor = "red";
```
in lua :
```lua
local myCube = FMS_makeElement("a cube","GAME",0,0,1,100,100)
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
```js
var myImage = FMS_makeImage("a image","GAME","/images/myImage.png",0,0,1,1)
```

## game values :
> really subject to change and there not all value

```js
game.modsSelect        // ex: 'base-game' or 'myMods'
game.modsFolder     // if you want get a image or any thing, ex: '/images/myImage.png

game.songSelect        // the song name
game.songDifficulties      // song difficultie, ex: 'hard'
game.songFolder     // if you want get a audio, ex: '/myText.txt'

game.charaIconFolder  // path characters folder
game.musicFolder      // music folder path
game.soundsFolder      // idem but for the sounds
game.imagesFolder      // idem but for the images

game.BPM.currentBPM    // get default BPM, ex: '120'

game.isStarting   // for verifie if the game is started or not

game.notesSpeed // notes speed

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
> idem to the top
```js
function onBeatHit() {
// put something here !
}

function onStepHit() {
// put something here !
}

function onNotesHit(longNotes) {
// put something here !
}

function onMiss(){
// put something here !
}

function onNotesOpponentHit(){
// put something here !
}
```
and in lua too :
```lua
function onBeatHit() 
-- put something here !
end

function onStepHit() 
-- put something here !
end

...
```
<br>
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

**more features !!!**:
* open source
* simple to learn
* lua script !
* used pysch engine chart !
* simple stages animation
* new better songs folder system
* new mods meta system
<br>*and more*
<br>



# current problem/defaut 

* the engine can be slow for some phone

* the souce code it pretty a mess
> report me if your don't know how edite it or see a bugs


# check list:

- [ ] clear the source code/unsed assets
- [ ] have a contributor for help
- [x] add Dad 
- [x] add healthBar
- [X] add mods tab
- [ ] add all FNF source
- [x] add options tab
- [x] better default mods 
- [ ] cutscene system
- [X] funny song
  
