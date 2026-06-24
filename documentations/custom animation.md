# for making custom anim in start with this simple scripts :] :

```js
makeLocalAnim("mySprite",game.modsFolder +"/images/myAnimation,10,0,0,1,"GAME",100,true,0,0, false, false)
```
working like that :
```
makeLocalAnim(id, src, length, x, y, scale, putIn, speed, isloop, xdelay, ydelay, flip, paddingLength, otherCss)
```
## others :

* for `putIn` : <br>
you can put your element in: **GAME** , **GUI** or element with a id like :
```HTML
<div id="hi"></div>
```

<br>

* for `paddingLength` : <br>
if is `true` your anim work like : ```myAnim000.png > myAnim0018.png```  <br>
if `false` your anim work like ```myAnim0.png > myAnim18.png```

<br>

* for `otherCss` : <br>
for add addicional CSS, do that :
```CSS
background-Color: red; transfrom: rotate(20deg);
```
