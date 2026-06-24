for make custom anim in start with this :

```js
makeLocalAnim("mySprite",game.modsFolder +"/images/myAnimation,10,0,0,1,"Dad",game.data.dad.animations["D"]["speed"],game.data.dad.animations["D"]["isloop ?"],game.data.dad.animations["D"]["position"][0],game.data.dad.animations["D"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
```
working like this :
```
makeLocalAnim(id, src, length, x, y, scale, putIn, speed, isloop, xdelay, ydelay, flip, paddingLength)
```
* for **putIn** : <br>
default **putIn** is **GAME**

* for **paddingLength** : <br>
if is **true** your anim work like : ```myAnim000.png > myAnim0018.png```
if is **false** your anim work like ```myAnim0.png > myAnim18.png```